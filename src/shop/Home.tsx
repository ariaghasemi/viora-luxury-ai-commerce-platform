import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowLeft, BadgePercent, Flame, Timer,
  ShieldCheck, Truck, RotateCcw, Lock, Sparkles, Crown,
} from "lucide-react";
import { CATEGORIES, GUARANTEES, PRODUCTS, SLIDES, faNum } from "./data";
import { useShop } from "./ShopContext";
import { ProductCard, SectionTitle } from "./ui";
import { cn } from "../utils/cn";

/* ---------- اسلایدر اصلی ---------- */
function HeroSlider() {
  const { navigate } = useShop();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const s = SLIDES[i];

  return (
    <div
      className="relative h-[340px] overflow-hidden rounded-3xl md:h-[420px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={s.img} alt={s.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-zinc-950/85 via-zinc-950/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur">
              <Crown className="size-3.5" />
              {s.kicker}
            </p>
            <h1 className="max-w-lg text-3xl font-black leading-[1.3] text-white md:text-5xl md:leading-[1.25]">{s.title}</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300 md:text-base md:leading-8">{s.desc}</p>
            <button
              onClick={() => navigate({ name: "listing", amazing: i === 0 })}
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:bg-amber-400"
            >
              {s.cta}
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* کنترل‌ها */}
      <div className="absolute bottom-5 left-5 flex items-center gap-2">
        {SLIDES.map((_, d) => (
          <button
            key={d}
            onClick={() => setI(d)}
            aria-label={`اسلاید ${d + 1}`}
            className={cn("h-1.5 rounded-full transition-all", d === i ? "w-8 bg-amber-400" : "w-3 bg-white/40 hover:bg-white/70")}
          />
        ))}
      </div>
      <div className="absolute bottom-5 right-5 hidden gap-2 md:flex">
        <button onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)} aria-label="قبلی" className="grid size-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30">
          <ChevronRight className="size-5" />
        </button>
        <button onClick={() => setI((i + 1) % SLIDES.length)} aria-label="بعدی" className="grid size-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30">
          <ChevronLeft className="size-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- دایره دسته‌بندی ---------- */
