import { Reveal, Section, SectionHead } from "./shared";
import {
  Camera,
  Megaphone,
  Image,
  LayoutGrid,
  FileText,
  Award,
  Files,
  Timer,
  MessagesSquare,
  TrendingUp,
  PenTool,
  LayoutTemplate,
  MousePointerClick,
  Smartphone,
  Gauge,
  Boxes,
  Network,
  Search,
  Wand2,
  CreditCard,
  Target,
} from "lucide-react";

/* ---------------- بخش اول: معرفی ---------------- */

const VISUAL_PARTS = [
  { icon: Camera, label: "تصاویر محصولات" },
  { icon: Megaphone, label: "تصاویر تبلیغاتی" },
  { icon: Image, label: "تصاویر Lifestyle" },
  { icon: LayoutGrid, label: "بنرهای تبلیغاتی" },
  { icon: FileText, label: "محتوای معرفی محصولات" },
];

export function Overview() {
  return (
    <Section id="overview" className="pt-10 md:pt-16">
      <SectionHead
        index="۰۱"
        kicker="نمای کلی پروژه"
        title={
          <>
            یک تجربه خرید <span className="gold-text">نسل جدید</span>؛ فراتر از یک فروشگاه ساده
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="glass relative h-full overflow-hidden rounded-3xl p-8 md:p-10">
            <span className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full bg-gold-500/[0.08] blur-3xl" />
            <p className="relative text-lg leading-9 text-zinc-300 md:text-xl md:leading-10">
              این پروژه با هدف ایجاد یک تجربه خرید نسل جدید طراحی شده است؛ جایی که{" "}
              <span className="font-semibold text-white">طراحی رابط کاربری</span>،{" "}
              <span className="font-semibold text-white">فروش آنلاین</span>،{" "}
              <span className="font-semibold text-white">تولید محتوای دیجیتال</span> و{" "}
              <span className="gold-text font-semibold">هوش مصنوعی</span> در یک سیستم یکپارچه ترکیب
              شده‌اند.
            </p>
            <p className="relative mt-6 leading-8 text-zinc-400">
              در این پروژه تمام اجزای بصری برند با استفاده از ابزارهای هوش مصنوعی تولید و
              بهینه‌سازی شده‌اند تا یک هویت بصری یکپارچه و حرفه‌ای برای برند ایجاد شود؛ هویتی که در
              تمام نقاط تماس مشتری — از صفحه محصول تا کمپین تبلیغاتی — یک زبان بصری واحد را روایت
              می‌کند.
            </p>
          </div>
        </Reveal>
        <div className="flex flex-col gap-3 lg:col-span-2">
          {VISUAL_PARTS.map((p, i) => (
            <Reveal key={p.label} delay={0.06 * i}>
              <div className="group glass flex items-center gap-4 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/30">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.08] text-gold-300 transition-transform duration-300 group-hover:scale-110">
                  <p.icon className="size-5" />
                </span>
                <span className="font-medium text-zinc-200">{p.label}</span>
                <span className="ms-auto font-latin text-[10px] tracking-widest text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
                  AI GENERATED
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- بخش دوم: چالش ---------------- */

const CHALLENGES = [
  { icon: Award, title: "ایجاد ظاهر حرفه‌ای", desc: "هم‌تراز با استاندارد بصری برندهای بین‌المللی لوکس" },
  { icon: Files, title: "حجم بالای محتوا", desc: "نیاز به تولید محتوای زیاد و باکیفیت برای کاتالوگ محصولات" },
  { icon: Timer, title: "سرعت تولید", desc: "کاهش زمان تولید تصاویر و متن‌های تبلیغاتی از هفته به ساعت" },
  { icon: MessagesSquare, title: "ارتباط هوشمند", desc: "ایجاد گفت‌وگوی زنده و شخصی‌سازی‌شده بین مشتری و فروشگاه" },
  { icon: TrendingUp, title: "نرخ تبدیل", desc: "افزایش تبدیل بازدیدکننده به مشتری واقعی در تمام مسیر خرید" },
];

export function Challenge() {
  return (
    <Section id="challenge" className="bg-ink-900/40">
      <SectionHead
        index="۰۲"
        kicker="بیان مسئله"
        title={
          <>
            هدف، ساخت یک فروشگاه نبود؛ ساخت یک <span className="gold-text">سیستم رشد برند</span> بود
          </>
        }
        desc="هدف اصلی پروژه فقط ساخت یک فروشگاه اینترنتی نبود؛ بلکه ایجاد یک سیستم دیجیتال کامل برای رشد برند بود. پنج چالش کلیدی در مسیر این هدف قرار داشت:"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CHALLENGES.map((c, i) => (
          <Reveal key={c.title} delay={0.07 * i} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-850 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/30">
              <span className="pointer-events-none absolute -top-10 end-6 font-latin text-7xl font-bold text-white/[0.04] transition-colors group-hover:text-gold-500/10">
                0{i + 1}
              </span>
              <span className="relative grid size-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gold-400 transition-all duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                <c.icon className="size-5" />
              </span>
              <h3 className="relative mt-5 font-bold text-white">{c.title}</h3>
              <p className="relative mt-2.5 text-sm leading-7 text-zinc-500">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- بخش سوم: راهکار ---------------- */

const SITE_DESIGN = [
  { icon: PenTool, label: "طراحی UI اختصاصی" },
  { icon: LayoutTemplate, label: "طراحی صفحات فروشگاهی" },
  { icon: MousePointerClick, label: "بهینه‌سازی تجربه کاربری" },
  { icon: Smartphone, label: "طراحی کاملاً Responsive" },
  { icon: Gauge, label: "بهینه‌سازی سرعت بارگذاری" },
];

const SALES_SYSTEM = [
  { icon: Boxes, label: "مدیریت محصولات" },
  { icon: Network, label: "دسته‌بندی هوشمند" },
  { icon: Search, label: "جستجوی پیشرفته" },
  { icon: Wand2, label: "سیستم پیشنهاد محصول" },
  { icon: CreditCard, label: "بهینه‌سازی فرآیند Checkout" },
];

function SolutionPanel({
  icon: Icon,
  title,
  latin,
  items,
  delay,
}: {
  icon: typeof PenTool;
  title: string;
  latin: string;
  items: { icon: typeof PenTool; label: string }[];
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition-colors duration-300 hover:border-gold-500/25 md:p-9">
        <span className="pointer-events-none absolute -start-20 -top-20 size-64 rounded-full bg-gold-500/[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-150" />
        <div className="relative flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 text-ink-950 shadow-lg shadow-gold-500/20">
            <Icon className="size-6" />
          </span>
          <div>
            <h3 className="text-xl font-extrabold text-white">{title}</h3>
            <p className="font-latin text-[10px] tracking-[0.3em] text-zinc-500">{latin}</p>
          </div>
        </div>
        <ul className="relative mt-8 space-y-2.5">
          {items.map((it) => (
            <li
              key={it.label}
              className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-white/[0.06] hover:bg-white/[0.03]"
            >
              <it.icon className="size-4.5 shrink-0 text-gold-400" />
              <span className="text-[15px] text-zinc-300">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function Solution() {
  return (
    <Section id="solution">
      <SectionHead
        index="۰۳"
        kicker="راهکار ارائه‌شده"
        title={
          <>
            معماری ترکیبی <span className="font-latin">WordPress</span> +{" "}
            <span className="font-latin">WooCommerce</span> + <span className="gold-text">AI</span>
          </>
        }
        desc="برای حل این چالش‌ها یک معماری ترکیبی از WordPress ،WooCommerce و سرویس‌های هوش مصنوعی طراحی شد؛ معماری که دو ستون اصلی «تجربه» و «فروش» را پوشش می‌دهد."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SolutionPanel icon={PenTool} title="طراحی سایت" latin="DESIGN & EXPERIENCE" items={SITE_DESIGN} delay={0} />
        <SolutionPanel icon={Target} title="سیستم فروش" latin="SALES ENGINE" items={SALES_SYSTEM} delay={0.12} />
      </div>
    </Section>
  );
}
