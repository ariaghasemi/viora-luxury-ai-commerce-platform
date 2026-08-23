import { AnimatePresence, motion } from "framer-motion";
import {
  AtSign, BadgePercent, CheckCircle2, Globe, Home, LayoutGrid,
  Mail, Phone, Search, Send, ShieldCheck, ShoppingCart,
} from "lucide-react";
import { ShopProvider, useShop } from "./ShopContext";
import ShopHeader from "./Header";
import ShopHome from "./Home";
import ShopListing from "./Listing";
import ShopProduct from "./Product";
import ShopCheckout from "./Checkout";
import { cn } from "../utils/cn";

/* ---------- اعلان‌ها ---------- */
function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4 md:bottom-8">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2.5 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-zinc-900/30"
          >
            <CheckCircle2 className="size-4.5 shrink-0 text-emerald-400" />
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------- ناوبری پایین موبایل ---------- */
function MobileNav() {
  const { navigate, view, setCartOpen, cartCount } = useShop();
  const items = [
    { icon: Home, label: "خانه", active: view.name === "home", onClick: () => navigate({ name: "home" }) },
    { icon: LayoutGrid, label: "فروشگاه", active: view.name === "listing", onClick: () => navigate({ name: "listing" }) },
    { icon: BadgePercent, label: "شگفت‌انگیز", active: false, onClick: () => navigate({ name: "listing", amazing: true }) },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-100 bg-white/95 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-4">
        {items.map((it) => (
          <button key={it.label} onClick={it.onClick} className={cn("flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold", it.active ? "text-amber-700" : "text-zinc-400")}>
            <it.icon className="size-5" />
            {it.label}
          </button>
        ))}
        <button onClick={() => setCartOpen(true)} className="relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-zinc-400">
          <ShoppingCart className="size-5" />
          سبد خرید
          {cartCount > 0 && (
            <span className="absolute right-6 top-1 grid size-4 place-items-center rounded-full bg-rose-600 text-[9px] text-white">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

/* ---------- فوتر فروشگاه ---------- */
function ShopFooter() {
  const { navigate } = useShop();
  return (
    <footer className="mt-16 border-t border-zinc-100 bg-white pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 64 64" className="size-10">
                <defs>
                  <linearGradient id="fg2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f2dda6" /><stop offset="1" stopColor="#a16207" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="16" fill="#18181b" />
                <path d="M15 20 L32 48 L49 20" fill="none" stroke="url(#fg2)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M32 8 l1.7 3.6 3.6 1.7 -3.6 1.7 -1.7 3.6 -1.7 -3.6 -3.6 -1.7 3.6 -1.7z" fill="#f2dda6" />
              </svg>
              <span>
                <span className="block font-latin text-lg font-bold tracking-[0.2em] text-zinc-900">VIORA</span>
                <span className="block text-[10px] text-zinc-400">فروشگاه عطر لوکس</span>
              </span>
            </div>
            <p className="mt-4 text-xs leading-7 text-zinc-500">
              ویورا، مقصد عطرهای اصل و لوکس با ضمانت اصالت دیجیتال. تلفیق تجربه خرید مدرن با سلیقه ایرانی.
            </p>
            <div className="mt-4 flex gap-2">
              {[AtSign, Send, Globe].map((Icon, i) => (
                <a key={i} href="#/shop" onClick={(e) => e.preventDefault()} aria-label="شبکه اجتماعی" className="grid size-9 place-items-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-amber-400 hover:text-amber-600">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              t: "دسترسی سریع",
              links: [
                { l: "همه محصولات", fn: () => navigate({ name: "listing" }) },
                { l: "پیشنهاد شگفت‌انگیز", fn: () => navigate({ name: "listing", amazing: true }) },
                { l: "عطرهای زنانه", fn: () => navigate({ name: "listing", category: "زنانه" }) },
                { l: "عطرهای مردانه", fn: () => navigate({ name: "listing", category: "مردانه" }) },
              ],
            },
            {
              t: "خدمات مشتریان",
              links: [
                { l: "پیگیری سفارش", fn: () => navigate({ name: "home" }) },
                { l: "۷ روز مهلت بازگشت", fn: () => navigate({ name: "home" }) },
                { l: "راهنمای انتخاب عطر", fn: () => navigate({ name: "home" }) },
                { l: "سوالات متداول", fn: () => navigate({ name: "home" }) },
              ],
            },
          ].map((col) => (
            <div key={col.t}>
              <h4 className="mb-4 text-sm font-extrabold text-zinc-900">{col.t}</h4>
              <ul className="space-y-2.5">
                {col.links.map((x) => (
                  <li key={x.l}>
                    <button onClick={x.fn} className="text-sm text-zinc-500 transition-colors hover:text-amber-700">{x.l}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-extrabold text-zinc-900">در تماس باشیم</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-amber-600" />
                <a href="tel:09202099052" dir="ltr" className="font-latin tracking-wider hover:text-amber-700">0920 209 9052</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-amber-600" />
                <a href="mailto:ariagh1386.work@gmail.com" className="font-latin text-xs hover:text-amber-700">ariagh1386.work@gmail.com</a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2.5">
              {["نماد اعتماد", "درگاه امن"].map((b) => (
                <span key={b} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-3 text-[10px] text-zinc-400">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-100 pt-6 text-[11px] text-zinc-400 md:flex-row">
          <p>تمام حقوق برای فروشگاه ویورا محفوظ است — ۱۴۰۴</p>
          <p className="flex items-center gap-1.5">
            <Search className="size-3 text-zinc-300" />
            این فروشگاه نمونه‌کار پروژه Viora است —
            <a href="#top" className="font-bold text-amber-700 hover:text-amber-600">مشاهده معرفی پروژه</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- پوسته ---------- */
function Shell() {
  const { view } = useShop();
  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans text-zinc-700">
      <ShopHeader />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view.name + (view.name === "product" ? view.id : "") + (view.name === "listing" ? (view.category ?? "") + (view.amazing ? "a" : "") : "")}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {view.name === "home" && <ShopHome />}
            {view.name === "listing" && <ShopListing />}
            {view.name === "product" && <ShopProduct />}
            {view.name === "checkout" && <ShopCheckout />}
          </motion.div>
        </AnimatePresence>
      </main>
      <ShopFooter />
      <MobileNav />
      <Toasts />
    </div>
  );
}

export default function Shop() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}
