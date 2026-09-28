// サイト全体の GSAP 演出パターン（React に依存しない。呼び出しは hooks/use-site-motion.ts）。
// ページ側（ほぼ Server Component）は data-motion 属性で「何をどう動かすか」だけを書き、
// 動きはここで一括して付ける。
// data-motion は空白区切りで複数指定できる（例: data-motion="intro hero-out"）。
//
//   intro      ページ冒頭。一度だけ再生（年齢確認の通過を待つ）
//              中の [data-char] / [data-motion-item] / [data-motion-reveal] を順に出す
//              ページを直接開いた時は、data-motion-onload が付いたもの（トップのヒーロー）だけ再生する
//   chars      見出しを1文字ずつ下から
//   chars-scrub 引用文の文字がスクロールに合わせて濃くなる
//   reveal     写真を幕が上がるように見せる（data-motion-dir="left" で横から）
//   parallax   枠の中で写真がゆっくりずれる
//   zoom       全幅写真が引きのカメラのように縮む
//   develop    古写真が現像されるように色と焦点が戻る
//   stagger    子要素を順に下から
//   rows       表や年表の行を左から順に
//   tilt       写真を机に並べるように傾きから戻す
//   line       年表の縦線がスクロールに合わせて伸びる
//   bar        グラフの棒が左から伸びる
//   fade       静かに浮かぶ
//   hero-out   トップの文字がスクロールで上へ抜ける
//   header     下にスクロールで隠れ、上に戻すと出てくる
//   [data-count] 数字を 0 から数え上げる

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AGE_VERIFIED_EVENT, readAgeVerified } from "@/lib/ageGateStorage";

gsap.registerPlugin(ScrollTrigger);

const all = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => Array.from(root.querySelectorAll<T>(selector));

const byMotion = (name: string) => all(`[data-motion~="${name}"]`);

// ページを直接開いた時（初回表示）は、すでに画面に見えている要素を隠したり動かしたりしない。
// サーバーの HTML がそのまま見えている状態を崩さず、LCP も遅らせないため。
// サイト内の移動では描画前に演出の初期状態を付けられるので、見えている要素も動かす。
let initialLoad = false;

const inFirstView = (el: Element) =>
  initialLoad && el.getBoundingClientRect().top < window.innerHeight;

const imageIn = (el: Element) => el.querySelector("img");

const onEnter = (trigger: Element, start = "top 85%") => ({
  trigger,
  start,
  once: true,
});

// 年齢確認がまだなら、通過するまで冒頭の演出を止めておく
function whenAgeVerified(play: () => void, cleanups: (() => void)[]) {
  if (readAgeVerified()) {
    play();
    return;
  }
  window.addEventListener(AGE_VERIFIED_EVENT, play, { once: true });
  cleanups.push(() => window.removeEventListener(AGE_VERIFIED_EVENT, play));
}

function intros(cleanups: (() => void)[]) {
  byMotion("intro").forEach((el) => {
    if (initialLoad && !el.hasAttribute("data-motion-onload")) return;
    const brush = el.dataset.motionChars === "brush";
    const chars = all("[data-char]", el);
    const items = all("[data-motion-item]", el);
    const reveals = all("[data-motion-reveal]", el);

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

    if (reveals.length) {
      tl.fromTo(
        reveals,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.15,
          clearProps: "clipPath",
        },
        0,
      );
      reveals.forEach((reveal) => {
        const img = imageIn(reveal);
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: "expo.out" }, 0);
      });
    }

    if (chars.length) {
      // 縦書きのキャッチは筆で書くように、横書きの見出しは下から
      tl.fromTo(
        chars,
        brush
          ? { opacity: 0, filter: "blur(10px)", yPercent: -20 }
          : { opacity: 0, yPercent: 70 },
        {
          opacity: 1,
          filter: "blur(0px)",
          yPercent: 0,
          duration: brush ? 1.2 : 0.9,
          stagger: brush ? 0.07 : Math.min(0.04, 0.8 / chars.length),
          clearProps: "filter",
        },
        brush ? 0.3 : 0.1,
      );
    }

    if (items.length) {
      tl.fromTo(
        items,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
        chars.length ? "-=0.6" : 0.2,
      );
    }

    whenAgeVerified(() => tl.play(), cleanups);
  });
}

