import { motion } from "framer-motion";
import { Reveal, Section, SectionHead } from "./shared";
import { Compass, PenTool, Code2, BrainCircuit, Sparkles, Rocket } from "lucide-react";

const PHASES = [
  {
    icon: Compass,
    phase: "فاز ۰۱",
    title: "کشف و استراتژی",
    desc: "تحلیل برند، مطالعه رقبای بین‌المللی، تعریف پرسونای مشتری و نقشه رشد دیجیتال",
  },
  {
    icon: PenTool,
    phase: "فاز ۰۲",
    title: "طراحی تجربه کاربری",
    desc: "وایرفریم، طراحی دیزاین‌سیستم اختصاصی در Figma و پروتوتایپ تعاملی صفحات کلیدی",
  },
  {
    icon: Code2,
    phase: "فاز ۰۳",
    title: "توسعه فروشگاه",
    desc: "پیاده‌سازی روی WordPress و WooCommerce با Elementor Pro ،CSS اختصاصی و افزونه‌های سفارشی",
  },
  {
    icon: BrainCircuit,
    phase: "فاز ۰۴",
    title: "یکپارچه‌سازی هوش مصنوعی",
    desc: "اتصال مدل‌های زبانی، ساخت دستیار مشتری و اتوماسیون گردش‌کار با n8n و Webhook",
  },
  {
    icon: Sparkles,
    phase: "فاز ۰۵",
    title: "تولید محتوای محصول",
    desc: "تولید تصاویر چندمنظوره و متن‌های فروش برای کل کاتالوگ با AI و بهینه‌سازی انسانی",
  },
  {
    icon: Rocket,
    phase: "فاز ۰۶",
    title: "بهینه‌سازی و راه‌اندازی",
    desc: "بهینه‌سازی سرعت، سئو تکنیکال، تست مسیر خرید و لانچ نهایی پلتفرم",
  },
];

export default function Timeline() {
  return (
    <Section id="timeline" className="bg-ink-900/40">
      <SectionHead
        index="—"
        kicker="نقشه راه اجرا"
        title={
          <>
            مسیر پروژه؛ از <span className="gold-text">ایده</span> تا راه‌اندازی
          </>
        }
      />
      <div className="relative">
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute start-[27px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold-500/60 via-gold-500/20 to-transparent md:start-1/2"
        />
        <div className="space-y-10 md:space-y-0">
          {PHASES.map((p, i) => {
            const leftSide = i % 2 === 0;
            return (
              <div key={p.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                <Reveal
                  delay={0.08}
                  className={
                    "relative ps-20 md:ps-0 md:py-8 " +
                    (leftSide ? "md:col-start-1 md:pe-16 md:text-end" : "md:col-start-2 md:ps-16")
                  }
                >
                  <span
                    className={
                      "absolute top-1 grid size-14 place-items-center rounded-2xl border border-gold-500/30 bg-ink-850 text-gold-300 shadow-[0_0_30px_-6px_rgba(212,175,55,0.35)] start-0 md:top-8 " +
                      (leftSide ? "md:-end-7 md:start-auto" : "md:-start-7")
                    }
                  >
                    <p.icon className="size-6" />
                  </span>
                  <div className="group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/25 md:p-7">
                    <p className="font-latin text-[10px] tracking-[0.35em] text-gold-500">{p.phase}</p>
                    <h3 className="mt-2 text-lg font-extrabold text-white md:text-xl">{p.title}</h3>
                    <p className="mt-2.5 text-sm leading-7 text-zinc-400">{p.desc}</p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
