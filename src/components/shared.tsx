import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  desc,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  desc?: ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <span className="font-latin text-xs tracking-[0.35em] text-gold-500">{index}</span>
          <span className="h-px w-14 bg-gradient-to-l from-gold-500/70 to-transparent" />
          <span className="text-xs font-medium tracking-widest text-zinc-500">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.25] text-white md:text-5xl md:leading-[1.2]">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg md:leading-9">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] text-zinc-300 transition-colors hover:border-gold-500/40 hover:text-gold-300">
      {children}
    </span>
  );
}
