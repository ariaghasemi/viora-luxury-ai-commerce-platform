import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, ShoppingCart, X, Minus, Plus, Trash2, ChevronDown, Sparkles,
  LayoutGrid, BadgePercent, BookOpenText, ArrowRight, Truck,
} from "lucide-react";
import { CATEGORIES, FREE_SHIPPING_LIMIT, PRODUCTS, faNum, faPrice, priceAfterDiscount } from "./data";
import { useShop } from "./ShopContext";
import { ProductImg } from "./ui";
import { cn } from "../utils/cn";

/* ---------- جستجوی زنده ---------- */
function SearchBox() {
  const { navigate } = useShop();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return PRODUCTS.filter(
      (p) => p.name.includes(q.trim()) || p.latin.toLowerCase().includes(q.trim().toLowerCase()) || p.category.includes(q.trim())
    ).slice(0, 6);
  }, [q]);

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-3 transition-colors focus-within:bg-zinc-200/70">
        <Search className="size-5 shrink-0 text-zinc-400" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="جستجو در محصولات ویورا…"
          className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="پاک کردن">
            <X className="size-4 text-zinc-400" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-2xl shadow-zinc-900/10"
          >
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => { navigate({ name: "product", id: p.id }); setOpen(false); setQ(""); }}
                className="flex w-full items-center gap-3 px-4 py-3 text-right transition-colors hover:bg-zinc-50"
              >
                <ProductImg p={p} className="size-11 shrink-0 rounded-lg" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-zinc-800">عطر {p.name}</span>
                  <span className="font-latin block text-[11px] text-zinc-400">{p.latin} — {p.category}</span>
                </span>
                <span className="text-sm font-bold text-amber-700">{faPrice(priceAfterDiscount(p.price, p.discount))} <span className="text-[10px] font-normal text-zinc-400">تومان</span></span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- کشوی سبد خرید ---------- */
