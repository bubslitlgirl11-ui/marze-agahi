# برنامه اجرایی تفصیلی پلتفرم مرز آگاهی (Master Implementation Plan)

## مشخصات کلیدی پروژه
- **عنوان سامانه:** مرز آگاهی (Borderline Consciousness Documentation Platform)
- **معماری:** Modular Monolith با Next.js 15 (App Router) + Payload CMS v3 + TypeScript Strict
- **محیط ابری هدف:** Cloudflare Workers + D1 + R2 + Stream + Turnstile
- **طراحی فرانت‌اند:** طراحی بومی فارسی، راست‌چین (RTL)، تایپوگرافی Vazirmatn، پشتیبانی کامل از WCAG 2.2 AA، واکنش‌گرا (Mobile-First)

---

## فازبندی تفصیلی اجرا

### فاز ۰: ممیزی، مستندات پایه و تثبیت تصمیمات [تکمیل شد]
- بررسی محیط سیستم و نسخه ابزارها (Node 20, pnpm 9.15.9).
- ایجاد اسناد راهبردی: `docs/DOMAIN_DECISION.md`, `docs/DECISIONS.md`, `docs/PROJECT_STATE.md`, `docs/COST_CONTROL.md`, `docs/SECURITY.md`.

### فاز ۱: اسکلت‌بندی (Scaffold) و پیکربندی زیرساخت پایه
- راه‌اندازی پروژه Next.js + Payload CMS با ساختار ماژولار مشخص‌شده در سند.
- تنظیم `tsconfig.json` با `strict: true`.
- تنظیم پیکربندی‌های محیطی: `.env.example` و `.dev.vars.example` و `wrangler.jsonc`.
- تنظیم Tailwind CSS با متغیرهای رنگی اختصاصی، پشتیبانی دارک/لایت، و کانفیگ کامل راست‌چین (RTL).
- ایجاد کتابخانه‌های پایه رمزنگاری Web Crypto (`lib/crypto/pii.ts`, `lib/crypto/hash.ts`).
- تعریف تایپ‌ها و Interfaceهای جلوگیری از قفل‌شدگی سرویس‌ها (`StorageProvider`, `VideoProvider`, `SearchProvider`, `EmailProvider`, `TranscriptionProvider`).

### فاز ۲: مدل داده جامع (Collections & Globals)، کنترل دسترسی و Seedها
- پیاده‌سازی Collections در Payload CMS:
  - `Users` با RBAC (نقش‌های superAdmin, editor, reviewer, researcher) و Capabilityهای حساس.
  - `ExperienceTypes` با مقادیر اولیه پژوهشی.
  - `Patterns` با تعاریف دقیق پژوهشی و معیارهای ورود/خروج.
  - `Experiences` (روایت عمومی ناشناس‌سازی‌شده، فیلدهای سئو، متدهای مستندسازی).
  - `Submissions` (پرونده خام و رمزنگاری‌شده، Case Code یکتا).
  - `ConsentRecords` (ثبت چندگانه و مستقل رضایت‌نامه‌ها).
  - `Reviews` (چک‌لیست ساختاریافته ارزیابی و ناشناس‌سازی).
  - `MediaAssets` (مدیریت رسانه با تفکیک عمومی/خصوصی/قرنطینه).
  - `Transcripts` (رونوشت‌های متنی ساختاریافته با زمان‌بندی کلمات/بخش‌ها).
  - `ScientificSources` (ارجاعات دانشگاهی معتبر با فرمت CSL-JSON).
  - `Articles` (مقالات تحلیلی، روش‌شناسی و آموزشی).
  - `Pages` (صفحات حقوقی و توضیحی قابل ویرایش).
  - `ContactMessages` (پیام‌های ارتباط با رمزنگاری داده تماس).
  - `AuditLogs` (ثبت رویدادهای حساس، نمایش PII، تغییرات دسترسی).
- پیاده‌سازی Globals:
  - `SiteSettings`, `Navigation`, `Footer`, `SubmissionSettings`, `ResearchSettings`.
- اسکریپت‌های Seed تفکیک‌شده:
  - `seed:prod`: فقط تاکسونومی‌ها و تنظیمات استاندارد.
  - `seed:dev`: داده‌های دمو با برچسب شفاف `DEMO`.

