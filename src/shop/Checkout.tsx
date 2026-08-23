import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Banknote, Check, ChevronLeft, CircleDollarSign,
  CreditCard, Landmark, MapPin, PartyPopper, Percent, ShoppingBag, Truck, UserRound, Zap,
} from "lucide-react";
import { DISCOUNT_CODE, FREE_SHIPPING_LIMIT, SHIPPING_COST, faNum, faPrice, priceAfterDiscount } from "./data";
import { useShop } from "./ShopContext";
import { ProductImg } from "./ui";
import { cn } from "../utils/cn";

const STEPS = ["اطلاعات ارسال", "ارسال و پرداخت", "ثبت نهایی"];

interface Form {
  name: string; phone: string; city: string; address: string; postal: string;
}

export default function ShopCheckout() {
  const { cart, product, navigate, clearCart, toast } = useShop();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<"normal" | "express">("express");
  const [payMethod, setPayMethod] = useState<"online" | "cod">("online");
  const [code, setCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [form, setForm] = useState<Form>({ name: "", phone: "", city: "", address: "", postal: "" });
  const [errors, setErrors] = useState<Partial<Form>>({});

  const items = cart.map((i) => ({ ...i, p: product(i.id) }));
  const subtotal = items.reduce((s, i) => s + priceAfterDiscount(i.p.price, i.p.discount) * i.qty, 0);
  const discountAmount = subtotal - items.reduce((s, i) => s + i.p.price * i.qty, 0);
  const codeOff = codeApplied ? Math.round(subtotal * 0.1) : 0;
  const shipCost = subtotal - codeOff >= FREE_SHIPPING_LIMIT ? 0 : shipping === "express" ? SHIPPING_COST : 45000;
  const total = subtotal - codeOff + shipCost;

  const validate = () => {
    const e: Partial<Form> = {};
    if (form.name.trim().length < 3) e.name = "نام و نام خانوادگی را کامل وارد کنید";
    if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "شماره موبایل معتبر نیست";
    if (!form.city.trim()) e.city = "نام شهر را وارد کنید";
    if (form.address.trim().length < 10) e.address = "آدرس کامل‌تری وارد کنید";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const applyCode = () => {
    if (code.trim().toUpperCase() === DISCOUNT_CODE) {
      setCodeApplied(true);
      toast("کد تخفیف ۱۰٪ اعمال شد");
    } else {
      toast("کد تخفیف معتبر نیست");
    }
  };

  const fields: { key: keyof Form; label: string; placeholder: string; span?: boolean; type?: string }[] = useMemo(() => [
    { key: "name", label: "نام و نام خانوادگی گیرنده", placeholder: "مثلاً: آریا قاسمی" },
    { key: "phone", label: "شماره موبایل", placeholder: "۰۹۱۲×××××××", type: "tel" },
    { key: "city", label: "شهر", placeholder: "مثلاً: تهران" },
    { key: "postal", label: "کد پستی (اختیاری)", placeholder: "۱۰ رقم" },
    { key: "address", label: "آدرس کامل", placeholder: "خیابان، کوچه، پلاک، واحد", span: true },
  ], []);

  if (cart.length === 0 && step < 2) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingBag className="size-16 text-zinc-200" />
        <h1 className="text-xl font-black text-zinc-800">سبد خرید شما خالی است</h1>
        <p className="text-sm text-zinc-400">برای ادامه، ابتدا محصولی به سبد اضافه کنید</p>
        <button onClick={() => navigate({ name: "home" })} className="rounded-xl bg-amber-600 px-8 py-3 font-bold text-white hover:bg-amber-500">
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center md:py-24">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.1 }}
          className="grid size-24 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <PartyPopper className="size-11" />
        </motion.div>
        <h1 className="mt-6 text-2xl font-black text-zinc-900 md:text-3xl">سفارش شما با موفقیت ثبت شد!</h1>
        <p className="mt-3 max-w-md text-sm leading-8 text-zinc-500">
          جزئیات سفارش برای شما پیامک شد. مرسوله طی ۲۴ تا ۴۸ ساعت آینده به دست‌تان می‌رسد. از اعتماد شما به ویورا سپاسگزاریم.
        </p>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 px-6 py-4">
          <BadgeCheck className="size-5 text-emerald-600" />
          <span className="text-sm text-zinc-600">کد پیگیری سفارش:</span>
          <span className="font-latin text-lg font-bold tracking-widest text-zinc-900">{orderCode}</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => navigate({ name: "home" })} className="rounded-xl bg-amber-600 px-8 py-3 font-bold text-white hover:bg-amber-500">
            ادامه خرید
          </button>
          <button onClick={() => navigate({ name: "listing" })} className="rounded-xl border border-zinc-200 px-8 py-3 font-bold text-zinc-600 hover:border-amber-300 hover:text-amber-700">
            مشاهده محصولات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      {/* مسیر */}
      <div className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
        <button onClick={() => navigate({ name: "home" })} className="hover:text-amber-700">خانه</button>
        <ArrowRight className="size-3 -scale-x-100" />
        <span className="text-zinc-600">تکمیل خرید</span>
      </div>

      {/* استپر */}
      <div className="mb-10 flex items-center justify-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <span className={cn(
                "grid size-10 place-items-center rounded-full border-2 text-sm font-bold transition-colors",
                i < step ? "border-emerald-500 bg-emerald-500 text-white"
                : i === step ? "border-amber-500 bg-amber-500 text-white"
                : "border-zinc-200 bg-white text-zinc-400"
              )}>
                {i < step ? <Check className="size-5" /> : faNum(i + 1)}
              </span>
              <span className={cn("text-[11px] font-bold", i === step ? "text-amber-700" : i < step ? "text-emerald-600" : "text-zinc-400")}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <span className={cn("mx-3 mb-6 h-0.5 w-16 rounded-full md:w-28", i < step ? "bg-emerald-500" : "bg-zinc-200")} />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* محتوای مرحله */}
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <div className="rounded-3xl border border-zinc-100 bg-white p-6 md:p-8">
                <h2 className="mb-6 flex items-center gap-2.5 text-lg font-black text-zinc-900">
                  <MapPin className="size-5 text-amber-600" />
                  آدرس و اطلاعات گیرنده
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <div key={f.key} className={f.span ? "sm:col-span-2" : ""}>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-600">{f.label}</label>
                      <input
                        type={f.type ?? "text"}
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className={cn(
                          "w-full rounded-xl border bg-zinc-50 px-4 py-3 text-sm outline-none transition-colors focus:border-amber-400 focus:bg-white",
                          errors[f.key] ? "border-rose-300" : "border-zinc-200"
                        )}
                      />
                      {errors[f.key] && <p className="mt-1 text-[11px] text-rose-600">{errors[f.key]}</p>}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => validate() && setStep(1)}
                    className="flex items-center gap-2 rounded-xl bg-amber-600 px-8 py-3.5 font-bold text-white transition-colors hover:bg-amber-500"
                  >
                    ادامه
                    <ChevronLeft className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
              {/* روش ارسال */}
              <div className="rounded-3xl border border-zinc-100 bg-white p-6 md:p-8">
                <h2 className="mb-5 flex items-center gap-2.5 text-lg font-black text-zinc-900">
                  <Truck className="size-5 text-amber-600" />
                  روش ارسال
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "express" as const, icon: Zap, t: "ارسال اکسپرس", d: "تحویل ۲۴ ساعته در تهران", c: faPrice(SHIPPING_COST) },
                    { id: "normal" as const, icon: Truck, t: "پست پیشتاز", d: "تحویل ۲ تا ۴ روز کاری", c: faPrice(45000) },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setShipping(o.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border-2 p-4 text-right transition-colors",
                        shipping === o.id ? "border-amber-500 bg-amber-50/50" : "border-zinc-100 hover:border-zinc-200"
                      )}
                    >
                      <o.icon className={cn("mt-0.5 size-5", shipping === o.id ? "text-amber-600" : "text-zinc-400")} />
                      <span>
                        <span className="block text-sm font-bold text-zinc-800">{o.t}</span>
                        <span className="mt-0.5 block text-xs text-zinc-400">{o.d}</span>
                        <span className="mt-1 block text-xs font-bold text-amber-700">{o.c} تومان</span>
                      </span>
                    </button>
                  ))}
                </div>
                {subtotal - codeOff >= FREE_SHIPPING_LIMIT && (
                  <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
                    مبلغ سفارش شما به حد نصاب رسیده — هزینه ارسال رایگان شد!
                  </p>
                )}
              </div>

              {/* روش پرداخت */}
              <div className="rounded-3xl border border-zinc-100 bg-white p-6 md:p-8">
                <h2 className="mb-5 flex items-center gap-2.5 text-lg font-black text-zinc-900">
                  <CircleDollarSign className="size-5 text-amber-600" />
                  روش پرداخت
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "online" as const, icon: CreditCard, t: "پرداخت اینترنتی", d: "درگاه امن بانکی — همه کارت‌ها" },
                    { id: "cod" as const, icon: Banknote, t: "پرداخت در محل", d: "هنگام تحویل مرسوله" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setPayMethod(o.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border-2 p-4 text-right transition-colors",
                        payMethod === o.id ? "border-amber-500 bg-amber-50/50" : "border-zinc-100 hover:border-zinc-200"
                      )}
                    >
                      <o.icon className={cn("mt-0.5 size-5", payMethod === o.id ? "text-amber-600" : "text-zinc-400")} />
                      <span>
                        <span className="block text-sm font-bold text-zinc-800">{o.t}</span>
                        <span className="mt-0.5 block text-xs text-zinc-400">{o.d}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => setStep(0)} className="text-sm font-bold text-zinc-500 hover:text-zinc-700">
                  بازگشت به مرحله قبل
                </button>
                <button
                  onClick={() => {
                    setOrderCode(`VIO-${Math.floor(10000 + Math.random() * 90000)}`);
                    setStep(2);
                    clearCart();
                    window.scrollTo({ top: 0 });
                  }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 font-bold text-white transition-colors hover:bg-emerald-500"
                >
                  <Landmark className="size-4.5" />
                  ثبت سفارش و پرداخت {faPrice(total)} تومان
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* خلاصه فاکتور */}
        <aside className="h-fit rounded-3xl border border-zinc-100 bg-white p-6 lg:sticky lg:top-40">
          <h3 className="mb-5 flex items-center gap-2 font-black text-zinc-900">
            <ShoppingBag className="size-5 text-amber-600" />
            خلاصه سفارش
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500">{faNum(items.reduce((s, i) => s + i.qty, 0))} کالا</span>
          </h3>

          <div className="mb-5 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((i) => (
              <div key={i.id} className="relative shrink-0">
                <ProductImg p={i.p} className="size-16 rounded-xl border border-zinc-100" />
                <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">{faNum(i.qty)}</span>
              </div>
            ))}
          </div>

          {/* کد تخفیف */}
          <div className="mb-5">
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={codeApplied}
                placeholder="کد تخفیف (VIORA10)"
                className="font-latin w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm tracking-wider outline-none focus:border-amber-400 disabled:opacity-50"
              />
              <button
                onClick={applyCode}
                disabled={codeApplied}
                className="shrink-0 rounded-xl bg-zinc-900 px-4 text-sm font-bold text-white transition-colors hover:bg-zinc-700 disabled:opacity-40"
              >
                اعمال
              </button>
            </div>
            <p className="mt-1.5 flex items-center gap-1 text-[10px] text-zinc-400">
              <Percent className="size-3" />
              کد تخفیف دمو: VIORA10 — تخفیف ۱۰٪
            </p>
          </div>

          <dl className="space-y-3 border-t border-dashed border-zinc-100 pt-4 text-sm">
            <div className="flex justify-between text-zinc-600">
              <dt>قیمت کالاها</dt>
              <dd>{faPrice(subtotal - 0 + (discountAmount > 0 ? discountAmount : 0))} تومان</dd>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-rose-600">
                <dt>سود شما از تخفیف کالاها</dt>
                <dd>({faPrice(discountAmount)}) تومان</dd>
              </div>
            )}
            {codeApplied && (
              <div className="flex justify-between font-bold text-emerald-600">
                <dt>کد تخفیف VIORA10</dt>
                <dd>-{faPrice(codeOff)} تومان</dd>
              </div>
            )}
            <div className="flex justify-between text-zinc-600">
              <dt>هزینه ارسال</dt>
              <dd className={shipCost === 0 ? "font-bold text-emerald-600" : ""}>{shipCost === 0 ? "رایگان" : `${faPrice(shipCost)} تومان`}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-zinc-100 pt-3">
              <dt className="font-bold text-zinc-800">مبلغ قابل پرداخت</dt>
              <dd className="text-xl font-black text-zinc-900">{faPrice(total)} <span className="text-xs font-normal text-zinc-400">تومان</span></dd>
            </div>
          </dl>

          {step === 0 && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-zinc-50 p-3.5 text-[11px] leading-5 text-zinc-500">
              <UserRound className="mt-0.5 size-4 shrink-0 text-zinc-400" />
              سفارش به نام «<span className="font-bold text-zinc-700">{form.name || "گیرنده"}</span>» در شهر «<span className="font-bold text-zinc-700">{form.city || "—"}</span>» ارسال می‌شود.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
