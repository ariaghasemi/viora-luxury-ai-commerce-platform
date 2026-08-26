\# Viora — Luxury AI Commerce Platform



\## راهنمای مدیریت، ویرایش و انتشار پروژه



این فایل راهنمای شخصی مدیریت پروژه Viora است تا برای تغییرات معمول نیازی به مراجعه به توسعه‌دهنده نباشد.



\---



\# 📌 معرفی پروژه



Viora یک پلتفرم Luxury AI Commerce است که برای ارائه یک تجربه مدرن، لوکس و مبتنی بر هوش مصنوعی طراحی شده است.



نسخه اصلی پروژه در GitHub نگهداری می‌شود و انتشار پروژه از طریق فرآیند CI/CD انجام می‌شود.



\---



\# 🚀 فرآیند کلی انتشار



```text

Computer

&#x20;  ↓

Edit Files

&#x20;  ↓

Git

&#x20;  ↓

GitHub

&#x20;  ↓

GitHub Actions

&#x20;  ↓

Cloudflare

&#x20;  ↓

Live Website

```



\---



\# 📁 مسیر پروژه روی کامپیوتر



```text

G:\\programer\\wordpress\\نمونه کار\\viora-luxury-ai-commerce-platform

```



برای ورود به پروژه در PowerShell:



```powershell

cd "G:\\programer\\wordpress\\نمونه کار\\viora-luxury-ai-commerce-platform"

```



\---



\# 🔍 بررسی وضعیت پروژه



برای دیدن تغییرات:



```powershell

git status

```



برای مشاهده آخرین Commitها:



```powershell

git log --oneline -10

```



\---



\# ⬇️ دریافت آخرین نسخه



قبل از شروع کار روی پروژه:



```powershell

git pull

```



این دستور آخرین تغییرات موجود در GitHub را دریافت می‌کند.



\---



\# 🖼️ تغییر عکس‌های سایت



\## روش پیشنهادی



1\. پروژه را در VS Code باز کن.

2\. فایل عکس موردنظر را پیدا کن.

3\. عکس جدید را جایگزین کن.

4\. بهتر است نام فایل قبلی را حفظ کنی.

5\. سایت را تست کن.

6\. تغییرات را Commit و Push کن.



مثلاً اگر فایل فعلی:



```text

hero.webp

```



است، عکس جدید را نیز با نام:



```text

hero.webp

```



جایگزین کن.



\### ⚠️ اگر نام فایل را تغییر بدهی



مثلاً:



```text

hero.webp

```



را تبدیل کنی به:



```text

hero-new.webp

```



باید مسیر فایل در کد پروژه نیز اصلاح شود.



\---



\# 🖼️ تغییر عکس مستقیماً از GitHub



برای تغییرات کوچک می‌توانی از خود GitHub استفاده کنی.



1\. وارد Repository پروژه شو.

2\. فایل موردنظر را پیدا کن.

3\. فایل را باز کن.

4\. گزینه Edit را بزن.

5\. تغییر را انجام بده.

6\. Commit changes را بزن.



برای تغییر فایل‌های تصویری و تغییرات بزرگ، استفاده از کامپیوتر و VS Code پیشنهاد می‌شود.



\---



\# ✏️ تغییر متن سایت



برای پیدا کردن متن موردنظر در VS Code:



```text

Ctrl + Shift + F

```



را بزن.



متن موردنظر را Search کن.



مثلاً:



```text

Luxury

```



بعد فایل مربوطه را باز کن و متن را تغییر بده.



\---



\# 🎨 تغییر رنگ‌های سایت



در VS Code جستجو کن:



```text

color

background

background-color

border-color

```



اگر پروژه از CSS Variables استفاده کرده باشد، ممکن است رنگ‌ها در بخشی مانند زیر قرار داشته باشند:



```css

:root {

&#x20;   --primary-color: ...;

&#x20;   --background-color: ...;

}

```



در این حالت بهتر است رنگ اصلی را همان‌جا تغییر بدهی.