function heroOut() {
  byMotion("hero-out").forEach((el) => {
    gsap.to(el, {
      yPercent: -14,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") ?? el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

function chars() {
  byMotion("chars").forEach((el) => {
    if (inFirstView(el)) return;
    const targets = all("[data-char]", el);
    if (!targets.length) return;
    gsap.fromTo(
      targets,
      { opacity: 0, yPercent: 60 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: Math.min(0.035, 0.7 / targets.length),
        scrollTrigger: onEnter(el),
      },
    );
  });
}

function charsScrub() {
  byMotion("chars-scrub").forEach((el) => {
    if (inFirstView(el)) return;
    const targets = all("[data-char]", el);
    if (!targets.length) return;
    gsap.fromTo(
      targets,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 45%",
          scrub: true,
        },
      },
    );
  });
}

function reveals() {
  const from: Record<string, string> = {
    up: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  };
  byMotion("reveal").forEach((el) => {
    if (inFirstView(el)) return;
    const dir = el.dataset.motionDir ?? "up";
    const tl = gsap.timeline({ scrollTrigger: onEnter(el, "top 80%") });
    tl.fromTo(
      el,
      { clipPath: from[dir] ?? from.up, opacity: 1 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "expo.out",
        clearProps: "clipPath",
      },
    );
    const img = imageIn(el);
    if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
  });
}

function parallax() {
  byMotion("parallax").forEach((el) => {
    if (inFirstView(el)) return;
    const img = imageIn(el);
    if (!img) return;
    gsap.set(img, { scale: 1.18 });
    gsap.fromTo(
      img,
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

function zoom() {
  byMotion("zoom").forEach((el) => {
    if (inFirstView(el)) return;
    const img = imageIn(el);
    if (!img) return;
    gsap.fromTo(
      img,
      { scale: 1.3 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true },
      },
    );
  });
}

function develop() {
  byMotion("develop").forEach((el) => {
    if (inFirstView(el)) return;
    const img = imageIn(el);
    const tl = gsap.timeline({ scrollTrigger: onEnter(el, "top 80%") });
    tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    if (img) {
      tl.fromTo(
        img,
        { filter: "sepia(1) contrast(0.55) brightness(1.7) blur(6px)" },
        {
          filter: "sepia(0) contrast(1) brightness(1) blur(0px)",
          duration: 2.4,
          ease: "power2.out",
          clearProps: "filter",
        },
        0.2,
      );
    }
  });
}

function staggers() {
  byMotion("stagger").forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: onEnter(el),
      },
    );
  });
}

function rows() {
  byMotion("rows").forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el.children,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: onEnter(el, "top 88%"),
      },
    );
  });
}

function tilts() {
  const angles = [-5, 4, -3, 3];
  byMotion("tilt").forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 70, rotation: (i) => angles[i % angles.length] },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.16,
        scrollTrigger: onEnter(el, "top 80%"),
      },
    );
  });
}

function lines() {
  byMotion("line").forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top 70%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      },
    );
  });
}

function bars() {
  byMotion("bar").forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: onEnter(el, "top 90%"),
      },
    );
  });
}

function fades() {
  byMotion("fade").forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", scrollTrigger: onEnter(el) },
    );
  });
}

// 文字を差し替えるのではなく、React が持っているテキストノードの値だけを書き換える
function counts(cleanups: (() => void)[]) {
  all("[data-count]").forEach((el) => {
    if (inFirstView(el)) return;
    const node = el.firstChild;
    const target = Number(el.dataset.count);
    if (!node || node.nodeType !== Node.TEXT_NODE || !Number.isFinite(target)) return;
    const original = node.nodeValue;
    const state = { value: 0 };
    node.nodeValue = "0";
    gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        node.nodeValue = String(Math.round(state.value));
      },
      scrollTrigger: onEnter(el, "top 90%"),
    });
    cleanups.push(() => {
      node.nodeValue = original;
    });
  });
}

function header(cleanups: (() => void)[]) {
  byMotion("header").forEach((el) => {
    let hidden = false;
    // onUpdate 内の tween は matchMedia の後始末に含まれないので、ページ移動時にここで戻す
    cleanups.push(() => {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide =
          self.direction === 1 &&
          self.scroll() > 240 &&
          !el.contains(document.activeElement);
        if (hide === hidden) return;
        hidden = hide;
        gsap.to(el, {
          yPercent: hide ? -100 : 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });
  });
}

/** ページ内の data-motion をすべて探して演出を付ける。後始末は cleanups に積む */
export function applyMotionPatterns(
  cleanups: (() => void)[],
  options: { initialLoad: boolean },
) {
  initialLoad = options.initialLoad;
  intros(cleanups);
  heroOut();
  header(cleanups);
  chars();
  charsScrub();
  reveals();
  parallax();
  zoom();
  develop();
  staggers();
  rows();
  tilts();
  lines();
  bars();
  fades();
  counts(cleanups);
}

/** Web フォントの読み込みで高さが変わったら位置を測り直す */
export function refreshWhenFontsReady() {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
