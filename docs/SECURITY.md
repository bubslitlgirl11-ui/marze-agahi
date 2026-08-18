# سند امنیت و مدل تهدید (Security Architecture & Threat Model)

## ۱. مدل تهدید (Threat Model) و تمهیدات پیشگیرانه

| تهدید شناسایی‌شده | شدت | پیامد احتمالی | راهکار و کنترل پیاده‌سازی‌شده |
| :--- | :---: | :--- | :--- |
| **افشای هویت تجربهگر (PII Leakage)** | بحرانی | آسیب روحی و اجتماعی به راوی | رمزنگاری فیلد به فیلد با AES-256-GCM، ماسک کردن اطلاعات در ادمین، عدم لاگ اطلاعات تماس |
| **دسترسی غیرمجاز مدیر/بازبین (Privilege Escalation)** | بالا | دسترسی غیرمجاز به پرونده‌های خصوصی | مدل دسترسی مبتنی بر نقش (RBAC) و مبتنی بر قابلیت (Capability)، ثبت دقیق در `AuditLogs` |
| **حدس زدن Case Code یا شناسه پرونده (IDOR/Enumeration)** | بالا | مشاهده پرونده دیگران | تولید Case Code و Public ID های تصادفی غیرقابل حدس و یکتا، محافظت کامل endpointها |
| **تزریق اسکریپت مخرب (Stored/Reflected XSS)** | بالا | اجرای کد در مرورگر کاربران/مدیران | ضدعفونی سخت‌گیرانه ورودی‌های Rich Text و فرم‌ها، تنظیم سیاست سخت‌گیرانه CSP |
| **حملات اسپم و بات (Bot Submissions & DoS)** | متوسط | پر شدن دیتابیس با هرزنامه | اعتبارسنجی Cloudflare Turnstile، فیلد نامرئی Honeypot، محدودیت نرخ درخواست (Rate Limiting) بر اساس هش آی‌پی |
| **آپلود فایل‌های مخرب یا بدافزار (Malicious File Upload)** | بالا | آسیب به زیرساخت یا کاربران | اعتبارسنجی Magic Bytes/MIME، قرنطینه‌سازی پیش‌فرض، حذف کامل EXIF/GPS، عدم اجازه اجرای فایل در سرور |
| **دستکاری وضعیت مستندسازی (Documentation Method Tampering)** | متوسط | کاهش اعتبار علمی سامانه | کنترل دقیق دسترسی به فیلد `documentationMethods` و جلوگیری از نمایش رتبه ارزشی کاذب |

## ۲. سیاست‌های رمزنگاری داده‌های حساس
- **کلید رمزنگاری (`PII_ENCRYPTION_KEY`):** حداقل ۲۵۶ بیت با انتروپی بالا، خارج از سورس کد و خارج از دیتابیس.
- **تولید Nonce:** تولید ۱۲ بایت IV تصادفی منحصربه‌فرد برای هر عملیات رمزگذاری با Web Crypto API.
- **فرمت ذخیره‌سازی Versioned:** `v1:<hex-iv>:<hex-ciphertext>:<hex-tag>` جهت پشتیبانی از چرخش کلید (Key Rotation) در آینده.

## ۳. هدرهای امنیتی HTTP و سیاست‌های CSP
- `Content-Security-Policy`: تعریف دقیق مبادی مجاز استریم، تصاویر، فونت‌ها و اسکریپت‌ها.
- `Strict-Transport-Security` (HSTS) با `max-age=31536000; includeSubDomains; preload` در محیط عملیاتی.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` / `frame-ancestors 'self'`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
