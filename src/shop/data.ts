/* ---------------- ابزارها ---------------- */

export const faNum = (n: number | string): string =>
  new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(Number(n));

export const faPrice = (n: number): string => faNum(n);

export const priceAfterDiscount = (price: number, discount?: number): number =>
  discount ? Math.round((price * (100 - discount)) / 100) : price;

/* ---------------- تایپ‌ها ---------------- */

export type Category = "زنانه" | "مردانه" | "یونیسکس" | "شرقی و عود";

export interface Product {
  id: number;
  name: string;
  latin: string;
  brand: string;
  grid: 1 | 2 | 3;
  pos: "0% 0%" | "100% 0%" | "0% 100%" | "100% 100%";
  price: number;
  discount?: number;
  rating: number;
  votes: number;
  sold: number;
  stock: number;
  category: Category;
  family: string;
  volume: string;
  longevity: string;
  sillage: string;
  season: string;
  desc: string;
  amazing?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
}

/* ---------------- محصولات ---------------- */

export const PRODUCTS: Product[] = [
  {
    id: 1, name: "عود سلطنتی", latin: "Royal Oud", brand: "ویورا", grid: 1, pos: "0% 0%",
    price: 2850000, discount: 15, rating: 4.8, votes: 342, sold: 1240, stock: 8,
    category: "شرقی و عود", family: "شرقی، چوبی", volume: "۱۰۰ میلی‌لیتر", longevity: "۱۲ ساعت", sillage: "سنگین", season: "پاییز و زمستان",
    desc: "ترکیبی باشکوه از عود کامبوجی، زعفران و کهربا؛ عطری که از همان اسپری اول حضور شما را اعلام می‌کند. انتخاب اول خریداران برای هدیه و مراسم رسمی.",
    amazing: true, bestseller: true,
  },
  {
    id: 2, name: "شب یاس", latin: "Jasmine Night", brand: "ویورا", grid: 1, pos: "100% 0%",
    price: 1980000, rating: 4.6, votes: 218, sold: 860, stock: 14,
    category: "زنانه", family: "گلی، خنک", volume: "۱۰۰ میلی‌لیتر", longevity: "۸ ساعت", sillage: "متوسط", season: "بهار و تابستان",
    desc: "شکوفه‌های یاس شب‌بو با ردپایی از پرتقال و مشک سفید؛ انتخابی لطیف و تازه برای استفاده روزانه با ماندگاری قابل‌اعتماد.",
    bestseller: true,
  },
  {
    id: 3, name: "کهربای صحرا", latin: "Desert Amber", brand: "ویورا", grid: 1, pos: "0% 100%",
    price: 2450000, discount: 20, rating: 4.7, votes: 186, sold: 540, stock: 6,
    category: "شرقی و عود", family: "کهربایی، گرم", volume: "۱۰۰ میلی‌لیتر", longevity: "۱۰ ساعت", sillage: "سنگین", season: "پاییز و زمستان",
    desc: "گرمای کهربا و وانیل در آغوش چوب صندل؛ رایحه‌ای عمیق و خاطره‌ساز برای شب‌های سرد، الهام‌گرفته از کویر مرکزی ایران.",
    amazing: true,
  },
  {
    id: 4, name: "رز طلایی", latin: "Golden Rose", brand: "ویورا", grid: 1, pos: "100% 100%",
    price: 1750000, discount: 10, rating: 4.5, votes: 412, sold: 1980, stock: 21,
    category: "زنانه", family: "گلی، رز", volume: "۱۰۰ میلی‌لیتر", longevity: "۷ ساعت", sillage: "متوسط", season: "چهار فصل",
    desc: "رز محمدی قمصر با ترکیب مدرن لیچی و ماکادمیا؛ کلاسیک اما به‌روز. پرفروش‌ترین عطر زنانه فروشگاه در سه فصل متوالی.",
    amazing: true, bestseller: true,
  },
  {
    id: 5, name: "زمرد شب", latin: "Night Emerald", brand: "ویورا", grid: 2, pos: "0% 0%",
    price: 2200000, rating: 4.4, votes: 96, sold: 310, stock: 11,
    category: "مردانه", family: "خنک، دریایی", volume: "۱۰۰ میلی‌لیتر", longevity: "۹ ساعت", sillage: "متوسط", season: "بهار و تابستان",
    desc: "نُت‌های دریایی، گریپ‌فروت و خس‌خس؛ عطری خنک و انرژی‌بخش برای روزهای کاری و مهمانی‌های تابستانی.",
    isNew: true,
  },
  {
    id: 6, name: "یاقوت سرخ", latin: "Ruby Rouge", brand: "ویورا", grid: 2, pos: "100% 0%",
    price: 2690000, discount: 25, rating: 4.9, votes: 154, sold: 420, stock: 4,
    category: "زنانه", family: "میوه‌ای، گورماند", volume: "۱۰۰ میلی‌لیتر", longevity: "۱۱ ساعت", sillage: "سنگین", season: "پاییز و زمستان",
    desc: "آلبالوی سیاه، گل صدتومانی و دانه تونکا؛ ترکیبی جذاب و رازآلود که در هر محفل نظرها را به شما جلب می‌کند.",
    amazing: true,
  },
  {
    id: 7, name: "مروارید سفید", latin: "White Pearl", brand: "ویورا", grid: 2, pos: "0% 100%",
    price: 1890000, rating: 4.3, votes: 78, sold: 265, stock: 16,
    category: "زنانه", family: "پودری، پاک", volume: "۱۰۰ میلی‌لیتر", longevity: "۶ ساعت", sillage: "ملایم", season: "بهار و تابستان",
    desc: "سنبل، زنبق و مشک پودری؛ رایحه‌ای پاک و ظریف مثل تن‌کردن یک لباس سفید تازه. مناسب برای فضاهای رسمی و محیط کار.",
    isNew: true,
  },
  {
    id: 8, name: "عقیق سیاه", latin: "Black Agate", brand: "ویورا", grid: 2, pos: "100% 100%",
    price: 2980000, discount: 12, rating: 4.7, votes: 203, sold: 610, stock: 9,
    category: "مردانه", family: "چوبی، چرمی", volume: "۱۰۰ میلی‌لیتر", longevity: "۱۲ ساعت", sillage: "سنگین", season: "چهار فصل",
    desc: "چرم، سدر و فلفل سیاه؛ عطری قدرتمند و مردانه با شخصیتی جدی. انتخاب مدیران و کسانی که می‌خواهند بدون حرف زدن دیده شوند.",
    bestseller: true, amazing: true,
  },
  {
    id: 9, name: "عنبر سلطنتی", latin: "Imperial Amber", brand: "ویورا", grid: 3, pos: "0% 0%",
    price: 3200000, rating: 4.8, votes: 167, sold: 390, stock: 5,
    category: "شرقی و عود", family: "عنبری، لوکس", volume: "۱۰۰ میلی‌لیتر", longevity: "۱۴ ساعت", sillage: "خیلی سنگین", season: "پاییز و زمستان",
    desc: "پرچم‌دار مجموعه ویورا؛ عنبر خاکستری، عود هندی و وانیل ماداگاسکاری در شیشه‌ای کریستالی. محدود و شماره‌دار.",
    bestseller: true, isNew: true,
  },
  {
    id: 10, name: "نیلوفر آبی", latin: "Blue Lotus", brand: "ویورا", grid: 3, pos: "100% 0%",
    price: 1650000, discount: 30, rating: 4.2, votes: 289, sold: 1120, stock: 25,
    category: "یونیسکس", family: "آبی، خنک", volume: "۱۰۰ میلی‌لیتر", longevity: "۶ ساعت", sillage: "ملایم", season: "بهار و تابستان",
    desc: "نیلوفر آبی، خیار و چای سفید؛ تازه‌ترین عطر فروشگاه با قیمتی که باور نمی‌کنید. پیشنهاد محدود تابستانه.",
    amazing: true,
  },
  {
    id: 11, name: "گلاب کویر", latin: "Desert Rosewater", brand: "ویورا", grid: 3, pos: "0% 100%",
    price: 1420000, rating: 4.4, votes: 132, sold: 480, stock: 18,
    category: "یونیسکس", family: "گلی، مینیمال", volume: "۱۰۰ میلی‌لیتر", longevity: "۵ ساعت", sillage: "ملایم", season: "چهار فصل",
    desc: "بازآفرینی مدرن گلاب کاشان با نُت سبز و لیموترش؛ ساده، اصیل و متفاوت از هر عطر گلی که امتحان کرده‌اید.",
  },
  {
    id: 12, name: "مشک افسانه", latin: "Musk Legend", brand: "ویورا", grid: 3, pos: "100% 100%",
    price: 2560000, discount: 18, rating: 4.6, votes: 224, sold: 705, stock: 12,
    category: "مردانه", family: "مشکی، ادویه‌ای", volume: "۱۰۰ میلی‌لیتر", longevity: "۱۰ ساعت", sillage: "متوسط", season: "چهار فصل",
    desc: "مشک سیاه، هل و جوز هندی؛ تعادلی هوشمندانه میان ادویه و نرمی که هم روزانه کاربرد دارد و هم مهمانی.",
    amazing: true, bestseller: true,
  },
];

