import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Section, SectionHead } from "./shared";
import { Bot, MessagesSquare, Wand2, ListChecks, Route, Send, CheckCheck } from "lucide-react";
import { cn } from "../utils/cn";

const SCRIPT: { from: "user" | "ai"; text: string }[] = [
  { from: "user", text: "سلام! دنبال یک عطر برای هدیه می‌گردم، بودجه‌ام حدود ۳ میلیون تومان است." },
  {
    from: "ai",
    text: "سلام، وقت‌تان بخیر! در این بازه سه گزینه محبوب داریم. اگر رایحه‌های گرم و شرقی می‌پسندید، «عود سلطنتی» با ماندگاری ۱۲ ساعته پیشنهاد اول من است.",
  },
  { from: "user", text: "فرقش با «شب یاس» چیست؟" },
  {
    from: "ai",
    text: "«شب یاس» خنک‌تر و گلی‌تر است و برای استفاده روزانه مناسب‌تر؛ «عود سلطنتی» رسمی‌تر و ماندگارتر. ۸۲٪ خریداران برای هدیه «عود سلطنتی» را انتخاب کرده‌اند. مایلید جعبه کادویی هم اضافه کنم؟",
  },
];

const FEATURES = [
  { icon: MessagesSquare, title: "پاسخ به سوالات", desc: "پاسخ‌گویی فوری و دقیق به سوالات مشتریان، در هر ساعت از شبانه‌روز" },
  { icon: Wand2, title: "پیشنهاد محصول", desc: "پیشنهاد هوشمند محصولات مناسب بر اساس نیاز، سلیقه و بودجه مشتری" },
  { icon: ListChecks, title: "توضیح ویژگی‌ها", desc: "شرح شفاف ویژگی‌ها، تفاوت‌ها و کاربرد هر محصول به زبان ساده" },
  { icon: Route, title: "راهنمایی تا خرید", desc: "همراهی مشتری در تمام مسیر، از انتخاب محصول تا تکمیل سفارش" },
];

function ChatMock() {
  const [visible, setVisible] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let inner: ReturnType<typeof setTimeout>;
    const loop = setInterval(() => {
      setTyping(true);
      inner = setTimeout(() => {
        setTyping(false);
        setVisible((v) => (v >= SCRIPT.length ? 0 : v + 1));
      }, 1100);
    }, 2800);
    return () => {
      clearInterval(loop);
      clearTimeout(inner);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-ink-850 shadow-2xl shadow-black/50">
      {/* هدر چت */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-ink-900/80 px-5 py-4">
        <span className="relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-700 text-ink-950">
          <Bot className="size-5" />
          <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
        </span>
        <div>
          <p className="text-sm font-bold text-white">دستیار خرید Viora</p>
          <p className="text-[11px] text-emerald-400">آنلاین — پاسخ در چند ثانیه</p>
        </div>
        <span className="ms-auto rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 font-latin text-[9px] font-bold tracking-widest text-gold-300">
          AI AGENT
        </span>
      </div>

      {/* پیام‌ها */}
      <div className="flex h-[340px] flex-col justify-end gap-3 overflow-hidden p-5">
        <AnimatePresence initial={false}>
          {SCRIPT.slice(0, visible).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn("flex", m.from === "user" ? "justify-start" : "justify-end")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-6",
                  m.from === "user"
                    ? "rounded-br-sm bg-white/[0.06] text-zinc-200"
                    : "rounded-bl-sm border border-gold-500/20 bg-gold-500/[0.09] text-zinc-100"
                )}
              >
                {m.text}
                {m.from === "user" && (
                  <CheckCheck className="ms-1.5 inline size-3.5 align-middle text-gold-500" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-gold-500/20 bg-gold-500/[0.09] px-4 py-3.5">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                  className="size-1.5 rounded-full bg-gold-300"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ورودی */}
      <div className="flex items-center gap-3 border-t border-white/[0.06] bg-ink-900/80 px-5 py-4">
        <span className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-zinc-600">
          سوال خود را بپرسید…
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-700 text-ink-950">
          <Send className="size-4 -scale-x-100" />
        </span>
      </div>
    </div>
  );
}

export default function Assistant() {
  return (
    <Section id="assistant">
      <SectionHead
        index="۰۶"
        kicker="تجربه مشتری"
        title={
          <>
            دستیار هوشمند مشتری؛ <span className="gold-text">فروشنده‌ای که همیشه بیدار است</span>
          </>
        }
        desc="یک دستیار هوشمند در قلب فروشگاه طراحی شده که تجربه خرید حضوری با یک فروشنده حرفه‌ای را به فضای آنلاین می‌آورد:"
      />
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 space-y-4 lg:order-1">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.07 * i}>
              <div className="group glass flex items-start gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/25">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.08] text-gold-300 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-zinc-400">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative">
            <span className="pointer-events-none absolute -inset-8 rounded-full bg-gold-500/[0.07] blur-3xl" />
            <ChatMock />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