function CategoryRow() {
  const { navigate } = useShop();
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6">
      {CATEGORIES.map((c, idx) => (
        <motion.button
          key={c.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.07, duration: 0.5 }}
          onClick={() => navigate({ name: "listing", category: c.name })}
          className="group flex flex-col items-center gap-3"
        >
          <span className="relative overflow-hidden rounded-full border-2 border-amber-100 transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/20">
            <span
              className="block size-20 bg-[#e9e2d5] transition-transform duration-500 group-hover:scale-110 md:size-28"
              style={{
                backgroundImage: `url(/images/products/grid${c.grid}.jpg)`,
                backgroundSize: "200% 200%",
                backgroundPosition: c.pos,
              }}
            />
          </span>
          <span className="text-center">
            <span className="block text-sm font-bold text-zinc-800">{c.name}</span>
            <span className="mt-0.5 hidden text-[11px] text-zinc-400 md:block">{c.desc}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}

/* ---------- شمارش معکوس ---------- */
function useCountdown() {
  const [left, setLeft] = useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1000);
      setLeft({
        h: faNum(String(h).padStart(2, "0")),
        m: faNum(String(m).padStart(2, "0")),
        s: faNum(String(s).padStart(2, "0")),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return left;
}

function Digit({ v }: { v: string }) {
  return (
    <span className="grid min-w-9 place-items-center rounded-lg bg-white/15 px-1.5 py-1.5 font-latin text-sm font-bold text-white backdrop-blur">
      {v}
    </span>
  );
}

function AmazingRow() {
  const { navigate } = useShop();
  const t = useCountdown();
  const list = PRODUCTS.filter((p) => p.amazing);
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-rose-700 via-rose-600 to-rose-700 p-5 md:p-7"
    >
      <span className="pointer-events-none absolute -left-16 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <h2 className="flex items-center gap-2 text-xl font-black text-white md:text-2xl">
          <BadgePercent className="size-7" />
          پیشنهاد شگفت‌انگیز
        </h2>
        <div className="flex items-center gap-2 text-sm text-white/90">
          <Timer className="size-4" />
          <span className="hidden sm:inline">تا پایان:</span>
          <span className="flex items-center gap-1" dir="ltr">
            <Digit v={t.h} /><span className="text-white/70">:</span><Digit v={t.m} /><span className="text-white/70">:</span><Digit v={t.s} />
          </span>
        </div>
        <button
          onClick={() => navigate({ name: "listing", amazing: true })}
          className="ms-auto flex items-center gap-1.5 text-sm font-bold text-white/95 transition-colors hover:text-white"
        >
          مشاهده همه
          <ArrowLeft className="size-4" />
        </button>
      </div>

      <div className="relative">
        <div ref={scroller} className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: "x mandatory" }}>
          {list.map((p) => (
            <div key={p.id} className="w-[230px] shrink-0" style={{ scrollSnapAlign: "start" }}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
        <div className="absolute -bottom-1 left-1 hidden gap-2 md:flex">
          <button onClick={() => scroller.current?.scrollBy({ left: 500, behavior: "smooth" })} aria-label="اسکرول به چپ" className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={() => scroller.current?.scrollBy({ left: -500, behavior: "smooth" })} aria-label="اسکرول به راست" className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

/* ---------- بنر دوگانه ---------- */
function DuoBanners() {
  const { navigate } = useShop();
  const banners = [
    { img: "/images/gallery-campaign.jpg", title: "کالکشن مجلسی زنانه", sub: "رایحه‌هایی برای شب‌های به‌یادماندنی", cat: "زنانه" },
    { img: "/images/gallery-lifestyle.jpg", title: "کالکشن روزمره", sub: "تازگی و سبکی برای هر روز", cat: "یونیسکس" },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {banners.map((b, i) => (
        <motion.button
          key={b.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          onClick={() => navigate({ name: "listing", category: b.cat })}
          className="group relative h-48 overflow-hidden rounded-3xl text-right md:h-56"
        >
          <img src={b.img} alt={b.title} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-l from-zinc-950/75 via-zinc-950/30 to-transparent" />
          <span className="absolute inset-0 flex flex-col items-start justify-center p-7">
            <span className="text-xl font-black text-white md:text-2xl">{b.title}</span>
            <span className="mt-2 text-sm text-zinc-300">{b.sub}</span>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur transition-colors group-hover:bg-amber-500 group-hover:text-zinc-950">
              مشاهده محصولات
              <ArrowLeft className="size-3.5" />
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}

/* ---------- خانه ---------- */
export default function ShopHome() {
  const { navigate } = useShop();
  const bestsellers = PRODUCTS.filter((p) => p.bestseller);
  const newest = PRODUCTS.filter((p) => p.isNew);
  const icons = [ShieldCheck, Truck, RotateCcw, Lock];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-14 px-4 py-6 md:px-8">
      <HeroSlider />

      <CategoryRow />

      <AmazingRow />

      <section>
        <SectionTitle
          title="پرفروش‌ترین‌های ویورا"
          sub="انتخاب اول مشتریان در ۹۰ روز گذشته"
          action="مشاهده همه محصولات"
          onAction={() => navigate({ name: "listing" })}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bestsellers.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      <DuoBanners />

      <section>
        <SectionTitle
          title="تازه‌رسیده‌ها"
          sub="جدیدترین رایحه‌های اضافه‌شده به فروشگاه"
          action="مشاهده همه"
          onAction={() => navigate({ name: "listing" })}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {newest.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      {/* نوار اعتماد */}
      <section className="grid grid-cols-2 gap-4 rounded-3xl border border-zinc-100 bg-white p-6 md:grid-cols-4 md:p-8">
        {GUARANTEES.map((g, i) => {
          const Icon = icons[i];
          return (
            <div key={g.title} className="flex items-center gap-3.5">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-bold text-zinc-800">{g.title}</span>
                <span className="mt-0.5 block text-xs text-zinc-400">{g.desc}</span>
              </span>
            </div>
          );
        })}
      </section>

      {/* بنر AI */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 md:p-12">
        <span className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3.5 py-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="size-3.5" />
              قدرت‌گرفته از هوش مصنوعی
            </p>
            <h2 className="text-2xl font-black leading-9 text-white md:text-3xl md:leading-[1.4]">
              نمی‌دانی کدام عطر مناسب توست؟ از دستیار هوشمند ویورا بپرس
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              بودجه، سلیقه و موقعیت استفاده را بگو تا بهترین پیشنهادها را در چند ثانیه دریافت کنی.
            </p>
          </div>
          <button
            onClick={() => navigate({ name: "listing" })}
            className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 font-bold text-zinc-950 transition-all hover:bg-amber-400"
          >
            <Flame className="size-5" />
            شروع انتخاب هوشمند
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
