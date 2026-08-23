import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgePercent, ChevronDown, ListFilter, Package, Star } from "lucide-react";
import { CATEGORIES, PRODUCTS, faNum } from "./data";
import { useShop } from "./ShopContext";
import { ProductCard } from "./ui";
import { cn } from "../utils/cn";

const SORTS = [
  { id: "popular", label: "محبوب‌ترین" },
  { id: "bestsell", label: "پرفروش‌ترین" },
  { id: "cheap", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "discount", label: "بیشترین تخفیف" },
  { id: "rating", label: "بالاترین امتیاز" },
] as const;

const PRICE_RANGES = [
  { id: "all", label: "همه قیمت‌ها" },
  { id: "1", label: "زیر ۱٫۵ میلیون", max: 1500000 },
  { id: "2", label: "۱٫۵ تا ۲ میلیون", min: 1500000, max: 2000000 },
  { id: "3", label: "۲ تا ۲٫۵ میلیون", min: 2000000, max: 2500000 },
  { id: "4", label: "بالای ۲٫۵ میلیون", min: 2500000 },
] as const;

export default function ShopListing() {
  const { view, navigate } = useShop();
  const v = view.name === "listing" ? view : undefined;

  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("popular");
  const [cats, setCats] = useState<string[]>(v?.category ? [v.category] : []);
  const [priceRange, setPriceRange] = useState<(typeof PRICE_RANGES)[number]["id"]>("all");
  const [onlyStock, setOnlyStock] = useState(false);
  const [onlyDiscount, setOnlyDiscount] = useState(!!v?.amazing);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let out = [...PRODUCTS];
    if (cats.length) out = out.filter((p) => cats.includes(p.category));
    const range = PRICE_RANGES.find((r) => r.id === priceRange);
    if (range && "min" in range && range.min) out = out.filter((p) => p.price >= range.min!);
    if (range && "max" in range && range.max) out = out.filter((p) => p.price <= range.max);
    if (onlyStock) out = out.filter((p) => p.stock > 0);
    if (onlyDiscount) out = out.filter((p) => p.discount);
    if (minRating) out = out.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "cheap": out.sort((a, b) => (a.price * (100 - (a.discount ?? 0))) - (b.price * (100 - (b.discount ?? 0)))); break;
      case "expensive": out.sort((a, b) => (b.price * (100 - (b.discount ?? 0))) - (a.price * (100 - (a.discount ?? 0)))); break;
      case "discount": out.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0)); break;
      case "bestsell": out.sort((a, b) => b.sold - a.sold); break;
      case "rating": out.sort((a, b) => b.rating - a.rating); break;
      default: out.sort((a, b) => b.votes - a.votes);
    }
    return out;
  }, [cats, priceRange, onlyStock, onlyDiscount, minRating, sort]);

  const toggleCat = (c: string) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-extrabold text-zinc-800">دسته‌بندی</h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <label key={c.name} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50">
              <input
                type="checkbox"
                checked={cats.includes(c.name)}
                onChange={() => toggleCat(c.name)}
                className="size-4 accent-amber-600"
              />
              {c.name}
              <span className="ms-auto text-xs text-zinc-400">{faNum(PRODUCTS.filter((p) => p.category === c.name).length)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-extrabold text-zinc-800">محدوده قیمت</h4>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50">
              <input type="radio" name="price" checked={priceRange === r.id} onChange={() => setPriceRange(r.id)} className="size-4 accent-amber-600" />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-extrabold text-zinc-800">حداقل امتیاز</h4>
        <div className="flex gap-1.5">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn(
                "flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors",
                minRating === r ? "border-amber-500 bg-amber-50 text-amber-700" : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
              )}
            >
              {r === 0 ? "همه" : <><Star className="size-3.5 fill-amber-400 text-amber-400" /> {faNum(r)}+</>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm text-zinc-600 hover:bg-zinc-50">
          فقط کالاهای موجود
          <input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} className="size-4 accent-amber-600" />
        </label>
        <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm text-zinc-600 hover:bg-zinc-50">
          فقط تخفیف‌دارها
          <input type="checkbox" checked={onlyDiscount} onChange={(e) => setOnlyDiscount(e.target.checked)} className="size-4 accent-amber-600" />
        </label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      {/* مسیر + عنوان */}
      <div className="mb-5 flex items-center gap-2 text-xs text-zinc-400">
        <button onClick={() => navigate({ name: "home" })} className="hover:text-amber-700">خانه</button>
        <ArrowRight className="size-3 -scale-x-100" />
        <span className="text-zinc-600">{v?.amazing ? "پیشنهاد شگفت‌انگیز" : v?.category ? `عطرهای ${v.category}` : "همه محصولات"}</span>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2.5 text-xl font-black text-zinc-900 md:text-2xl">
          {v?.amazing ? (
            <><BadgePercent className="size-7 text-rose-600" /> پیشنهاد شگفت‌انگیز</>
          ) : (
            <><Package className="size-6 text-amber-600" /> {v?.category ? `عطرهای ${v.category}` : "همه محصولات"}</>
          )}
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-500">{faNum(list.length)} کالا</span>
        </h1>
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-zinc-700 lg:hidden"
        >
          <ListFilter className="size-4" />
          فیلترها
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* سایدبار فیلتر دسکتاپ */}
        <aside className="hidden h-fit rounded-2xl border border-zinc-100 bg-white p-5 lg:sticky lg:top-40 lg:block">
          <h3 className="mb-5 flex items-center gap-2 font-extrabold text-zinc-900">
            <ListFilter className="size-4.5 text-amber-600" />
            فیلترها
          </h3>
          <Filters />
        </aside>

        <div>
          {/* مرتب‌سازی */}
          <div className="mb-6 flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-zinc-100 bg-white p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="flex shrink-0 items-center gap-1.5 px-3 text-xs font-bold text-zinc-500">
              <ListFilter className="size-4" />
              مرتب‌سازی:
            </span>
            {SORTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={cn(
                  "shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors",
                  sort === s.id ? "bg-amber-100 text-amber-800" : "text-zinc-500 hover:bg-zinc-50"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-zinc-200 bg-white py-20 text-center">
              <Package className="size-14 text-zinc-200" />
              <p className="font-bold text-zinc-700">محصولی با این فیلترها پیدا نشد</p>
              <p className="text-sm text-zinc-400">فیلترها را تغییر دهید یا همه محصولات را ببینید</p>
              <button
                onClick={() => { setCats([]); setPriceRange("all"); setOnlyStock(false); setOnlyDiscount(false); setMinRating(0); }}
                className="mt-1 rounded-xl bg-amber-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-amber-500"
              >
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* مودال فیلتر موبایل */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-[80] bg-zinc-950/50 backdrop-blur-sm lg:hidden" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-[90] max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-6 lg:hidden"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-extrabold text-zinc-900">فیلترها</h3>
                <button onClick={() => setFiltersOpen(false)} className="grid size-8 place-items-center rounded-full hover:bg-zinc-100" aria-label="بستن">
                  <ChevronDown className="size-5 text-zinc-500" />
                </button>
              </div>
              <Filters />
              <button onClick={() => setFiltersOpen(false)} className="mt-6 w-full rounded-xl bg-amber-600 py-3.5 font-bold text-white">
                نمایش {faNum(list.length)} کالا
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
