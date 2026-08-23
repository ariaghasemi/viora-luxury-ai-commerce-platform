import { motion } from "framer-motion";
import { ArrowDown, Sparkles, ShoppingBag, BrainCircuit, PenTool, Store, MoveLeft, BookOpenText } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const BADGES = [
  { icon: Sparkles, label: "WordPress" },
  { icon: ShoppingBag, label: "WooCommerce" },
  { icon: BrainCircuit, label: "هوش مصنوعی" },
  { icon: PenTool, label: "طراحی محصول" },
];

const STATS = [
  { value: "۱۰+", label: "مدل هوش مصنوعی قابل اتصال" },
  { value: "۵", label: "نوع تصویر اختصاصی برای هر محصول" },
  { value: "۶", label: "نوع متن تولیدی با AI برای هر محصول" },
  { value: "۹۰٪", label: "کاهش زمان تولید محتوای دیجیتال" },
];

function OrbitBadge() {
  return (
    <div className="relative grid size-32 place-items-center md:size-40">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slower">
        <defs>
          <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-zinc-500 font-latin" style={{ fontSize: 8.2, letterSpacing: 2.6 }}>
          <textPath href="#circ">AI COMMERCE • VIORA • CASE STUDY •</textPath>
        </text>
      </svg>
      <span className="absolute inset-4 rounded-full border border-dashed border-gold-500/25" />
      <motion.span
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="grid size-12 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10 md:size-14"
      >
        <ArrowDown className="size-5 text-gold-300" />
      </motion.span>
    </div>
  );
}

export default function Hero() {
  return (
    <div id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/[0.09] blur-[140px]" />
        <div className="absolute bottom-0 -start-40 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-24 -end-32 h-[380px] w-[380px] rounded-full bg-gold-600/[0.06] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-36 md:px-8 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="rounded-full border border-gold-500/30 bg-gold-500/[0.07] px-4 py-1.5 font-latin text-[11px] tracking-[0.3em] text-gold-300">
            CASE STUDY — 2025
          </span>
          <span className="hidden h-px w-20 bg-gradient-to-l from-gold-500/50 to-transparent sm:block" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-4 flex items-center gap-3 text-base font-medium text-gold-400 md:text-lg"
        >
          <Sparkles className="size-4" />
          معرفی پروژه
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: EASE }}
          className="font-latin text-[13vw] font-bold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[104px]"
        >
          <span className="gold-text">Viora</span> Luxury
          <br />
          AI Commerce
          <span className="ms-4 align-top font-latin text-[0.28em] font-medium tracking-widest text-zinc-600">
            PLATFORM
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
          className="mt-8 max-w-2xl text-lg leading-9 text-zinc-400 md:text-xl md:leading-10"
        >
          طراحی و توسعه یک پلتفرم فروشگاهی هوشمند با ترکیب{" "}
          <span className="text-zinc-200">طراحی تجربه کاربری</span>،{" "}
          <span className="text-zinc-200">تجارت الکترونیک</span> و{" "}
          <span className="gold-text font-semibold">هوش مصنوعی</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#/shop"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-gold-400 to-gold-600 px-7 py-3.5 font-bold text-ink-950 shadow-lg shadow-gold-500/25 transition-all hover:scale-105 hover:shadow-gold-500/40"
          >
            <Store className="size-5" />
            ورود به دموی زنده فروشگاه
            <MoveLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href="#overview"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-zinc-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
          >
            <BookOpenText className="size-4" />
            مطالعه کیس‌استدی
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {BADGES.map((b) => (
            <span
              key={b.label}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-gold-500/40"
            >
              <b.icon className="size-4 text-gold-400" />
              {b.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 flex items-end justify-between gap-8"
        >
          <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 + i * 0.08, ease: EASE }}
                className="bg-ink-900/90 p-5 md:p-6"
              >
                <p className="gold-text text-3xl font-extrabold md:text-4xl">{s.value}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.a
            href="#overview"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="hidden shrink-0 md:block"
            aria-label="اسکرول به پایین"
          >
            <OrbitBadge />
          </motion.a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