### فاز ۳: صفحات عمومی و سیستم رابط کاربری فارسی (UI/UX)
- ساخت قالب اصلی سایت با کامپوننت‌های پایه (Header چسبان، Footer کامل، دکمه‌ها، کارت‌ها، Badgeها، مدال‌ها، منوی موبایل کشویی).
- پیاده‌سازی مسیرهای اصلی:
  - صفحه اصلی (`/`) با Hero علمی و آرام، معرفی اطلس الگوها، تجربههای منتخب، روش‌شناسی، و پیام هشدار عدم جایگزینی با مشاوره درمانی.
  - آرشیو تجربه‌ها (`/experiences`) با فیلترهای چندگانه، جستجو، مرتب‌سازی و صفحه‌بندی پایدار.
  - جزئیات تجربه (`/experiences/[slug]`) با کارت مشخصات، روش مستندسازی، متن روایت، برچسب‌های الگو، پلیر رسانه و ارجاعات علمی.
  - اطلس الگوها (`/patterns` و `/patterns/[slug]`).
  - بخش پژوهش و مقالات (`/research` و `/research/[slug]`).
  - صفحات استاتیک و اخلاقی (`/about`, `/methodology`, `/ethics`, `/privacy`, `/terms`, `/contact`, `/withdraw`).

### فاز ۴: ویزارد ثبت تجربه (Wizard) و جریان بررسی و تبدیل مدیریت
- ویزارد ۷ مرحله‌ای واکنش‌گرا در فرانت‌اند با ذخیره‌سازی امن در حافظه.
- اعتبارسنجی سمت سرور با Zod، محافظت با Cloudflare Turnstile، فیلد نامرئی Honeypot و Rate-limiting بر اساس هش آی‌پی.
- تولید Case Code غیرقابل حدس و یکتا و Token پس‌گیری (Withdrawal Token) یک‌بارنمایش.
- اندپوینت امن برای ثبت پرونده و ثبت اتمیک ConsentRecord.
- اکشن و اینترفیس مدیریتی جهت بررسی، ناشناس‌سازی و تبدیل امن پرونده به Experience عمومی بدون افشای PII.

### فاز ۵: زیرساخت رسانه و پلیر بومی Vidstack
- پیاده‌سازی `StorageProvider` (R2 و Local Mock).
- پیاده‌سازی `VideoProvider` (Cloudflare Stream و Local Mock).
- پیاده‌سازی کامپوننت پلیر ویدئو و صوت مبتنی بر Vidstack بدون یوتیوب، با دکمه‌های کنترل فارسی، زیرنویس VTT، فصل‌بندی و همگام‌سازی خط‌به‌خط با Transcript.
- سیستم جستجو و ناوبری زمانی داخل رونوشت متنی (Transcript Viewer).

### فاز ۶: موتور جست‌وجو، سئو، کشف محتوا و Core Web Vitals
- پیاده‌سازی `D1SearchProvider` با نرمال‌سازی حروف فارسی (ی/ي، ک/ك، ارقام، نیم‌فاصله).
- تولید خودکار `sitemap.xml`, `video-sitemap.xml`, `rss.xml`, `robots.txt`.
- تزریق داده‌های ساختاریافته استاندارد Schema.org (`WebSite`, `Organization`, `Article`, `VideoObject`, `BreadcrumbList`).
- بهینه‌سازی بارگذاری تنبل رسانه‌ها، فونت‌های بهینه‌شده، عدم تغییر ناگهانی چیدمان (CLS=0) و پاسخ‌دهی زیر ۱۰۰ میلی‌ثانیه.

### فاز ۷: آزمون‌های خودکار و ممیزی جامع (Unit, Integration, E2E, A11y, Security)
- تست‌های واحد (Unit Tests) برای نرمال‌سازی فارسی، رمزنگاری AES-GCM، اعتبارسنجی فرم‌ها، تولید Case Code و سئو.
- تست‌های یکپارچگی (Integration Tests) برای کنترل دسترسی نقش‌ها، عدم دسترسی عموم به PII، جلوگیری از نشت Draftها و فرآیند پس‌گیری (Withdrawal).
- تست‌های سرتاسری (E2E با Playwright) برای کل چرخه ارسال کاربر و تایید/انتشار مدیر.
- آزمون‌های دسترس‌پذیری (A11y با axe-core) برای WCAG 2.2 AA.

### فاز ۸: مستندسازی نهایی، راهنمای استقرار و تحویل پروژه
- ایجاد `docs/DEPLOYMENT.md` (مراحل گام‌به‌گام برای Windows PowerShell، CMD و Linux).
- ایجاد `README.md` کامل و گزارش تفصیلی نهایی به همراه نتایج تست‌ها.
