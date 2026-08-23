import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, BadgePercent, Sparkles } from "lucide-react";
import { faNum, faPrice, priceAfterDiscount, type Product } from "./data";
import { useShop } from "./ShopContext";
import { cn } from "../utils/cn";

/* ---------- تصویر محصول از گرید ۲×۲ ---------- */
export function ProductImg({ p, className }: { p: Product; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`عطر ${p.name}`}
      className={cn("bg-[#e9e2d5]", className)}
      style={{
        backgroundImage: `url(/images/products/grid${p.grid}.jpg)`,
        backgroundSize: "200% 200%",
        backgroundPosition: p.pos,
      }}
    />
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("size-3.5", i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200")}
        />
      ))}
    </span>
  );
}

export function PriceBlock({ p, size = "md" }: { p: Product; size?: "md" | "lg" }) {
  const final = priceAfterDiscount(p.price, p.discount);
  return (
    <div className="flex items-end justify-between gap-2">
      {p.discount ? (
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-rose-600 text-[11px] font-bold text-white">
          {faNum(p.discount)}٪
        </span>
      ) : (
        <span />
      )}
      <span className="text-left">
        {p.discount && (
          <del className="block text-[11px] leading-4 text-zinc-400">{faPrice(p.price)}</del>
        )}
        <span className={cn("font-extrabold text-zinc-900", size === "lg" ? "text-2xl" : "text-base")}>
          {faPrice(final)}
          <span className="ms-1 text-[11px] font-normal text-zinc-500">تومان</span>
        </span>
      </span>
    </div>
  );
}

/* ---------- کارت محصول ---------- */
export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { navigate, addToCart, wishlist, toggleWish } = useShop();
  const wished = wishlist.includes(p.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate({ name: "product", id: p.id })}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-zinc-900/[0.07]"
    >
      <div className="relative overflow-hidden rounded-xl">
        <ProductImg p={p} className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.05]" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
          aria-label="علاقه‌مندی"
          className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-zinc-500 shadow transition-colors hover:text-rose-500"
        >
          <Heart className={cn("size-4", wished && "fill-rose-500 text-rose-500")} />
        </button>
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          {p.amazing && (
            <span className="flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white">
              <BadgePercent className="size-3" /> شگفت‌انگیز
            </span>
          )}
          {p.isNew && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
              <Sparkles className="size-3" /> جدید
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <p className="text-[11px] text-zinc-400">{p.brand} — {p.category}</p>
        <h3 className="mt-1 line-clamp-1 font-bold text-zinc-800 transition-colors group-hover:text-amber-700">
          عطر {p.name}
        </h3>
        <p className="font-latin text-[10px] tracking-wide text-zinc-400">{p.latin} — {p.volume}</p>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-500">
          <Stars rating={p.rating} />
          <span>{faNum(p.rating)} ({faNum(p.votes)})</span>
        </div>
        <div className="mt-auto pt-3">
          <PriceBlock p={p} />
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-600 hover:text-zinc-950"
          >
            <ShoppingCart className="size-4" />
            افزودن به سبد
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function SectionTitle({ title, sub, action, onAction }: { title: string; sub?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold text-zinc-900 md:text-2xl">{title}</h2>
        {sub && <p className="mt-1 text-sm text-zinc-500">{sub}</p>}
      </div>
      {action && (
        <button onClick={onAction} className="shrink-0 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-600">
          {action}
        </button>
      )}
    </div>
  );
}