function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, product, navigate } = useShop();
  const total = cart.reduce((s, i) => { const p = product(i.id); return s + priceAfterDiscount(p.price, p.discount) * i.qty; }, 0);
  const progress = Math.min(100, (total / FREE_SHIPPING_LIMIT) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-zinc-950/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-[90] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
              <h3 className="flex items-center gap-2 font-extrabold text-zinc-900">
                <ShoppingCart className="size-5 text-amber-600" />
                سبد خرید شما
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">{faNum(cart.reduce((s, i) => s + i.qty, 0))} کالا</span>
              </h3>
              <button onClick={() => setCartOpen(false)} aria-label="بستن" className="grid size-9 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingCart className="size-14 text-zinc-200" />
                  <p className="font-bold text-zinc-700">سبد خرید شما خالی است</p>
                  <p className="text-sm text-zinc-400">از پیشنهادهای شگفت‌انگیز شروع کنید!</p>
                  <button
                    onClick={() => navigate({ name: "listing", amazing: true })}
                    className="mt-2 rounded-xl bg-amber-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-500"
                  >
                    مشاهده تخفیف‌ها
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((i) => {
                    const p = product(i.id);
                    return (
                      <li key={i.id} className="flex gap-3 rounded-2xl border border-zinc-100 p-3">
                        <ProductImg p={p} className="size-20 shrink-0 rounded-xl" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-zinc-800">عطر {p.name}</p>
                          <p className="font-latin text-[11px] text-zinc-400">{p.latin}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-lg border border-zinc-200 px-1 py-0.5">
                              <button onClick={() => setQty(i.id, i.qty + 1)} className="grid size-6 place-items-center text-zinc-600 hover:text-amber-600" aria-label="افزایش">
                                <Plus className="size-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold text-zinc-800">{faNum(i.qty)}</span>
                              <button onClick={() => setQty(i.id, i.qty - 1)} className="grid size-6 place-items-center text-zinc-600 hover:text-rose-600" aria-label="کاهش">
                                <Minus className="size-3.5" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(i.id)} className="grid size-7 place-items-center rounded-lg text-zinc-400 hover:bg-rose-50 hover:text-rose-600" aria-label="حذف">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                        <p className="self-end text-sm font-extrabold text-zinc-900">
                          {faPrice(priceAfterDiscount(p.price, p.discount) * i.qty)}
                          <span className="ms-0.5 text-[10px] font-normal text-zinc-400">تومان</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-100 p-5">
                <div className="mb-4 rounded-xl bg-zinc-50 p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-xs text-zinc-600">
                    <Truck className="size-4 text-amber-600" />
                    {total >= FREE_SHIPPING_LIMIT
                      ? "ارسال سفارش شما رایگان شد!"
                      : `با ${faPrice(FREE_SHIPPING_LIMIT - total)} تومان خرید بیشتر، ارسال رایگان می‌شود`}
                  </p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200">
                    <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-l from-amber-500 to-amber-600" />
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">مبلغ قابل پرداخت</span>
                  <span className="text-xl font-extrabold text-zinc-900">{faPrice(total)} <span className="text-xs font-normal text-zinc-400">تومان</span></span>
                </div>
                <button
                  onClick={() => navigate({ name: "checkout" })}
                  className="w-full rounded-xl bg-amber-600 py-3.5 font-bold text-white transition-colors hover:bg-amber-500"
                >
                  ادامه فرآیند خرید
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- هدر اصلی ---------- */
export default function ShopHeader() {
  const { navigate, cartCount, setCartOpen } = useShop();
  const [catOpen, setCatOpen] = useState(false);

  return (
    <>
      {/* نوار نمایشی پروژه */}
      <div className="bg-zinc-900 px-4 py-2 text-center text-[11px] text-zinc-300">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-amber-400" />
          این فروشگاه، دموی زنده پروژه Viora است —
          <a href="#top" className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300">
            بازگشت به صفحه معرفی پروژه
            <ArrowRight className="size-3" />
          </a>
        </span>
      </div>

      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center gap-4 px-4 md:gap-6 md:px-8">
          {/* لوگو */}
          <button onClick={() => navigate({ name: "home" })} className="flex shrink-0 items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="size-10">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f2dda6" /><stop offset="1" stopColor="#a16207" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="16" fill="#18181b" />
              <path d="M15 20 L32 48 L49 20" fill="none" stroke="url(#sg)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 8 l1.7 3.6 3.6 1.7 -3.6 1.7 -1.7 3.6 -1.7 -3.6 -3.6 -1.7 3.6 -1.7z" fill="#f2dda6" />
            </svg>
            <span className="hidden leading-tight sm:block">
              <span className="block font-latin text-lg font-bold tracking-[0.2em] text-zinc-900">VIORA</span>
              <span className="block text-[10px] text-zinc-400">فروشگاه عطر لوکس</span>
            </span>
          </button>

          <div className="hidden flex-1 md:block"><SearchBox /></div>

          <div className="ms-auto flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid size-11 place-items-center rounded-xl border border-zinc-200 text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-600"
              aria-label="سبد خرید"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -left-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                  {faNum(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* جستجوی موبایل */}
        <div className="border-t border-zinc-100 px-4 py-2.5 md:hidden"><SearchBox /></div>

        {/* ناوبری دسته‌بندی */}
        <nav className="hidden border-t border-zinc-100 md:block">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-1 px-8">
            <div className="relative">
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="flex items-center gap-1.5 py-3 pe-4 text-sm font-bold text-zinc-800 transition-colors hover:text-amber-700"
              >
                <LayoutGrid className="size-4" />
                دسته‌بندی کالاها
                <ChevronDown className={cn("size-4 transition-transform", catOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full z-40 w-64 overflow-hidden rounded-2xl border border-zinc-100 bg-white py-2 shadow-2xl shadow-zinc-900/10"
                    onMouseLeave={() => setCatOpen(false)}
                  >
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => { navigate({ name: "listing", category: c.name }); setCatOpen(false); }}
                        className="block w-full px-5 py-3 text-right transition-colors hover:bg-amber-50"
                      >
                        <span className="block text-sm font-bold text-zinc-800">عطرهای {c.name}</span>
                        <span className="mt-0.5 block text-xs text-zinc-400">{c.desc}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="h-5 w-px bg-zinc-200" />
            {CATEGORIES.map((c) => (
              <button
                key={c.name}
                onClick={() => navigate({ name: "listing", category: c.name })}
                className="px-3 py-3 text-sm text-zinc-600 transition-colors hover:text-amber-700"
              >
                {c.name}
              </button>
            ))}
            <span className="h-5 w-px bg-zinc-200" />
            <button
              onClick={() => navigate({ name: "listing", amazing: true })}
              className="flex items-center gap-1.5 px-3 py-3 text-sm font-bold text-rose-600 transition-colors hover:text-rose-500"
            >
              <BadgePercent className="size-4" />
              پیشنهاد شگفت‌انگیز
            </button>
            <a href="#top" className="ms-auto flex items-center gap-1.5 px-3 py-3 text-sm text-zinc-500 transition-colors hover:text-amber-700">
              <BookOpenText className="size-4" />
              معرفی پروژه
            </a>
          </div>
        </nav>
      </header>

      <CartDrawer />
    </>
  );
}
