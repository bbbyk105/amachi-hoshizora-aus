/** localStorage keys used by the age gate (client-only). */
export const AGE_VERIFIED_STORAGE_KEY = "amachi_age_verified_v1";
export const LOCATION_STORAGE_KEY = "amachi_location_v1";

export type StoredAgeGateLocation = {
  lat: number;
  lng: number;
  accuracy: number | null;
  ts: number;
};

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
