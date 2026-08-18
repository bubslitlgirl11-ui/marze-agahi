# راهنمای جامع استقرار و عملیات (Deployment & Runbook)

این مستند مراحل استقرار، مهاجرت دیتابیس، تنظیمات منابع ابری و راهنمای بازگردانی (Rollback) پلتفرم «مرز آگاهی» را تشریح می‌کند.

---

## ۱. پیش‌نیازها و متغیرهای محیطی
اطمینان حاصل کنید متغیرهای محیطی زیر در فایل `.env` یا در تنظیمات Cloudflare Workers Secrets ثبت شده باشند:

```bash
NODE_ENV=production
SITE_URL=https://neadrdeath.ir
NEXT_PUBLIC_SITE_URL=https://neadrdeath.ir
PAYLOAD_SECRET=<کلید_۳۲_کاراکتری_تصادفی>
PII_ENCRYPTION_KEY=<کلید_۶۴_کاراکتری_هگز_۲۵۶_بیتی>
IP_HASH_SALT=<نمک_تصادفی_هش_آی‌پی>
```

---

## ۲. دستورهای اجرا در محیط محلی (Local Development)

### در ویندوز (PowerShell یا CMD):
```powershell
# ۱. نصب وابستگی‌ها
cmd /c "pnpm install"

# ۲. اجرای تست‌های واحد و یکپارچگی
cmd /c "pnpm test"

# ۳. اجرای سید اولیه تاکسونومی و تنظیمات
cmd /c "pnpm db:seed:prod"

# ۴. اجرای سرور توسعه محلی
cmd /c "pnpm dev"
```

### در لینوکس یا مک:
```bash
pnpm install
pnpm test
pnpm db:seed:prod
pnpm dev
```

---

## ۳. مراحل راه‌اندازی و استقرار در Cloudflare

### ۳.۱ ایجاد دیتابیس Cloudflare D1
```bash
# ایجاد دیتابیس
npx wrangler d1 create marzeagahi-d1-prod

# اعمال مایگریشن‌ها روی دیتابیس ابری
npx wrangler d1 migrations apply marzeagahi-d1-prod --remote
```

### ۳.۲ ایجاد باکت‌های Cloudflare R2
```bash
# باکت عمومی رسانه‌های تاییدشده
npx wrangler r2 bucket create marzeagahi-public

# باکت خصوصی اسناد حساس
npx wrangler r2 bucket create marzeagahi-private

# باکت قرنطینه فایل‌های ارسالی قبل از بررسی
npx wrangler r2 bucket create marzeagahi-quarantine
```

### ۳.۳ تنظیم سکرت‌های امنیتی در Workers
```bash
npx wrangler secret put PAYLOAD_SECRET
npx wrangler secret put PII_ENCRYPTION_KEY
npx wrangler secret put IP_HASH_SALT
npx wrangler secret put TURNSTILE_SECRET_KEY
```

### ۳.۴ استقرار نسخه پروداکشن (Production Deploy)
```bash
# ساخت بیلد نهایی
cmd /c "pnpm build"

# استقرار از طریق Wrangler
npx wrangler deploy
```

---

## ۴. راهنمای پشتیبان‌گیری و بازگردانی (Backup & Disaster Recovery)

### پشتیبان‌گیری از Cloudflare D1:
```bash
npx wrangler d1 export marzeagahi-d1-prod --remote --output=./backups/d1-backup-$(date +%Y%m%d).sql
```

### بازگردانی (Restore) در محیط اضطراری:
```bash
npx wrangler d1 execute marzeagahi-d1-prod --remote --file=./backups/d1-backup-TARGET.sql
```

---

## ۵. چک‌لیست قبل از فعال‌سازی نهایی پروداکشن
- [ ] تست‌های `pnpm test` و `pnpm typecheck` به طور ۱۰۰٪ پاس شده باشند.
- [ ] هیچ داده آزمایشی یا دمو با برچسب Published در دیتابیس عملیاتی نباشد.
- [ ] کلید `PII_ENCRYPTION_KEY` ۲۵۶ بیتی امن تولید و در سکرت‌های کلادفلر ثبت شده باشد.
- [ ] دامنه‌های امنیتی CSP و CORS بررسی و مسدودسازی دسترسی مستقیم به کالکشن‌های حساس تأیید شده باشد.
- [ ] هشدارهای مصرف و سقف ترافیک (Billing Alerts) روی داشبورد کلادفلر فعال شده باشند.
