import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./data";

export type View =
  | { name: "home" }
  | { name: "listing"; category?: string; amazing?: boolean; query?: string }
  | { name: "product"; id: number }
  | { name: "checkout" };

export interface CartItem {
  id: number;
  qty: number;
}

interface Toast {
  id: number;
  text: string;
}

interface ShopState {
  view: View;
  navigate: (v: View) => void;
  cart: CartItem[];
  addToCart: (id: number, qty?: number) => void;
  removeFromCart: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (b: boolean) => void;
  wishlist: number[];
  toggleWish: (id: number) => void;
  toasts: Toast[];
  toast: (text: string) => void;
  product: (id: number) => Product;
}

const Ctx = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>({ name: "home" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const navigate = useCallback((v: View) => {
    setView(v);
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (id: number, qty = 1) => {
      setCart((c) => {
        const ex = c.find((i) => i.id === id);
        if (ex) return c.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 10) } : i));
        return [...c, { id, qty }];
      });
      const p = PRODUCTS.find((p) => p.id === id);
      toast(`${p?.name ?? "محصول"} به سبد خرید اضافه شد`);
    },
    [toast]
  );

  const removeFromCart = useCallback((id: number) => setCart((c) => c.filter((i) => i.id !== id)), []);
  const setQty = useCallback(
    (id: number, qty: number) => {
      if (qty <= 0) return removeFromCart(id);
      setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 10) } : i)));
    },
    [removeFromCart]
  );
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (id: number) =>
      setWishlist((w) => {
        const has = w.includes(id);
        toast(has ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
        return has ? w.filter((x) => x !== id) : [...w, id];
      }),
    [toast]
  );

  const product = useCallback((id: number) => PRODUCTS.find((p) => p.id === id)!, []);

  const value = useMemo<ShopState>(
    () => ({
      view, navigate, cart, addToCart, removeFromCart, setQty, clearCart,
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      cartOpen, setCartOpen, wishlist, toggleWish, toasts, toast, product,
    }),
    [view, navigate, cart, addToCart, removeFromCart, setQty, clearCart, cartOpen, wishlist, toggleWish, toasts, toast, product]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop(): ShopState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
