import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Section, SectionHead } from "./shared";
import { Images, MoveHorizontal, Play, Wand2, Camera, MonitorSmartphone, LayoutDashboard, Clapperboard } from "lucide-react";

/* ---------- اسلایدر قبل / بعد ---------- */

function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      dir="ltr"
      className="group relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl border border-white/10 md:aspect-[21/9]"
    >
      {/* قبل */}
      <img
        src="/images/gallery-product-before.jpg"
        alt="تصویر اولیه محصول قبل از بازسازی"
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />
      {/* بعد */}
      <img
        src="/images/gallery-product-after.jpg"
        alt="تصویر محصول پس از بازسازی با هوش مصنوعی"
        className="absolute inset-0 size-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        draggable={false}
      />
      {/* برچسب‌ها */}
      <span className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur">
        قبل — عکس خام تامین‌کننده
      </span>
      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-ink-950">
        <Wand2 className="size-3.5" />
        بعد — بازسازی با AI
      </span>
      {/* دستگیره */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <span className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-dashed border-gold-400/80" />
        <span className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-400 bg-ink-950/90 text-gold-300 shadow-xl shadow-black/50 backdrop-blur transition-transform group-active:scale-95">
          <MoveHorizontal className="size-5" />
        </span>
      </div>
    </div>
  );
}

/* ---------- آیتم‌های گالری ---------- */

const ITEMS = [
  {
    src: "/images/gallery-store.jpg",
    icon: MonitorSmartphone,
    title: "اسکرین‌شات فروشگاه",
    desc: "صفحه اصلی فروشگاه با طراحی اختصاصی Dark Luxury",
    span: "md:col-span-7",
  },
  {
    video: "https://videos.pexels.com/video-files/8889787/8889787-uhd_4096_2160_24fps.mp4",
    poster:
      "https://images.pexels.com/videos/8889787/beautiful-cabin-country-house-countryside-8889787.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    icon: Clapperboard,
    title: "تیزر تبلیغاتی محصول",
    desc: "نمونه ویدیوی کمپین تولیدشده برای شبکه‌های اجتماعی",
    span: "md:col-span-5",
  },
  {
    src: "/images/gallery-lifestyle.jpg",
    icon: Camera,
    title: "تصویر Lifestyle",
    desc: "محصول در محیط واقعی — تولیدشده با هوش مصنوعی",
    span: "md:col-span-4",
  },
  {
    src: "/images/gallery-campaign.jpg",
    icon: Images,
    title: "ویژوال کمپین تبلیغاتی",
    desc: "خروجی کمپین فشن برای بنر و شبکه‌های اجتماعی",
    span: "md:col-span-4",
  },
  {
    src: "/images/gallery-dashboard.jpg",
    icon: LayoutDashboard,
    title: "داشبورد مدیریت",
    desc: "پنل تحلیل فروش، موجودی و رفتار مشتریان",
    span: "md:col-span-4",
  },
];

export default function Gallery() {
  return (
    <Section id="gallery">
      <SectionHead
        index="۰۸"
        kicker="گالری پروژه"
        title={
          <>
            خروجی واقعی؛ از <span className="gold-text">تصویر خام</span> تا کمپین نهایی
          </>
        }
        desc="نمونه‌هایی از دارایی‌های بصری و رابط‌های طراحی‌شده در این پروژه — همراه با مقایسه زنده «قبل و بعد» بازسازی تصویر محصول با هوش مصنوعی. دستگیره را بکشید."
      />

      <Reveal>
        <BeforeAfter />
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-12">
        {ITEMS.map((it, i) => (
          <Reveal key={it.title} delay={0.06 * i} className={it.span}>
            <figure className="group relative h-full min-h-[260px] overflow-hidden rounded-3xl border border-white/[0.07]">
              {it.video ? (
                <>
                  <video
                    src={it.video}
                    poster={it.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur"
                  >
                    <Play className="size-4 fill-current" />
                  </motion.span>
                </>
              ) : (
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-2 grid size-10 place-items-center rounded-xl border border-gold-500/30 bg-ink-950/70 text-gold-300 backdrop-blur">
                  <it.icon className="size-4.5" />
                </span>
                <h3 className="font-bold text-white">{it.title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-zinc-400">{it.desc}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