export const CATEGORIES: { name: Category; desc: string; pos: string; grid: 1 | 2 | 3 }[] = [
  { name: "زنانه", desc: "رایحه‌های گلی و لطیف", pos: "100% 100%", grid: 1 },
  { name: "مردانه", desc: "چوبی، چرمی و قدرتمند", pos: "100% 100%", grid: 2 },
  { name: "یونیسکس", desc: "برای هر سلیقه‌ای", pos: "100% 0%", grid: 3 },
  { name: "شرقی و عود", desc: "لوکس و خاورمیانه‌ای", pos: "0% 0%", grid: 1 },
];

/* ---------------- دیدگاه‌ها ---------------- */

export interface Comment {
  name: string;
  date: string;
  text: string;
  rating: number;
  buyer: boolean;
}

const COMMENT_POOL: Comment[] = [
  { name: "نگار محمدی", date: "۱۴ بهمن ۱۴۰۴", text: "ماندگاریش واقعاً حرف نداره، صبح زدم شب هنوز رایحه‌ش روی مانتوم بود. بسته‌بندی هم خیلی شیک بود، خودش مثل یه کادوی آماده بود.", rating: 5, buyer: true },
  { name: "امیر رضایی", date: "۲ بهمن ۱۴۰۴", text: "برای دید و بازدید عید گرفتم، همه پرسیدن چه عطریه. پراکندگی رایحه عالیه بدون اینکه آزاردهنده باشه.", rating: 5, buyer: true },
  { name: "سارا کریمی", date: "۲۸ دی ۱۴۰۴", text: "با توجه به قیمتش انتظار بیشتری از حجم بطری داشتم ولی کیفیت رایحه واقعاً در حد برندهای خارجیه. راضیم.", rating: 4, buyer: true },
  { name: "محمد حسینی", date: "۱۵ دی ۱۴۰۴", text: "ارسال سریع بود و اصالت کالا رو هم با کد روی جعبه چک کردم. تجربه خرید خوبی بود، حتماً بازم خرید می‌کنم.", rating: 5, buyer: true },
  { name: "الهام ناصری", date: "۸ دی ۱۴۰۴", text: "رایحه‌ش گرم و کلاسه، برای مهمونی‌های رسمی عالیه. فقط اسپری‌ش یه کم زیاد پخش می‌کنه، مراقب باشید.", rating: 4, buyer: false },
  { name: "رضا احمدی", date: "۲۹ آذر ۱۴۰۴", text: "سومین خریدم از ویوراست. این مدل هم مثل قبلی‌ها اصل و باکیفیت بود. پیشنهاد می‌کنم اول تستر بزنید بعد بطری کامل بردارید.", rating: 5, buyer: true },
];

