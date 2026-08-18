import React from 'react'
import type { Metadata } from 'next'
import { FilterBar } from '@/features/experiences/FilterBar'
import { ExperienceCard } from '@/features/experiences/ExperienceCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Breadcrumb } from '@/components/ui/Alert'

export const metadata: Metadata = {
  title: 'آرشیو تجربه‌ها',
  description: 'فهرست و آرشیو مستندسازی‌شده تجربه‌های نزدیک به مرگ و رویدادهای مرزی آگاهی.',
}

export default async function ExperiencesDirectoryPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const query = typeof searchParams.q === 'string' ? searchParams.q : ''
  const typeFilter = typeof searchParams.type === 'string' ? searchParams.type : ''

  const experienceTypes = [
    { label: 'تجربه نزدیک به مرگ', value: 'near-death-experience' },
    { label: 'تجربه خروج از بدن', value: 'out-of-body-experience' },
    { label: 'تجربه مشترک مرگ', value: 'shared-death-experience' },
    { label: 'مشاهده بستر مرگ', value: 'deathbed-vision' },
    { label: 'تجربه عرفانی', value: 'mystical-experience' },
  ]

  const patterns = [
    { label: 'خروج از بدن', value: 'out-of-body-sensation' },
    { label: 'تغییر ادراک زمان', value: 'altered-time-perception' },
    { label: 'گذر از تونل / تاریکی', value: 'tunnel-or-passage' },
    { label: 'مواجهه با نور', value: 'radiant-light-or-presence' },
    { label: 'مرور زندگی', value: 'life-review' },
    { label: 'آرامش و وحدت', value: 'deep-peace-and-unity' },
  ]

  const experiences = [
    {
      publicId: 'exp-1',
      title: 'ادراک آرامش عمیق و مشاهده اتاق عمل از دید بالا در حین جراحی قلب',
      slug: 'deep-peace-out-of-body-surgery',
      editorialSummary:
        'روایتی مستند از احساس ناگهانی انقطاع درد، ادراک نقطه دیدی معلق در سقف اتاق عمل و توصیف دقیق وسایل و مکالمات کادر جراحی.',
      experienceTypeTitle: 'تجربه نزدیک به مرگ',
      anonymityLevel: 'alias' as const,
      publicAlias: 'م. سهرابی',
      patterns: [
        { title: 'احساس خروج از بدن', slug: 'out-of-body-sensation' },
        { title: 'احساس آرامش و وحدت', slug: 'deep-peace-and-unity' },
      ],
      documentationMethods: ['structuredInterview'],
      occurrenceYear: '۱۳۹۶',
      hasAudio: true,
      publishedAt: '۱۴۰۴/۰۳/۱۵',
    },
    {
      publicId: 'exp-2',
      title: 'گذر از گذرگاه تاریک، مواجهه با حضور درخشان و بازبینی پانورامیک وقایع',
      slug: 'tunnel-light-life-review',
      editorialSummary:
        'گزارش رویدادی در پی ایست قلبی کوتاه‌مدت که با تجربه حرکت در دالانی تاریک و درک حضور نوری پر از شعور و مرور ادراکات همراه بوده است.',
      experienceTypeTitle: 'تجربه نزدیک به مرگ',
      anonymityLevel: 'anonymous' as const,
      patterns: [
        { title: 'گذر از تاریکی یا تونل', slug: 'tunnel-or-passage' },
        { title: 'مواجهه با نور', slug: 'radiant-light-or-presence' },
        { title: 'مرور زندگی', slug: 'life-review' },
      ],
      documentationMethods: ['selfReport'],
      occurrenceYear: '۱۴۰۰',
      hasVideo: false,
      publishedAt: '۱۴۰۴/۰۶/۲۰',
    },
    {
      publicId: 'exp-3',
      title: 'ملاقات با بستگان درگذشته و مواجهه با مرز غیرقابل بازگشت در جریان بیهوشی',
      slug: 'meeting-relatives-border-point',
      editorialSummary:
        'مشاهده بستگان نزدیک درگذشته در فضایی نامتعارف و آگاهی از وجود مرزی شفاف که بازگشت از آن به تصمیم راوی وابسته بوده است.',
      experienceTypeTitle: 'تجربه نزدیک به مرگ',
      anonymityLevel: 'alias' as const,
      publicAlias: 'ف. رضوی',
      patterns: [
        { title: 'ملاقات با درگذشتگان', slug: 'meeting-deceased-or-guides' },
        { title: 'مرز بدون بازگشت', slug: 'border-or-point-of-no-return' },
      ],
      documentationMethods: ['recordsReviewed'],
      occurrenceYear: '۱۳۹۴',
      hasVideo: true,
      publishedAt: '۱۴۰۴/۰۸/۱۰',
    },
  ]

  // Filter experiences based on query if provided
  const filteredExperiences = experiences.filter((exp) => {
    if (query && !exp.title.includes(query) && !exp.editorialSummary.includes(query)) {
      return false
    }
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'آرشیو تجربه‌ها' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">آرشیو مستندسازی تجربه‌ها</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          کاوش در روایات ثبت‌شده با قابلیت فیلتر بر اساس نوع پدیدار، الگوها، قالب چندرسانه‌ای و روش مستندسازی
        </p>
      </div>

      <FilterBar experienceTypes={experienceTypes} patterns={patterns} />

      {filteredExperiences.length === 0 ? (
        <EmptyState
          title="تجربه‌ای با این مشخصات یافت نشد"
          description="لطفاً فیلترهای جست‌وجو را تغییر دهید یا واژه عمومی‌تری را جست‌وجو نمایید."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp.publicId} {...exp} />
          ))}
        </div>
      )}
    </div>
  )
}
