import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, Alert } from '@/components/ui/Alert'

export const metadata: Metadata = {
  title: 'شرایط و ضوابط استفاده',
  description: 'قوانین استفاده از محتوا، حقوق نشر و شرایط استفاده از پایگاه مرز آگاهی.',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'شرایط استفاده' },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">شرایط و ضوابط استفاده از پایگاه</h1>
        <p className="text-sm text-text-secondary leading-persian">
          مقررات بهره‌برداری از محتوای آرشیو، استناد علمی و حقوق مالکیت معنوی.
        </p>
      </div>

      <Alert variant="info" title="وضعیت حقوقی">
        نسخه شرایط استفاده v1.0 — استفاده از محتوای این پایگاه به منزله پذیرش این ضوابط است.
      </Alert>

      <div className="space-y-6 text-base text-text-primary leading-persian">
        <h3 className="text-lg font-bold text-text-primary">۱. حقوق مالکیت معنوی و بازنشر</h3>
        <p>
          روایات منتشرشده در این پایگاه با رضایت راویان گردآوری شده‌اند. هرگونه بازنشر مقالات و روایات با ذکر دقیق منبع
          و پیوند مستقیم به پایگاه «مرز آگاهی» برای اهداف غیرتجاری و پژوهشی مجاز است.
        </p>

        <h3 className="text-lg font-bold text-text-primary">۲. ممنوعیت سوءاستفاده تجاری و ساخت ادعاهای کذب</h3>
        <p>
          استفاده از روایت‌های شخصی راویان جهت ساخت محصولات تجاری، تبلیغاتی، فرقه‌گرایانه یا ادعاهای درمانی ممنوع است.
        </p>
      </div>
    </div>
  )
}
