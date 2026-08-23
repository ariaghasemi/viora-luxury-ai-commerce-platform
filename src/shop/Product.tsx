import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BadgePercent, Heart, Minus, Plus, ShieldCheck, ShoppingCart,
  Store, ThumbsUp, Truck, Undo2, Package, Droplets, Clock4, Wind, CalendarDays,
} from "lucide-react";
import { PRODUCTS, commentsFor, faNum, faPrice, priceAfterDiscount } from "./data";
import { useShop } from "./ShopContext";
import { ProductCard, ProductImg, Stars } from "./ui";
import { cn } from "../utils/cn";

const TABS = ["توضیحات", "مشخصات فنی", "دیدگاه‌ها"] as const;

export default function ShopProduct() {
  const { view, navigate, addToCart, wishlist, toggleWish, toast } = useShop();
  const id = view.name === "product" ? view.id : 1;
  const p = PRODUCTS.find((x) => x.id === id) ?? PRODUCTS[0];
  const final = priceAfterDiscount(p.price, p.discount);
  const wished = wishlist.includes(p.id);

  const gallery = [
    { type: "grid" as const, label: "نمای اصلی" },
    { type: "img" as const, src: "/images/gallery-product-after.jpg", label: "تصویر استودیویی" },
    { type: "img" as const, src: "/images/gallery-lifestyle.jpg", label: "تصویر محیطی" },
  ];
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]>("توضیحات");
  const [qty, setQty] = useState(1);
  const comments = commentsFor(p.id);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  const specs = [
    { icon: Package, k: "حجم", v: p.volume },
    { icon: Droplets, k: "خانواده بویایی", v: p.family },
    { icon: Clock4, k: "ماندگاری", v: p.longevity },
    { icon: Wind, k: "پراکندگی رایحه", v: p.sillage },
    { icon: CalendarDays, k: "فصل مناسب", v: p.season },
    { icon: Store, k: "دسته‌بندی", v: p.category },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      {/* مسیر */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <button onClick={() => navigate({ name: "home" })} className="hover:text-amber-700">خانه</button>
        <ArrowRight className="size-3 -scale-x-100" />
        <button onClick={() => navigate({ name: "listing", category: p.category })} className="hover:text-amber-700">{p.category}</button>
        <ArrowRight className="size-3 -scale-x-100" />
        <span className="text-zinc-600">عطر {p.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr_300px] xl:grid-cols-[430px_1fr_320px]">
        {/* گالری */}
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-100">
            <AnimatePresence mode="wait">
              {gallery[shot].type === "grid" ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProductImg p={p} className="aspect-square w-full" />
                </motion.div>
              ) : (
                <motion.img
                  key={shot}
                  src={gallery[shot].src}
                  alt={gallery[shot].label}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="aspect-square w-full object-cover"
                />
              )}
            </AnimatePresence>
            {p.amazing && (
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white">
                <BadgePercent className="size-3.5" /> شگفت‌انگیز
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2.5">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setShot(i)}
                className={cn(
                  "relative w-20 overflow-hidden rounded-xl border-2 transition-all",
                  shot === i ? "border-amber-500" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                {g.type === "grid" ? (
                  <ProductImg p={p} className="aspect-square w-full" />
                ) : (
                  <img src={g.src} alt={g.label} className="aspect-square w-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* اطلاعات */}
        <div>
          <p className="text-sm text-amber-700">{p.brand} / عطرهای {p.category}</p>
          <h1 className="mt-2 text-2xl font-black text-zinc-900 md:text-3xl">عطر {p.name}</h1>
          <p className="font-latin mt-1 text-sm tracking-wide text-zinc-400">{p.latin} — {p.volume}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Stars rating={p.rating} />
              {faNum(p.rating)}
              <span className="text-zinc-400">({faNum(p.votes)} دیدگاه)</span>
            </span>
            <span className="hidden h-4 w-px bg-zinc-200 sm:block" />
            <span>{faNum(p.sold)} فروش موفق</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {specs.slice(0, 3).map((s) => (
              <div key={s.k} className="rounded-xl border border-zinc-100 bg-zinc-50/60 px-4 py-3">
                <p className="flex items-center gap-1.5 text-[11px] text-zinc-400"><s.icon className="size-3.5" />{s.k}</p>
                <p className="mt-1 text-sm font-bold text-zinc-800">{s.v}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-8 text-zinc-600">{p.desc}</p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-sm text-amber-900">
            <ThumbsUp className="size-5 shrink-0 text-amber-600" />
            <p><span className="font-bold">{faNum(96)}٪</span> خریداران، خرید این کالا را به دیگران پیشنهاد کرده‌اند.</p>
          </div>
        </div>

        {/* باکس خرید */}
        <aside className="h-fit rounded-3xl border border-zinc-100 bg-white p-5 lg:sticky lg:top-40">
          <div className="flex items-center gap-3 border-b border-dashed border-zinc-100 pb-4">
            <span className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600"><Store className="size-5" /></span>
            <div className="flex-1">
              <p className="text-sm font-bold text-zinc-800">فروشنده: ویورا</p>
              <p className="text-[11px] text-emerald-600">عملکرد عالی — ارسال فوری</p>
            </div>
          </div>

          <ul className="space-y-3 py-4 text-[13px] text-zinc-600">
            <li className="flex items-center gap-2.5"><ShieldCheck className="size-4 shrink-0 text-emerald-600" /> ضمانت اصالت و سلامت فیزیکی کالا</li>
            <li className="flex items-center gap-2.5"><Truck className="size-4 shrink-0 text-sky-600" /> ارسال اکسپرس — موجود در انبار ویورا</li>
            <li className="flex items-center gap-2.5"><Undo2 className="size-4 shrink-0 text-zinc-400" /> ۷ روز مهلت بازگشت کالا</li>
          </ul>

          <div className="border-t border-dashed border-zinc-100 pt-4">
            <p className={cn("mb-2 text-xs font-bold", p.stock <= 5 ? "text-rose-600" : "text-zinc-400")}>
              {p.stock <= 5 ? `تنها ${faNum(p.stock)} عدد در انبار باقی مانده` : `${faNum(p.stock)} عدد در انبار`}
            </p>
            {p.discount && (
              <div className="flex items-center justify-between">
                <span className="grid size-7 place-items-center rounded-lg bg-rose-600 text-xs font-bold text-white">{faNum(p.discount)}٪</span>
                <del className="text-sm text-zinc-400">{faPrice(p.price)} تومان</del>
              </div>
            )}
            <p className="mt-1.5 text-left text-2xl font-black text-zinc-900">
              {faPrice(final)} <span className="text-sm font-normal text-zinc-400">تومان</span>
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-xl border border-zinc-200 px-1 py-1.5">
                <button onClick={() => setQty((q) => Math.min(q + 1, p.stock))} className="grid size-7 place-items-center text-zinc-600 hover:text-amber-600" aria-label="افزایش"><Plus className="size-4" /></button>
                <span className="w-6 text-center font-bold text-zinc-900">{faNum(qty)}</span>
                <button onClick={() => setQty((q) => Math.max(q - 1, 1))} className="grid size-7 place-items-center text-zinc-600 hover:text-rose-600" aria-label="کاهش"><Minus className="size-4" /></button>
              </div>
              <button
                onClick={() => addToCart(p.id, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-bold text-white transition-colors hover:bg-amber-500"
              >
                <ShoppingCart className="size-4.5" />
                افزودن به سبد
              </button>
            </div>
            <button
              onClick={() => toggleWish(p.id)}
              className={cn(
                "mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-bold transition-colors",
                wished ? "border-rose-200 bg-rose-50 text-rose-600" : "border-zinc-200 text-zinc-500 hover:border-rose-200 hover:text-rose-500"
              )}
            >
              <Heart className={cn("size-4", wished && "fill-rose-500 text-rose-500")} />
              {wished ? "در علاقه‌مندی‌هاست" : "افزودن به علاقه‌مندی‌ها"}
            </button>
          </div>
        </aside>
      </div>

      {/* تب‌ها */}
      <div className="mt-14">
        <div className="flex gap-1 border-b border-zinc-100">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative px-5 py-3.5 text-sm font-bold transition-colors",
                tab === t ? "text-amber-700" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              {t}
              {t === "دیدگاه‌ها" && <span className="ms-1 text-xs text-zinc-400">({faNum(comments.length)})</span>}
              {tab === t && <motion.span layoutId="tabline" className="absolute inset-x-0 -bottom-px h-0.5 bg-amber-500" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="py-8"
          >
            {tab === "توضیحات" && (
              <div className="max-w-3xl space-y-4 text-sm leading-8 text-zinc-600">
                <p>{p.desc}</p>
                <p>
                  «{p.name}» از مجموعه امضای ویورا است؛ عطری که با خانواده بویایی {p.family} و
                  ماندگاری {p.longevity} طراحی شده تا در هر موقعیت، همراهی قابل‌اعتماد باشد.
                  اسانس‌های به‌کاررفته در این عطر از تامین‌کنندگان معتبر اروپایی تهیه و در شیشه‌های
                  دست‌ساز بسته‌بندی می‌شوند.
                </p>
                <p>
                  تمام محصولات ویورا با کد رهگیری دیجیتال عرضه می‌شوند؛ کافیست کد روی جعبه را در
                  وب‌سایت وارد کنید تا اصالت کالا تایید شود. این محصول مناسب فصل {p.season} بوده و
                  پراکندگی رایحه‌ای {p.sillage} دارد.
                </p>
              </div>
            )}

            {tab === "مشخصات فنی" && (
              <div className="max-w-2xl overflow-hidden rounded-2xl border border-zinc-100">
                {specs.map((s, i) => (
                  <div key={s.k} className={cn("flex items-center gap-4 px-5 py-4", i % 2 === 0 && "bg-zinc-50/70")}>
                    <s.icon className="size-4.5 shrink-0 text-amber-600" />
                    <span className="w-32 shrink-0 text-sm text-zinc-500">{s.k}</span>
                    <span className="text-sm font-bold text-zinc-800">{s.v}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "دیدگاه‌ها" && (
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <ul className="space-y-5">
                  {comments.map((c, i) => (
                    <li key={i} className="rounded-2xl border border-zinc-100 bg-white p-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-full bg-amber-100 font-bold text-amber-700">{c.name[0]}</span>
                        <div>
                          <p className="flex items-center gap-2 text-sm font-bold text-zinc-800">
                            {c.name}
                            {c.buyer && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">خریدار محصول</span>}
                          </p>
                          <p className="text-[11px] text-zinc-400">{c.date}</p>
                        </div>
                        <Stars rating={c.rating} className="ms-auto" />
                      </div>
                      <p className="mt-3.5 text-sm leading-8 text-zinc-600">{c.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="h-fit rounded-2xl border border-zinc-100 bg-white p-5">
                  <h4 className="font-extrabold text-zinc-900">دیدگاه خود را ثبت کنید</h4>
                  <p className="mt-1.5 text-xs leading-6 text-zinc-400">پس از خرید کالا می‌توانید تجربه خود را با دیگران به اشتراک بگذارید.</p>
                  <textarea
                    rows={4}
                    placeholder="تجربه شما از این عطر…"
                    className="mt-4 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm outline-none transition-colors focus:border-amber-400"
                  />
                  <button
                    onClick={() => toast("دیدگاه شما پس از تایید منتشر می‌شود")}
                    className="mt-3 w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600 hover:text-zinc-950"
                  >
                    ثبت دیدگاه
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* محصولات مرتبط */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-extrabold text-zinc-900">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}
          </div>
        </div>
      )}

      {/* برای SEO */}
      <p className="sr-only">خرید عطر {p.name} ({p.latin}) با بهترین قیمت و ضمانت اصالت از فروشگاه ویورا</p>
    </div>
  );
}
