import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Alert'
import { SubmissionWizard } from '@/features/submissions/SubmissionWizard'

export const metadata: Metadata = {
  title: 'ثبت تجربه جدید',
  description: 'فرم امن و چندمرحله‌ای ثبت روایت تجربه نزدیک به مرگ و رویدادهای مرزی آگاهی.',
}

export default function SubmitExperiencePage() {
  const experienceTypes = [
    { label: 'تجربه نزدیک به مرگ (Near-Death Experience)', value: 'near-death-experience' },
    { label: 'تجربه خروج از بدن (Out-of-Body Experience)', value: 'out-of-body-experience' },
    { label: 'تجربه مشترک مرگ (Shared-Death Experience)', value: 'shared-death-experience' },
    { label: 'مشاهده یا رؤیای بستر مرگ (Deathbed Vision)', value: 'deathbed-vision' },
    { label: 'تجربه عرفانی عمیق (Mystical Experience)', value: 'mystical-experience' },
    { label: 'تجربه تحول یا بیداری آگاهی (Awakening Experience)', value: 'awakening-experience' },
    { label: 'سایر تجربه‌های استثنایی آگاهی', value: 'exceptional-human-experience' },
  ]

  const patterns = [
    { label: 'احساس خروج از بدن', value: 'out-of-body-sensation' },
    { label: 'تغییر در ادراک زمان', value: 'altered-time-perception' },
    { label: 'گذر از تاریکی یا تونل', value: 'tunnel-or-passage' },
    { label: 'مواجهه با نور یا حضور درخشان', value: 'radiant-light-or-presence' },
    { label: 'ملاقات با درگذشتگان یا راهنمایان', value: 'meeting-deceased-or-guides' },
    { label: 'مرور همه‌جانبه زندگی', value: 'life-review' },
    { label: 'احساس وحدت، عشق و آرامش', value: 'deep-peace-and-unity' },
    { label: 'تجربه دشوار، ناخوشایند یا اضطراب‌آور', value: 'distressing-experience' },
    { label: 'رسیدن به مرز یا نقطه بدون بازگشت', value: 'border-or-point-of-no-return' },
    { label: 'پیامدها و تغییر نگرش به زندگی و مرگ', value: 'aftereffects-and-values' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'ثبت تجربه من' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">ثبت و مستندسازی تجربه</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          روایت شما با بالاترین استانداردهای اخلاقی، رمزنگاری اطلاعات حساس و احترام کامل به حریم خصوصی بررسی خواهد شد.
        </p>
      </div>

      <SubmissionWizard experienceTypes={experienceTypes} patterns={patterns} />
    </div>
  )
}
