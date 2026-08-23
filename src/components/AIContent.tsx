import { Reveal, Section } from "./shared";
import {
  Sparkles,
  Camera,
  Megaphone,
  Home,
  Share2,
  Clapperboard,
  Type,
  AlignLeft,
  FileText,
  ScanSearch,
  AtSign,
  ImagePlus,
  Wand2,
} from "lucide-react";

const IMAGE_TYPES = [
  { icon: Camera, label: "تصویر استودیویی محصول" },
  { icon: Megaphone, label: "تصویر تبلیغاتی" },
  { icon: Home, label: "تصویر استفاده در محیط واقعی" },
  { icon: Share2, label: "تصویر شبکه‌های اجتماعی" },
  { icon: Clapperboard, label: "تصویر کمپین تبلیغاتی" },
];

const TEXT_TYPES = [
  { icon: Type, label: "عنوان محصول" },
  { icon: AlignLeft, label: "توضیحات کوتاه" },
  { icon: FileText, label: "توضیحات کامل" },
  { icon: Megaphone, label: "متن تبلیغاتی" },
  { icon: ScanSearch, label: "متا دیسکریپشن SEO" },
  { icon: AtSign, label: "کپشن شبکه‌های اجتماعی" },
];

const SAMPLES = [
  { src: "/images/gallery-product-after.jpg", label: "استودیویی" },
  { src: "/images/gallery-lifestyle.jpg", label: "Lifestyle" },
  { src: "/images/gallery-campaign.jpg", label: "کمپین" },
];

export default function AIContent() {
  return (
    <Section id="ai-content" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-500/30 to-transparent" />

      <Reveal>
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/[0.07] px-5 py-2 text-sm font-semibold text-gold-300">
          <Sparkles className="size-4" />
          بخش ویژه — موتور محتوای پروژه
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-latin text-3xl font-bold leading-tight text-white md:text-6xl md:leading-[1.1]">
          AI Product <span className="gold-text">Content</span>
          <br />
          Creation
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg md:leading-9">
          یکی از بخش‌های مهم این پروژه، استفاده از هوش مصنوعی برای تولید محتوای حرفه‌ای محصولات
          بوده است. برای هر محصول یک پکیج کامل بصری و متنی تولید می‌شود؛ خروجی‌ای که پیش‌تر به یک
          استودیو کامل عکاسی و تیم کپی‌رایتینگ نیاز داشت.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* تصاویر */}
        <Reveal className="h-full">
          <div className="relative h-full overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-b from-gold-500/[0.06] to-transparent p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 p-3 text-ink-950">
                <ImagePlus className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-white">تصاویر تولیدشده برای هر محصول</h3>
                <p className="font-latin text-[10px] tracking-[0.3em] text-zinc-500">AI IMAGE SUITE</p>
              </div>
            </div>
            <ul className="mt-7 space-y-2.5">
              {IMAGE_TYPES.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-3.5 rounded-xl border border-white/[0.05] bg-ink-900/60 px-4 py-3.5 text-[15px] text-zinc-200 transition-colors hover:border-gold-500/25"
                >
                  <t.icon className="size-4.5 shrink-0 text-gold-400" />
                  {t.label}
                </li>
              ))}
            </ul>
            {/* نمونه‌های واقعی */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {SAMPLES.map((s) => (
                <figure key={s.label} className="group relative overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={s.src}
                    alt={s.label}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 pb-2 pt-6 text-center text-[11px] text-zinc-200">
                    {s.label}
                  </figcaption>
                  <span className="absolute end-1.5 top-1.5 rounded-md bg-gold-500 px-1.5 py-0.5 font-latin text-[8px] font-bold tracking-wider text-ink-950">
                    AI
                  </span>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        {/* متن‌ها */}
        <Reveal delay={0.12} className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/60 p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-13 place-items-center rounded-2xl border border-gold-500/30 bg-gold-500/10 p-3 text-gold-300">
                <Wand2 className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-white">متن‌های تولید و بهینه‌شده</h3>
                <p className="font-latin text-[10px] tracking-[0.3em] text-zinc-500">AI COPY PIPELINE</p>
              </div>
            </div>
            <ul className="mt-7 grid flex-1 content-start gap-2.5 sm:grid-cols-2">
              {TEXT_TYPES.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-3.5 rounded-xl border border-white/[0.05] bg-ink-850 px-4 py-3.5 text-[15px] text-zinc-200 transition-colors hover:border-gold-500/25"
                >
                  <t.icon className="size-4.5 shrink-0 text-gold-400" />
                  {t.label}
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl border border-dashed border-gold-500/30 bg-gold-500/[0.04] p-5">
              <p className="text-sm leading-7 text-zinc-400">
                <span className="font-semibold text-gold-300">چرخه کیفیت:</span> هر متن ابتدا توسط
                AI تولید و سپس بر اساس لحن برند، کلیدواژه‌های سئو و بازبینی انسانی بهینه‌سازی شد
                تا هم برای مخاطب جذاب باشد و هم برای موتورهای جستجو.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
