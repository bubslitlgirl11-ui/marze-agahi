# مرز آگاهی (Near Death & Borderline Consciousness Archive)

پلتفرم یکپارچه، ماژولار، امن و پژوهشی برای ثبت، بررسی، انتشار و تحلیل تجربه‌های نزدیک به مرگ (NDE) و پدیدارهای استثنایی آگاهی.

---

## 🌟 ویژگی‌های کلیدی
- **معماری Modular Monolith:** پیاده‌سازی‌شده با Next.js 15 App Router، Payload CMS 3 و TypeScript Strict.
- **زیرساخت ابری کم‌هزینه و پرسرعت:** طراحی‌شده برای Cloudflare Workers + D1 + R2 + Stream + Turnstile.
- **حفاظت کامل از حریم خصوصی (PII Protection):** رمزنگاری فیلدهای هویتی و تماس با Web Crypto AES-256-GCM، هش نمک‌دار آی‌پی و توکن‌های تک‌بارمصرف انصراف.
- **طراحی بومی فارسی و راست‌چین (RTL):** تایپوگرافی Vazirmatn، تضاد رنگی بهینه، رعایت استاندارد دسترس‌پذیری WCAG 2.2 AA و طراحی واکنش‌گرا (Mobile-First).
- **پلیر چندرسانه‌ای بومی:** پخش اختصاصی ویدئو و صوت مبتنی بر Vidstack بدون وابستگی به پلتفرم‌های خارجی (YouTube/Vimeo)، همراه با زیرنویس چندزبانه VTT و همگام‌سازی خط‌به‌خط رونوشت (Transcript Sync).
- **فرم ثبت ۷ مرحله‌ای کاربرپسند:** ویزارد گام‌به‌گام با اعتبارسنجی Zod، فیلد نامرئی Honeypot، تولید Case Code یکتا و رضایت‌نامه‌های شفاف مستقل.
- **سئو فنی و داده‌های ساختاریافته:** تولید خودکار Sitemap، Video Sitemap، RSS، تگ‌های استاندارد Schema.org و Open Graph.

---

## 🚀 راهنمای نصب و اجرای محلی

### ۱. نیازمندی‌ها
- Node.js 20+
- pnpm 9+

### ۲. نصب وابستگی‌ها
```bash
cmd /c "pnpm install"   # در ویندوز
pnpm install            # در لینوکس / مک
```

### ۳. آماده‌سازی متغیرهای محیطی
یک کپی از `.env.example` با نام `.env` ایجاد کنید:
```bash
cp .env.example .env
```

### ۴. اجرای آزمون‌های خودکار
```bash
cmd /c "pnpm test"              # تست‌های واحد و یکپارچگی (Vitest)
cmd /c "pnpm test:integration"  # تست‌های یکپارچگی جریان ثبت و امنیت
cmd /c "pnpm test:e2e"          # تست‌های سرتاسری (Playwright)
cmd /c "pnpm test:a11y"         # آزمون‌های دسترس‌پذیری WCAG (axe-core)
```

### ۵. راه‌اندازی سرور توسعه
```bash
cmd /c "pnpm dev"
```
سامانه در آدرس `http://localhost:3000` و پنل مدیریت در `http://localhost:3000/admin` در دسترس خواهد بود.

---

## 📚 مستندات فنی و راهنماها
- [طرح جامع پیاده‌سازی](docs/IMPLEMENTATION_PLAN.md)
- [ثبت تصمیمات معماری (ADR)](docs/DECISIONS.md)
- [مدل تهدیدات امنیتی و رمزنگاری](docs/SECURITY.md)
- [سیاست‌های کنترل هزینه](docs/COST_CONTROL.md)
- [بررسی ریسک و تصمیم دامنه](docs/DOMAIN_DECISION.md)
- [راهنمای استقرار و بازگردانی](docs/DEPLOYMENT.md)
- [وضعیت جاری پروژه](docs/PROJECT_STATE.md)
