import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { CheckCircle2, Shield, Eye, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'روششناسی بررسی و مستندسازی',
  description: 'پروتکل‌های مصاحبه، روش‌های اعتبارسنجی و نحوه داوری شواهد در پایگاه مرز آگاهی.',
}

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'روششناسی بررسی' },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">روششناسی گردآوری و بررسی شواهد</h1>
        <p className="text-sm text-text-secondary leading-persian">
          شرح گام‌به‌گام نحوه دریافت روایت، ناشناس‌سازی، مصاحبه ساختاریافته و طبقه‌بندی بدون قضاوت ارزش‌گذارانه.
        </p>
      </div>

      <Alert variant="info" title="وضعیت بازبینی سند">
        این سند متدولوژی نسخه v1.0 است و زیر نظر شورای علمی پایگاه بازبینی می‌گردد.
      </Alert>

      <div className="space-y-6 text-base text-text-primary leading-persian">
        <h3 className="text-lg font-bold text-text-primary">۱. پروتکل دریافت و تریاژ اولیه</h3>
        <p>
          کلیه ارسالی‌ها از طریق فرم امن ویزارد ۷ مرحله‌ای دریافت شده و به صورت خودکار یک کد پرونده غیرقابل حدس دریافت
          می‌کنند. در مرحله تریاژ اولیه، بررسی می‌شود که آیا روایت حاوی جزئیات تجربی کافی هست یا خیر.
        </p>

        <h3 className="text-lg font-bold text-text-primary">۲. تفکیک روش‌های مستندسازی</h3>
        <p>
          برای هر تجربه منتشرشده، روش مستندسازی دقیقاً درج می‌شود تا مخاطب و پژوهشگر بدانند شواهد چگونه گردآوری شده‌اند:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose text-xs">
          <div className="p-3 bg-surface rounded-lg border border-border">
            <strong className="text-text-primary block mb-1">گزارش مستقیم راوی (Self-Report):</strong>
            روایت اولیه نگارش‌شده توسط خود تجربهگر بدون مصاحبه بعدی.
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <strong className="text-text-primary block mb-1">مصاحبه ساختاریافته (Structured Interview):</strong>
            انجام مصاحبه ضبط‌شده با سوالات استاندارد و خنثی توسط داور.
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <strong className="text-text-primary block mb-1">بررسی مدارک بالینی (Records Reviewed):</strong>
            تطبیق زمینه رخداد با اسناد بستری، بیهوشی یا ثبت‌های درمانی.
          </div>
          <div className="p-3 bg-surface rounded-lg border border-border">
            <strong className="text-text-primary block mb-1">تطبیق با گزارش شاهدان (Witness Corroborated):</strong>
            گفت‌وگو با کادر درمان یا همراهانی که در زمان رخداد در صحنه حضور داشته‌اند.
          </div>
        </div>

        <h3 className="text-lg font-bold text-text-primary">۳. عدم صدور احکام قطعی ماورایی</h3>
        <p>
          وظیفه این پایگاه صرفاً ثبت شواهد و طبقه‌بندی پدیدارشناختی است. ما از کاربرد عناوینی نظیر «تأیید حقانیت جهان پس
          از مرگ» یا «امتیاز واقعیت» به شدت پرهیز می‌کنیم.
        </p>
      </div>
    </div>
  )
}
