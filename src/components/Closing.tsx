import { Reveal, Section, SectionHead } from "./shared";
import {
  Quote,
  Phone,
  Mail,
  BadgeCheck,
  ArrowUp,
  Sparkles,
  Code2,
  ShoppingBag,
  BrainCircuit,
  PenTool,
  Workflow,
  Clock3,
} from "lucide-react";

const SKILLS = [
  { icon: Code2, label: "WordPress Development" },
  { icon: ShoppingBag, label: "WooCommerce" },
  { icon: BrainCircuit, label: "AI Integration" },
  { icon: PenTool, label: "UI/UX & Product Design" },
  { icon: Workflow, label: "Automation (n8n)" },
];

export function Result() {
  return (
    <Section id="result">
      <div className="relative overflow-hidden rounded-[36px] border border-gold-500/20 bg-ink-900/60 px-8 py-16 text-center md:px-16 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-gold-500/[0.1] blur-[110px]" />
        </div>
        <Reveal>
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-700 text-ink-950 shadow-lg shadow-gold-500/25">
            <Quote className="size-6" />
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl text-2xl font-bold leading-[1.9] text-white md:text-3xl md:leading-[1.9]">
            این پروژه نشان‌دهنده ترکیب <span className="gold-text">توسعه وب</span>،{" "}
            <span className="gold-text">طراحی محصول</span>، <span className="gold-text">تجارت الکترونیک</span> و{" "}
            <span className="gold-text">هوش مصنوعی</span> برای ساخت یک تجربه دیجیتال کامل است.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg md:leading-9">
            هدف تنها ساخت یک وب‌سایت نبود؛ بلکه ایجاد یک زیرساخت قابل توسعه برای رشد یک برند
            دیجیتال بود — زیرساختی که با کسب‌وکار رشد می‌کند.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" className="bg-ink-900/40">
      <SectionHead
        index="۰۹"
        kicker="پشت صحنه پروژه"
        title={
          <>
            طراح و توسعه‌دهنده <span className="gold-text">پروژه</span>
          </>
        }
      />
      <div className="grid gap-10 lg:grid-cols-5">
        {/* عکس */}
        <Reveal className="lg:col-span-2">
          <div className="group relative mx-auto max-w-sm">
            <span className="pointer-events-none absolute -inset-4 rounded-[36px] border border-dashed border-gold-500/25" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10">
              <img
                src="/images/aria-portrait.jpg"
                alt="آریا قاسمی — طراح و توسعه‌دهنده پروژه Viora"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="flex items-center gap-2 text-sm font-bold text-gold-300">
                  <BadgeCheck className="size-4" />
                  Full-Cycle Developer
                </p>
                <p className="mt-1 text-xs leading-6 text-zinc-400">
                  از استراتژی و طراحی تا کدنویسی، اتصال AI و راه‌اندازی
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* اطلاعات */}
        <div className="lg:col-span-3">
          <Reveal delay={0.08}>
            <h3 className="text-3xl font-extrabold text-white md:text-4xl">آریا قاسمی</h3>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
              <span className="font-latin text-xs tracking-[0.25em] text-gold-500">ARIA GHASEMI</span>
              <span className="size-1 rounded-full bg-zinc-600" />
              طراح و توسعه‌دهنده پروژه — متخصص WordPress و هوش مصنوعی
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl leading-8 text-zinc-400">
              پروژه Viora به‌صورت End-to-End توسط من طراحی و توسعه یافته است؛ از معماری فروشگاه و
              طراحی رابط کاربری گرفته تا ساخت لایه هوش مصنوعی، اتوماسیون گردش‌کار و تولید محتوای
              بصری برند.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {SKILLS.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-latin text-[12px] text-zinc-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
                >
                  <s.icon className="size-3.5 text-gold-400" />
                  {s.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <a
                href="tel:09202099052"
                className="group glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-700 text-ink-950">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-zinc-500">شماره موبایل</span>
                  <span dir="ltr" className="mt-1 block font-latin text-lg font-bold tracking-wider text-white group-hover:text-gold-300">
                    0920 209 9052
                  </span>
                </span>
              </a>
              <a
                href="mailto:ariagh1386.work@gmail.com"
                className="group glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Mail className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-zinc-500">ایمیل</span>
                  <span className="mt-1 block truncate font-latin text-sm font-semibold text-white group-hover:text-gold-300 sm:text-base">
                    ariagh1386.work@gmail.com
                  </span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
              <Clock3 className="size-3.5 text-gold-600" />
              معمولاً در کمتر از ۲۴ ساعت پاسخگو هستم — برای پروژه مشابه همین حالا در تماس باشید.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-10">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-transparent to-ink-950" />
      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#top" className="flex items-center gap-3">
            <svg viewBox="0 0 64 64" className="size-9">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f2dda6" />
                  <stop offset="1" stopColor="#b18f2a" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="16" fill="#12121c" />
              <path d="M15 20 L32 48 L49 20" fill="none" stroke="url(#fg)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 8 l1.7 3.6 3.6 1.7 -3.6 1.7 -1.7 3.6 -1.7 -3.6 -3.6 -1.7 3.6 -1.7z" fill="#f2dda6" />
            </svg>
            <span className="font-latin text-lg font-bold tracking-[0.3em] text-white">VIORA</span>
          </a>
          <p className="max-w-md text-sm leading-7 text-zinc-500">
            <span className="text-zinc-300">Viora Luxury AI Commerce Platform</span> — کیس‌استدی
            طراحی و توسعه یک پلتفرم فروشگاهی هوشمند با WordPress ،WooCommerce و هوش مصنوعی.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 font-latin text-[11px] tracking-widest text-zinc-600">
            {["WORDPRESS", "WOOCOMMERCE", "AI", "ELEMENTOR PRO", "N8N", "FIGMA"].map((t) => (
              <span key={t} className="rounded-full border border-white/[0.07] px-3 py-1">
                {t}
              </span>
            ))}
          </div>
          <span className="h-px w-full max-w-lg bg-gradient-to-l from-transparent via-white/10 to-transparent" />
          <div className="flex w-full flex-col items-center justify-between gap-5 text-xs text-zinc-600 md:flex-row">
            <p className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-gold-600" />
              طراحی و توسعه: <span className="font-semibold text-zinc-400">آریا قاسمی</span> © ۱۴۰۴ — ۲۰۲۵
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              بازگشت به بالا
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
