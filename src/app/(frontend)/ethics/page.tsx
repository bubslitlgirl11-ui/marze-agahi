import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { ShieldCheck, Lock, HeartHandshake, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'منشور اخلاقی و ناشناس‌سازی',
  description: 'منشور اخلاقی، تعهدات تحریریه و اصول سخت‌گیرانه ناشناس‌سازی در پایگاه مرز آگاهی.',
}

export default function EthicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'منشور اخلاقی' },
        ]}
      />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">منشور اخلاقی و سیاست ناشناس‌سازی</h1>
        <p className="text-sm text-text-secondary leading-persian">
          تعهدات اخلاقی اعضای هیئت تحریریه، داوران و پژوهشگران در برخورد با راویان و داده‌های حساس تجارب مرزی.
        </p>
      </div>

      <Alert variant="info" title="وضعیت بازبینی">
        نسخه اخلاق پژوهشی v1.0 — کلیه داوران و دست‌اندرکاران متعهد به رعایت مفاد این منشور هستند.
      </Alert>

      <div className="space-y-6 text-base text-text-primary leading-persian">
        <h3 className="text-lg font-bold text-text-primary">۱. اصل عدم آسیب (Non-Maleficence)</h3>
        <p>
          بازگویی تجارب عمیق مرزی ممکن است برای برخی از راویان با بار عاطفی شدید یا یادآوری تروماهای پزشکی همراه باشد.
          داوران موظفند با احترام کامل، بدون شتاب‌زدگی و با حفظ آرامش کامل با راویان رفتار کنند.
        </p>

        <h3 className="text-lg font-bold text-text-primary">۲. استاندارد سخت‌گیرانه ناشناس‌سازی (De-Identification)</h3>
        <p>
          پیش از هرگونه انتشار، کلیه اسامی افراد، نام بیمارستان‌ها، نام پزشکان، تاریخ‌های دقیق و جزئیات مکانی که ممکن است
          منجر به شناسایی هویت راوی یا اشخاص ثالث گردد، توسط داوران با برچسب‌های عمومی (مانند [بیمارستان دولتی در تهران] یا
          [پزشک جراح]) جایگزین می‌شوند.
        </p>

        <h3 className="text-lg font-bold text-text-primary">۳. حق لغو نامحدود رضایت</h3>
        <p>
          راوی در هر زمان از فرآیند (قبل، حین یا پس از انتشار) حق دارد با استفاده از توکن پس‌گیری اختصاصی، رضایت خود را
          لغو نماید و تحریریه بدون هیچ قید و شرطی موظف به خارج کردن پرونده از دسترسی عمومی است.
        </p>
      </div>
    </div>
  )
}
