/** localStorage keys used by the age gate (client-only). */
export const AGE_VERIFIED_STORAGE_KEY = "amachi_age_verified_v1";
/** 以前の版が保存していた位置情報。使わなくなったので、残っていれば消す */
const LEGACY_LOCATION_STORAGE_KEY = "amachi_location_v1";
/** 年齢確認を通過した瞬間に window へ流すイベント（ページ冒頭の演出を待たせるため） */
export const AGE_VERIFIED_EVENT = "amachi:age-verified";

/** 年齢確認を通過したら <html> に付けるクラス（通過済みの人には確認画面の下地を出さない） */
export const AGE_VERIFIED_CLASS = "age-verified";

// localStorage が使えない環境でも、このタブの間は通過済みとして扱う
let verifiedInSession = false;

export function readAgeVerified(): boolean {
  if (verifiedInSession) return true;
  try {
    return window.localStorage.getItem(AGE_VERIFIED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** 通過を記録し、待っている演出に知らせる */
export function markAgeVerified() {
  verifiedInSession = true;
  try {
    window.localStorage.setItem(AGE_VERIFIED_STORAGE_KEY, "1");
  } catch {
    /* 保存できなくても verifiedInSession で扱う */
  }
  document.documentElement.classList.add(AGE_VERIFIED_CLASS);
  window.dispatchEvent(new Event(AGE_VERIFIED_EVENT));
}

/**
 * <head> で最初の描画より前に実行するスクリプト。
 * 通過済みなら <html> に印を付け、ハイドレーションまでの間も確認画面の下地を出さない。
 * 以前の版が保存した位置情報もここで消す
 */
export const AGE_VERIFIED_BOOT_SCRIPT = `try{localStorage.removeItem(${JSON.stringify(
  LEGACY_LOCATION_STORAGE_KEY,
)});if(localStorage.getItem(${JSON.stringify(
  AGE_VERIFIED_STORAGE_KEY,
)})==="1")document.documentElement.classList.add(${JSON.stringify(
  AGE_VERIFIED_CLASS,
)})}catch(e){}`;
