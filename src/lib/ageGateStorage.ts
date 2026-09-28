/** localStorage keys used by the age gate (client-only). */
export const AGE_VERIFIED_STORAGE_KEY = "amachi_age_verified_v1";
export const LOCATION_STORAGE_KEY = "amachi_location_v1";
/** 年齢確認を通過した瞬間に window へ流すイベント（ページ冒頭の演出を待たせるため） */
export const AGE_VERIFIED_EVENT = "amachi:age-verified";

export type StoredAgeGateLocation = {
  lat: number;
  lng: number;
  accuracy: number | null;
  ts: number;
};

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
 * 通過済みなら <html> に印を付け、ハイドレーションまでの間も確認画面の下地を出さない
 */
export const AGE_VERIFIED_BOOT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  AGE_VERIFIED_STORAGE_KEY,
)})==="1")document.documentElement.classList.add(${JSON.stringify(
  AGE_VERIFIED_CLASS,
)})}catch(e){}`;

export function readStoredAgeGateLocation(): StoredAgeGateLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAgeGateLocation;
    if (
      typeof parsed.lat !== "number" ||
      typeof parsed.lng !== "number" ||
      typeof parsed.ts !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
