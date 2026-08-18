import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'درباره ما',
  description: 'معرفی اهداف، اصول و هیئت تحریریه پایگاه مستقل مرز آگاهی.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'درباره ما' },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">درباره پایگاه «مرز آگاهی»</h1>
        <p className="text-sm text-text-secondary leading-persian">
          آرشیو مستقل، پژوهشی و مستندسازی روایت‌های تجربه نزدیک به مرگ (Near-Death Experience) و پدیدارهای استثنایی آگاهی.
        </p>
      </div>

      <Alert variant="info" title="وضعیت سند">
        این متن معرفی اولیه است و با بازبینی‌های مستمر هیئت تحریریه به‌روزرسانی می‌گردد.
      </Alert>

      <div className="space-y-6 text-base text-text-primary leading-persian">
        <p>
          پایگاه «مرز آگاهی» با هدف پر کردن خلأ موجود در مستندسازی روش‌مند و علمی تجارب مرزی آگاهی در زبان فارسی تأسیس
          شده است. ما بستری امن، بدون تعصب و با تکیه بر اصول اخلاق پژوهشی فراهم ساخته‌ایم تا راویان بتوانند مشاهدات
          خود را بدون هراس از قضاوت یا انکار، به ثبت برسانند.
        </p>

        <h3 className="text-lg font-bold text-text-primary pt-2">اصول راهبردی ما</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
          <Card className="p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-sm font-bold text-text-primary">حریم خصوصی راوی</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              اطلاعات شخصی با بالاترین استانداردهای امنیتی رمزگذاری شده و انتشار نام منحصراً با رضایت صریح انجام می‌شود.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="w-5 h-5" />
              <h4 className="text-sm font-bold text-text-primary">بی‌طرفی علمی</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              ما هیچ ادعای اثبات یا ابطال جهان پس از مرگ تولید نمی‌کنیم؛ هدف ما طبقه‌بندی شفاف شواهد و الگوهای روایی است.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
