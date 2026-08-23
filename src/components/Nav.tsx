import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Store } from "lucide-react";
import { cn } from "../utils/cn";

const LINKS = [
  { href: "#overview", label: "معرفی پروژه" },
  { href: "#challenge", label: "چالش" },
  { href: "#solution", label: "راهکار" },
  { href: "#ai-layer", label: "لایه هوش مصنوعی" },
  { href: "#tech", label: "تکنولوژی‌ها" },
  { href: "#gallery", label: "گالری" },
  { href: "#about", label: "تماس" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group flex items-center gap-3", className)}>
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-gold-500/30 bg-ink-800">
        <svg viewBox="0 0 64 64" className="size-6">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f2dda6" />
              <stop offset="1" stopColor="#b18f2a" />
            </linearGradient>
          </defs>
          <path
            d="M15 18 L32 48 L49 18"
            fill="none"
            stroke="url(#lg)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M32 6 l1.8 3.9 3.9 1.8 -3.9 1.8 -1.8 3.9 -1.8 -3.9 -3.9 -1.8 3.9 -1.8z" fill="#f2dda6" />
        </svg>
        <span className="absolute inset-0 bg-gold-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="leading-tight">
        <span className="block font-latin text-sm font-bold tracking-widest text-white">VIORA</span>
        <span className="block text-[10px] tracking-wider text-zinc-500">AI Commerce Case Study</span>
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-white/5 bg-ink-950/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.slice(0, 6).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-zinc-400 transition-colors hover:text-gold-300"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#/shop"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-l from-gold-400 to-gold-600 px-5 py-2 text-[13px] font-bold text-ink-950 transition-transform hover:scale-105 sm:inline-flex"
            >
              <Store className="size-3.5" />
              دموی زنده فروشگاه
            </a>
            <a
              href="#about"
              className="hidden items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-5 py-2 text-[13px] font-semibold text-gold-300 transition-all hover:bg-gold-500/20 sm:inline-flex"
            >
              <Phone className="size-3.5" />
              تماس با من
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-white/10 text-zinc-300 lg:hidden"
              aria-label="منو"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-white/10 text-zinc-300"
                aria-label="بستن"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="py-3 text-2xl font-bold text-zinc-200 transition-colors hover:text-gold-300"
                >
                  <span className="me-3 font-latin text-xs text-gold-600">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#/shop"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-gold-400 to-gold-600 px-6 py-3 text-sm font-bold text-ink-950"
              >
                <Store className="size-4" />
                ورود به دموی زنده فروشگاه
              </motion.a>
            </nav>
            <p className="px-8 pb-10 font-latin text-xs tracking-widest text-zinc-600">ARIA GHASEMI — 2025</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
