import React from 'react'
import type { Metadata } from 'next'
import { FilterBar } from '@/features/experiences/FilterBar'
import { ExperienceCard } from '@/features/experiences/ExperienceCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Breadcrumb } from '@/components/ui/Alert'
import { getAllExperiences } from '@/data/experiences'

export const metadata: Metadata = {
  title: 'آرشیو مستندسازی تجربه‌ها | مرز آگاهی',
  description: 'فهرست و آرشیو مستندسازی‌شده تجربه‌های نزدیک به مرگ و رویدادهای مرزی آگاهی همراه با فایل صوتی، متن همگام و بررسی شواهد.',
}

export default async function ExperiencesDirectoryPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const query = typeof searchParams.q === 'string' ? searchParams.q.trim() : ''
  const typeFilter = typeof searchParams.type === 'string' ? searchParams.type.trim() : ''
  const patternFilter = typeof searchParams.pattern === 'string' ? searchParams.pattern.trim() : ''

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

  const allExperiences = getAllExperiences()

  // Filter experiences based on query, type and pattern
  const filteredExperiences = allExperiences.filter((exp) => {
    if (query) {
      const matchTitle = exp.title.toLowerCase().includes(query.toLowerCase())
      const matchSummary = exp.editorialSummary.toLowerCase().includes(query.toLowerCase())
      const matchAlias = exp.publicAlias.toLowerCase().includes(query.toLowerCase())
      const matchNarrative = exp.narrativeParagraphs.some((p) => p.toLowerCase().includes(query.toLowerCase()))
      if (!matchTitle && !matchSummary && !matchAlias && !matchNarrative) return false
    }

    if (patternFilter) {
      const hasPattern = exp.patterns.some((p) => p.slug === patternFilter)
      if (!hasPattern) return false
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
            <ExperienceCard
              key={exp.publicId}
              publicId={exp.publicId}
              title={exp.title}
              slug={exp.slug}
              editorialSummary={exp.editorialSummary}
              experienceTypeTitle={exp.experienceTypeTitle}
              anonymityLevel={exp.anonymityLevel}
              publicAlias={exp.publicAlias}
              patterns={exp.patterns}
              documentationMethods={exp.documentationMethods}
              occurrenceYear={exp.occurrenceYear}
              country={exp.country}
              hasAudio={Boolean(exp.media && exp.media.type === 'audio')}
              hasVideo={Boolean(exp.media && exp.media.type === 'video')}
              publishedAt={exp.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}