export const commentsFor = (id: number): Comment[] =>
  [0, 1, 2, 3].map((i) => COMMENT_POOL[(id * 2 + i) % COMMENT_POOL.length]);

/* ---------------- بنرها ---------------- */

export const SLIDES = [
  {
    img: "/images/gallery-campaign.jpg",
    kicker: "کالکشن زمستانه ۱۴۰۴",
    title: "رایحه‌ای که امضای شماست",
    desc: "تا ۳۰٪ تخفیف روی پرفروش‌ترین عطرهای شرقی و عود — فقط تا پایان هفته",
    cta: "مشاهده پیشنهادها",
  },
  {
    img: "/images/gallery-lifestyle.jpg",
    kicker: "جدیدترین‌ها",
    title: "کالکشن نیلوفر آبی رسید",
    desc: "تازه‌ترین عطر یونیسکس ویورا با الهام از گل‌های آبی نیل",
    cta: "خرید کالکشن جدید",
  },
  {
    img: "/images/gallery-product-after.jpg",
    kicker: "سری محدود",
    title: "عنبر سلطنتی — نسخه شماره‌دار",
    desc: "فقط ۵۰۰ بطری کریستالی در سراسر کشور؛ با گواهی اصالت دیجیتال",
    cta: "مشاهده محصول",
  },
];

export const GUARANTEES = [
  { title: "ضمانت اصالت کالا", desc: "با کد رهگیری دیجیتال" },
  { title: "ارسال اکسپرس", desc: "تحویل ۲۴ ساعته در تهران" },
  { title: "۷ روز مهلت بازگشت", desc: "بدون قید و شرط" },
  { title: "پرداخت امن", desc: "درگاه رسمی بانکی" },
];

export const DISCOUNT_CODE = "VIORA10";
export const FREE_SHIPPING_LIMIT = 2000000;
export const SHIPPING_COST = 65000;
