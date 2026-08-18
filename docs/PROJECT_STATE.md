# وضعیت جاری پروژه (Project State)

## فاز جاری: فاز ۰ و ۱ - ممیزی، تثبیت معماری و راه‌اندازی زیرساخت
- **تاریخ شروع:** ۱۴۰۵/۰۵/۲۸ (2026-08-18)
- **وضعیت کلیدی:**
  - محیط اجرایی بررسی شد (Node 20.18.0 و pnpm 9.15.9 تثبیت شدند).
  - مستندات معماری پایه (`docs/DOMAIN_DECISION.md`، `docs/DECISIONS.md`، `docs/COST_CONTROL.md`، `docs/SECURITY.md`) آماده شدند.
  - برنامه مرحله‌ای تفصیلی در `docs/IMPLEMENTATION_PLAN.md` ثبت شد.
  - طرح پیاده‌سازی جهت تایید ثبت گردید.

## جدول وضعیت فازها
| فاز | عنوان | وضعیت | توضیحات |
| :--- | :--- | :---: | :--- |
| فاز ۰ | ممیزی، مستندات پایه و تثبیت تصمیمات | ✅ انجام شد | محیط و مستندات تثبیت شدند |
| فاز ۱ | اسکلت‌بندی (Scaffold)، کانفیگ‌ها و سیستم طراحی | ⏳ در صف اجرا | Next.js + Payload + Tailwind + RTL Setup |
| فاز ۲ | مدل‌های داده، دسترسی‌ها، رمزنگاری و Seed | ⏳ در صف اجرا | Collections, Globals, AES-GCM PII, Seeds |
| فاز ۳ | صفحات عمومی پلتفرم و UI/UX راست‌چین | ⏳ در صف اجرا | Home, Experiences, Patterns, Research, Legal |
| فاز ۴ | ویزارد ثبت تجربه (Wizard) و جریان بررسی مدیریت | ⏳ در صف اجرا | 7-Step Wizard, Turnstile, Review Workflow |
| فاز ۵ | زیرسیستم رسانه و پلیر بومی Vidstack | ⏳ در صف اجرا | R2, Stream Adapter, Transcript Sync, Player |
| فاز ۶ | جست‌وجو، فیلترها، سئو فنی و Core Web Vitals | ⏳ در صف اجرا | SearchProvider, Persian Normalization, Schema.org |
| فاز ۷ | تست‌های جامع (Unit, Integration, E2E, A11y, Security) | ⏳ در صف اجرا | Vitest, Playwright, WCAG Checks |
| فاز ۸ | آماده‌سازی استقرار، کنترل هزینه و گزارش نهایی | ⏳ در صف اجرا | Deployment runbook, Backups, Final verification |

## موارد مسدودشده یا نیازمند Credential خارجی (Blocked / Pending Credentials)
- تمام سرویس‌های خارجی (Cloudflare Stream، R2، D1، Turnstile، Email) دارای آداپتورهای استاندارد و Mock شفاف محلی هستند و توسعه و تست بدون وابستگی به پرداخت یا اینترنت اختصاصی به طور کامل اجرا می‌شود.
