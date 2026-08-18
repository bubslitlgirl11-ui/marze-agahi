import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, Alert } from '@/components/ui/Alert'

export const metadata: Metadata = {
  title: 'سیاست حفظ حریم خصوصی',
  description: 'سیاست‌های رمزنگاری داده‌ها، عدم ذخیره اطلاعات هویتی و مدیریت داده‌ها در مرز آگاهی.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'حریم خصوصی' },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">سیاست حفظ حریم خصوصی و امنیت داده‌ها</h1>
        <p className="text-sm text-text-secondary leading-persian">
          شرح تمهیدات رمزنگاری و حفاظت فنی از اطلاعات کاربران و راویان در پایگاه مرز آگاهی.
        </p>
      </div>

      <Alert variant="info" title="وضعیت حقوقی سند">
        نسخه سیاست حریم خصوصی v1.0-2026 — این سند بر اساس استاندارد رمزنگاری در سطح برنامه تدوین شده است.
      </Alert>

      <div className="space-y-6 text-base text-text-primary leading-persian">
        <h3 className="text-lg font-bold text-text-primary">۱. داده‌هایی که جمع‌آوری می‌شوند</h3>
        <p>
          ما تنها حداقل اطلاعات لازم جهت بررسی و ارزیابی روایت‌ها را دریافت می‌کنیم. اطلاعات تماس (ایمیل، تلفن و نام واقعی)
          اختیاری بوده و در صورت ارائه، به صورت رمزنگاری‌شده با الگوریتم ۲۵۶ بیتی AES-GCM در پایگاه داده ذخیره می‌شوند.
        </p>

        <h3 className="text-lg font-bold text-text-primary">۲. عدم ردیابی و تحلیل‌های آماری بدون کوکی</h3>
        <p>
          این پایگاه از کوکی‌های ردیابی تبلیغاتی یا ابزارهای پایش هویت استفاده نمی‌کند. تحلیل‌های آماری ترافیک (در صورت
          فعال‌سازی) به صورت کاملاً ناشناس و بدون ثبت آی‌پی کامل کاربران انجام می‌پذیرد.
        </p>

        <h3 className="text-lg font-bold text-text-primary">۳. عدم فروش یا واگذاری اطلاعات</h3>
        <p>
          اطلاعات پرونده‌ها و مشخصات تماس راویان تحت هیچ شرایطی به اشخاص ثالث، شرکت‌های تجاری یا پلتفرم‌های تبلیغاتی واگذار
          یا فروخته نخواهد شد.
        </p>
      </div>
    </div>
  )
}
