import { Reveal, Section, SectionHead } from "./shared";
import { MonitorSmartphone, ServerCog, BrainCircuit, Workflow, PenTool } from "lucide-react";

const STACKS = [
  {
    icon: MonitorSmartphone,
    title: "Frontend",
    latin: "FRONT-END",
    items: ["WordPress", "Elementor Pro", "Custom CSS", "JavaScript"],
  },
  {
    icon: ServerCog,
    title: "Backend",
    latin: "BACK-END",
    items: ["PHP", "WooCommerce", "WordPress REST API", "Custom Plugin Development"],
  },
  {
    icon: BrainCircuit,
    title: "هوش مصنوعی",
    latin: "ARTIFICIAL INTELLIGENCE",
    items: ["OpenAI API", "Claude API", "Gemini API", "DeepSeek API", "OpenRouter API"],
  },
  {
    icon: Workflow,
    title: "اتوماسیون",
    latin: "AUTOMATION",
    items: ["n8n", "Webhooks", "API Integration"],
  },
  {
    icon: PenTool,
    title: "طراحی",
    latin: "DESIGN",
    items: ["Figma", "Photoshop", "AI Image Generation"],
  },
];

export default function TechStack() {
  return (
    <Section id="tech" className="bg-ink-900/40">
      <SectionHead
        index="۰۷"
        kicker="جعبه‌ابزار پروژه"
        title={
          <>
            تکنولوژی‌هایی که این پلتفرم را <span className="gold-text">ساختند</span>
          </>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STACKS.map((s, i) => (
          <Reveal key={s.title} delay={0.06 * i} className={i === 2 ? "h-full sm:col-span-2 lg:col-span-1" : "h-full"}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-850 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/30">
              <span className="pointer-events-none absolute -end-14 -top-14 size-44 rounded-full bg-gold-500/[0.05] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gold-400 transition-all duration-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10">
                  <s.icon className="size-5" />
                </span>
                <span className="font-latin text-[9px] tracking-[0.3em] text-zinc-600">{s.latin}</span>
              </div>
              <h3 className="relative mt-5 text-lg font-extrabold text-white">{s.title}</h3>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-latin text-[12px] text-zinc-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* کارت پایانی */}
        <Reveal delay={0.3} className="h-full">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gold-500/25 bg-gradient-to-br from-gold-500/[0.12] via-ink-850 to-ink-850 p-7">
            <p className="font-latin text-[9px] tracking-[0.3em] text-gold-500">FULL-CYCLE</p>
            <p className="mt-4 text-lg font-bold leading-8 text-white">
              تمام این تکنولوژی‌ها در یک معماری یکپارچه، توسط یک توسعه‌دهنده طراحی و پیاده‌سازی
              شده‌اند.
            </p>
            <a
              href="#about"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-l from-gold-400 to-gold-600 px-5 py-2.5 text-sm font-bold text-ink-950 transition-transform hover:scale-105"
            >
              آشنایی با توسعه‌دهنده
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