\---



\# 🔤 تغییر فونت



برای پیدا کردن تنظیمات فونت:



```text

Ctrl + Shift + F

```



و این موارد را جستجو کن:



```text

font-family

@font-face

font-weight

```



\---



\# 🔗 تغییر لینک‌ها



برای پیدا کردن لینک‌ها:



```text

Ctrl + Shift + F

```



و جستجو کن:



```text

href

```



یا URL فعلی موردنظر را مستقیماً Search کن.



\---



\# 📞 تغییر اطلاعات تماس



برای تغییر:



\* شماره تلفن

\* ایمیل

\* Instagram

\* WhatsApp

\* آدرس

\* سایر اطلاعات تماس



از:



```text

Ctrl + Shift + F

```



استفاده کن و مقدار فعلی را جستجو کن.



\---



\# 🧩 تغییر صفحات و بخش‌های سایت



اگر پروژه React باشد، Componentها معمولاً در مسیرهایی شبیه این قرار دارند:



```text

src/

src/components/

src/pages/

```



قبل از حذف یک Component بررسی کن که در فایل دیگری Import نشده باشد.



\---



\# 💻 باز کردن پروژه در VS Code



از داخل PowerShell:



```powershell

cd "G:\\programer\\wordpress\\نمونه کار\\viora-luxury-ai-commerce-platform"

```



اگر VS Code نصب است:



```powershell

code .

```



\---



\# 🧪 اجرای پروژه برای تست



اگر پروژه Node.js باشد:



```powershell

npm install

```



برای اجرای نسخه Development:



```powershell

npm run dev

```



برای تست Build:



```powershell

npm run build

```



دستورهای دقیق پروژه را می‌توان از قسمت `scripts` در فایل:



```text

package.json

```



مشاهده کرد.



\---



\# 📤 ارسال تغییرات به GitHub



بعد از انجام تغییرات:



\### 1. بررسی تغییرات



```powershell

git status

```



\### 2. اضافه کردن فایل‌ها



```powershell

git add .

```



\### 3. ساخت Commit



```powershell

git commit -m "Update Viora website"

```



\### 4. ارسال به GitHub



```powershell

git push

```



\---



\# ☁️ انتشار روی Cloudflare



فرآیند معمول انتشار:



```text

git push

&#x20;  ↓

GitHub

&#x20;  ↓

GitHub Actions

&#x20;  ↓

Build

&#x20;  ↓

Cloudflare

&#x20;  ↓

Production

```



بعد از Push:



1\. وارد GitHub Repository شو.

2\. بخش Actions را باز کن.

3\. اجرای Workflow را بررسی کن.

4\. اگر Build موفق بود، Deployment را بررسی کن.

5\. سایت Live را باز کن.



\---



\# 🌐 تغییر مستقیم فایل از GitHub



برای تغییرات ساده مثل یک متن:



```text

GitHub

↓

Open Repository

↓

Open File

↓

Edit

↓

Change

↓

Commit changes

```



برای تغییرات بزرگ:



```text

GitHub

↓

git pull

↓

Edit on Computer

↓

Test

↓

git add .

↓

git commit

↓

git push

```



\---



\# 🔐 اطلاعات حساس



هرگز اطلاعات زیر را داخل GitHub قرار نده:



```text

API Keys

Passwords

Tokens

Private Keys

.env

Cloudflare API Tokens

Database Passwords

```



اطلاعات حساس باید در Environment Variables یا Secrets نگهداری شوند.



\---



\# ❌ اگر Build Error شد



ابتدا:



```powershell

git status

```



سپس وارد GitHub شو:



```text

Repository

↓

Actions

↓

Workflow

↓

Failed Run

↓

Logs

```



خطای اصلی معمولاً در قسمت پایانی Log مشخص می‌شود.



\---



\# ↩️ اگر تغییرات محلی خراب شد



اگر تغییرات را Commit نکرده‌ای و می‌خواهی آنها را حذف کنی:



```powershell

git restore .

```



