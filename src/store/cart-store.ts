// カートの中身を localStorage と同期して持つ小さなストア（React に依存しない）。
// React からは useSyncExternalStore で読む（src/store/cart.tsx）。
// Stripe への往復（ページの再読み込み）や言語切り替え、別タブでも同じカートになる。
import type { CartItem } from "@/types/products";

const STORAGE_KEY = "amachi_cart_v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

const isCartItem = (value: unknown): value is CartItem => {
  const item = value as CartItem | null;
  return (
    typeof item?.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    typeof item.product?.id === "number" &&
    typeof item.product.price === "number" &&
    typeof item.product.name === "string" &&
    typeof item.product.image?.url === "string"
  );
};

function readStorage(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const valid = Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
    return valid.length ? valid : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeStorage(next: CartItem[]) {
  try {
    if (next.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* 保存できない環境ではメモリ上だけで持つ */
  }
}

const emit = () => listeners.forEach((listener) => listener());

// 別のタブでカートが変わったら取り込む
const onStorage = (event: StorageEvent) => {
  if (event.key !== STORAGE_KEY) return;
  items = readStorage();
  emit();
};

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    if (listeners.size === 1) window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) window.removeEventListener("storage", onStorage);
    };
  },

  getSnapshot(): CartItem[] {
    if (!loaded) {
      items = readStorage();
      loaded = true;
    }
    return items;
  },

  /** サーバーでは常に空のカート（HTML は空の状態で作り、表示後に復元される） */
  getServerSnapshot(): CartItem[] {
    return EMPTY;
  },

  update(updater: (prev: CartItem[]) => CartItem[]) {
    const next = updater(cartStore.getSnapshot());
    if (next === items) return;
    items = next.length ? next : EMPTY;
    writeStorage(items);
    emit();
  },
};
