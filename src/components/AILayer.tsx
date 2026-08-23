import { Reveal, Section, SectionHead } from "./shared";
import {
  Cpu,
  FileText,
  ScanSearch,
  MessagesSquare,
  Wand2,
  Megaphone,
  BarChart3,
  Workflow,
} from "lucide-react";

const PROVIDERS = [
  "OpenAI",
  "Claude",
  "Gemini",
  "DeepSeek",
  "OpenRouter",
  "Mistral",
  "Llama",
  "Qwen",
  "Kimi",
  "GLM",
];

const CAPABILITIES = [
  { icon: FileText, label: "تولید محتوا" },
  { icon: ScanSearch, label: "تحلیل محصولات" },
  { icon: MessagesSquare, label: "پاسخگویی مشتری" },
  { icon: Wand2, label: "پیشنهاد محصول" },
  { icon: Megaphone, label: "تولید کمپین تبلیغاتی" },
  { icon: BarChart3, label: "تحلیل داده‌های فروش" },
];

function OrbitDiagram() {
  const R = 46; // درصد شعاع
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* حلقه‌ها */}
      <div className="absolute inset-0 animate-spin-slower">
        <svg viewBox="0 0 100 100" className="size-full">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.25" strokeDasharray="1.5 2.5" />
          <circle cx="50" cy="50" r={R - 9} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" />
        </svg>
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slower" style={{ animationDirection: "reverse", animationDuration: "110s" }}>
        <circle cx="50" cy="50" r={R - 17} fill="none" stroke="rgba(212,175,55,0.14)" strokeWidth="0.25" strokeDasharray="0.5 4" />
      </svg>

      {/* شعاع‌های اتصال */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        {PROVIDERS.map((_, i) => {
          const a = (i / PROVIDERS.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + R * Math.cos(a)}
              y2={50 + R * Math.sin(a)}
              stroke="rgba(212,175,55,0.22)"
              strokeWidth="0.22"
              strokeDasharray="1.2 2"
              className="animate-dash-flow"
            />
          );
        })}
      </svg>

      {/* هاب مرکزی */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full border border-gold-500/40 animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full border border-gold-500/25 animate-pulse-ring" style={{ animationDelay: "1.6s" }} />
        <div className="relative grid size-28 place-items-center rounded-full border border-gold-500/40 bg-ink-850/95 text-center shadow-[0_0_60px_-10px_rgba(212,175,55,0.45)] backdrop-blur-md md:size-36">
          <div>
            <Cpu className="mx-auto size-6 text-gold-300 md:size-8" />
            <p className="mt-1.5 font-latin text-[10px] font-bold tracking-widest text-gold-300 md:text-xs">
              VIORA AI CORE
            </p>
            <p className="mt-0.5 px-2 text-[9px] leading-4 text-zinc-500 md:text-[10px]">
              لایه ارکسترشن و مسیریابی مدل‌ها
            </p>
          </div>
        </div>
      </div>

      {/* چیپ‌های مدل‌ها */}
      {PROVIDERS.map((p, i) => {
        const a = (i / PROVIDERS.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={p}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 animate-float-soft rounded-full border border-white/10 bg-ink-900/95 px-3 py-1.5 font-latin text-[10px] font-semibold tracking-wide text-zinc-300 shadow-lg shadow-black/40 backdrop-blur transition-colors hover:border-gold-500/50 hover:text-gold-300 md:px-4 md:py-2 md:text-xs"
            style={{
              left: `${50 + R * Math.cos(a)}%`,
              top: `${50 + R * Math.sin(a)}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            <span className="me-1.5 inline-block size-1.5 rounded-full bg-gold-400 align-middle" />
            {p}
          </span>
        );
      })}
    </div>
  );
}

export default function AILayer() {
  return (
    <Section id="ai-layer" className="bg-ink-900/40">
      <SectionHead
        index="۰۵"
        kicker="زیرساخت هوشمند"
        title={
          <>
            <span className="font-latin">AI</span> Intelligence{" "}
            <span className="gold-text font-latin">Layer</span>
          </>
        }
        desc="این پروژه دارای یک لایه هوش مصنوعی قابل توسعه است که امکان اتصال به مدل‌ها و سرویس‌های مختلف را فراهم می‌کند. معماری سیستم به‌گونه‌ای طراحی شده که بدون وابستگی به یک ارائه‌دهنده، می‌تواند از مدل‌های گوناگون استفاده کند."
      />

      <Reveal>
        <OrbitDiagram />
      </Reveal>

      {/* مارکی مدل‌ها */}
      <Reveal delay={0.1}>
        <div dir="ltr" className="mask-fade-x mt-6 overflow-hidden py-4">
          <div className="flex w-max animate-marquee gap-3">
            {[...PROVIDERS, ...PROVIDERS].map((p, i) => (
              <span
                key={i}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-5 py-2 font-latin text-xs tracking-wider text-zinc-500"
              >
                <Workflow className="size-3.5 text-gold-600" />
                {p} API
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-14">
        <Reveal>
          <h3 className="mb-7 flex items-center gap-3 text-lg font-bold text-white">
            <span className="h-px w-8 bg-gold-500/50" />
            قابلیت‌های لایه هوش مصنوعی
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.label} delay={0.06 * i} className="h-full">
              <div className="group glass flex h-full items-center gap-4 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gold-400 transition-all duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                  <c.icon className="size-5" />
                </span>
                <span className="font-medium text-zinc-200">{c.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
