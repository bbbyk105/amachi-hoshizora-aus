/** localStorage keys used by the age gate (client-only). */
export const AGE_VERIFIED_STORAGE_KEY = "amachi_age_verified_v1";
/** 以前の版が保存していた位置情報。使わなくなったので、残っていれば消す */
const LEGACY_LOCATION_STORAGE_KEY = "amachi_location_v1";
/** 年齢確認を通過した瞬間に window へ流すイベント（ページ冒頭の演出を待たせるため） */
export const AGE_VERIFIED_EVENT = "amachi:age-verified";

/** 年齢確認を通過したら <html> に付けるクラス（通過済みの人には確認画面の下地を出さない） */
export const AGE_VERIFIED_CLASS = "age-verified";

/** 以前の版が保存していた値。言語を問わず保存していたので、起動時に低いほうの 18 歳へ移す */
const LEGACY_VERIFIED_VALUE = "1";
const LEGACY_VERIFIED_AGE = "18";

/** 確認する年齢。確認画面の文言と揃える（日本語は日本の 20 歳、英語はオーストラリアの 18 歳） */
export function requiredAge(locale: string) {
  return locale === "ja" ? 20 : 18;
}

// localStorage が使えない環境でも、このタブの間は通過済みとして扱う
let verifiedAgeInSession = 0;

function readVerifiedAge() {
  try {
    const stored = window.localStorage.getItem(AGE_VERIFIED_STORAGE_KEY);
    return Math.max(verifiedAgeInSession, Number(stored) || 0);
  } catch {
    return verifiedAgeInSession;
  }
}

/** その言語で必要な年齢を確認済みか。20 歳を確認した人は 18 歳の確認も済んでいる */
export function readAgeVerified(locale: string): boolean {
  return readVerifiedAge() >= requiredAge(locale);
}

/** 通過を記録し、待っている演出に知らせる */
export function markAgeVerified(locale: string) {
  // 別のタブで高い年齢を確認していても、低い年齢で上書きしない
  verifiedAgeInSession = Math.max(readVerifiedAge(), requiredAge(locale));
  try {
    window.localStorage.setItem(
      AGE_VERIFIED_STORAGE_KEY,
      String(verifiedAgeInSession),
    );
  } catch {
    /* 保存できなくても verifiedAgeInSession で扱う */
  }
  document.documentElement.classList.add(AGE_VERIFIED_CLASS);
  window.dispatchEvent(new Event(AGE_VERIFIED_EVENT));
}

/**
 * <head> で最初の描画より前に実行するスクリプト。
 * その言語で通過済みなら <html> に印を付け、ハイドレーションまでの間も確認画面の下地を出さない。
 * 以前の版が保存した位置情報もここで消す
 */
export function ageVerifiedBootScript(locale: string) {
  const key = JSON.stringify(AGE_VERIFIED_STORAGE_KEY);
  const location = JSON.stringify(LEGACY_LOCATION_STORAGE_KEY);
  const oldValue = JSON.stringify(LEGACY_VERIFIED_VALUE);
  const newValue = JSON.stringify(LEGACY_VERIFIED_AGE);
  const className = JSON.stringify(AGE_VERIFIED_CLASS);
  return `try{localStorage.removeItem(${location});if(localStorage.getItem(${key})===${oldValue})localStorage.setItem(${key},${newValue});if(Number(localStorage.getItem(${key}))>=${requiredAge(locale)})document.documentElement.classList.add(${className})}catch(e){}`;
}