⚠️ این دستور تغییرات ذخیره‌نشده را حذف می‌کند.



قبل از استفاده مطمئن شو چیزی را که نیاز داری از دست نمی‌دهی.



\---



\# 📜 مشاهده تاریخچه پروژه



برای مشاهده Commitها:



```powershell

git log --oneline

```



برای مشاهده ۱۰ Commit آخر:



```powershell

git log --oneline -10

```



برای مشاهده جزئیات یک Commit:



```powershell

git show COMMIT\_ID

```



\---



\# 🧠 قانون طلایی Viora



قبل از تغییرات مهم:



```powershell

git pull

```



بعد از تغییر:



```powershell

git status

git add .

git commit -m "Update Viora website"

git push

```



سپس:



```text

GitHub Actions

↓

Cloudflare

↓

Live Website

```



\---



\# 📝 تغییر سریع عکس



```text

Find Image

↓

Replace Image

↓

Keep Same Filename

↓

Test

↓

git add .

↓

git commit

↓

git push

```



\---



\# 📝 تغییر سریع متن



```text

Ctrl + Shift + F

↓

Search Text

↓

Edit

↓

Test

↓

git add .

↓

git commit

↓

git push

```



\---



\# 🎨 تغییر سریع رنگ



```text

Search CSS / Variables

↓

Change Color

↓

Test

↓

git add .

↓

git commit

↓

git push

```



\---



\# 🔗 تغییر سریع لینک



```text

Search URL

↓

Replace URL

↓

Test

↓

git add .

↓

git commit

↓

git push

```



\---



\# 📋 چک‌لیست استاندارد



\* \[ ] `git pull`

\* \[ ] تغییر فایل

\* \[ ] تست سایت

\* \[ ] `git status`

\* \[ ] `git add .`

\* \[ ] `git commit`

\* \[ ] `git push`

\* \[ ] بررسی GitHub Actions

\* \[ ] بررسی Cloudflare

\* \[ ] تست سایت Live



\---



\# ⚠️ قبل از حذف فایل



هیچ فایل مهمی را صرفاً به دلیل اینکه اسم آن را نمی‌شناسی حذف نکن.



قبل از حذف بررسی کن:



```text

آیا در فایل دیگری Import شده؟

آیا در CSS استفاده شده؟

آیا در یک Component استفاده شده؟

آیا در Build استفاده می‌شود؟

آیا در Configuration پروژه استفاده می‌شود؟

```



\---



\# 🆘 اگر سایت کاملاً خراب شد



اولین کار:



```powershell

git status

```



اگر تغییرات هنوز Commit نشده‌اند:



```powershell

git restore .

```



اگر تغییرات قبلاً Commit و Push شده‌اند، ابتدا تاریخچه Git را بررسی کن:



```powershell

git log --oneline -10

```



نسخه سالم قبلی را پیدا کن و قبل از هر `reset` یا `revert` مطمئن شو دقیقاً چه کاری انجام می‌دهی.



\---



\# 🚀 نسخه سریع روزمره



```powershell

cd "G:\\programer\\wordpress\\نمونه کار\\viora-luxury-ai-commerce-platform"



git pull



\# تغییرات خودت را انجام بده



git status

git add .

git commit -m "Update Viora website"

git push

```



بعد:



```text

GitHub Actions

↓

Cloudflare

↓

Live Website

```



\---



\# 📌 اطلاعات پروژه



\*\*Project:\*\* Viora Luxury AI Commerce Platform



\*\*Local Path:\*\*



```text

G:\\programer\\wordpress\\نمونه کار\\viora-luxury-ai-commerce-platform

```



\*\*Repository:\*\* GitHub



\*\*Deployment:\*\* Cloudflare



\---



\## نکته نهایی



این README یک راهنمای مدیریتی پروژه است. هر زمان ساختار فایل‌ها، روش Build، GitHub Actions یا Cloudflare Deployment تغییر کرد، این فایل نیز باید به‌روزرسانی شود.



