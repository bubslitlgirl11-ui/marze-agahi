import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Alert'
import { EmptyState } from '@/components/ui/EmptyState'
import { ExperienceCard } from '@/features/experiences/ExperienceCard'
import { Search } from 'lucide-react'
import { normalizePersianText } from '@/lib/text/persian'

export const metadata: Metadata = {
  title: 'جست‌وجوی جامع',
  description: 'جست‌وجو در متن روایات، الگوهای پژوهشی و مقالات علمی پایگاه مرز آگاهی.',
}

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const q = typeof searchParams.q === 'string' ? searchParams.q : ''
  const normalizedQuery = normalizePersianText(q)

  const sampleResults = [
    {
      publicId: 'exp-1',
      title: 'ادراک آرامش عمیق و مشاهده اتاق عمل از دید بالا در حین جراحی قلب',
      slug: 'deep-peace-out-of-body-surgery',
      editorialSummary:
        'روایتی مستند از احساس ناگهانی انقطاع درد، ادراک نقطه دیدی معلق در سقف اتاق عمل و توصیف دقیق وسایل و مکالمات کادر جراحی.',
      experienceTypeTitle: 'تجربه نزدیک به مرگ',
      anonymityLevel: 'alias' as const,
      publicAlias: 'م. سهرابی',
      patterns: [{ title: 'احساس خروج از بدن', slug: 'out-of-body-sensation' }],
      documentationMethods: ['structuredInterview'],
      occurrenceYear: '۱۳۹۶',
      hasAudio: true,
      publishedAt: '۱۴۰۴/۰۳/۱۵',
    },
  ]

  const filtered = q
    ? sampleResults.filter(
        (r) =>
          normalizePersianText(r.title).includes(normalizedQuery) ||
          normalizePersianText(r.editorialSummary).includes(normalizedQuery)
      )
    : []

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'جست‌وجوی جامع' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">جست‌وجوی جامع در پایگاه</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          کاوش هوشمند با نرمال‌سازی حروف فارسی، جست‌وجو در روایات، رونوشت‌های بازبینی‌شده و مقالات
        </p>
      </div>

      {/* Search Input Box */}
      <form method="GET" action="/search" className="relative">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="عبارت یا پدیدار مورد نظر خود را بنویسید (مثال: خروج از بدن، نور، بیهوشی)..."
          className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
        <button
          type="submit"
          aria-label="جست‌وجو"
          className="absolute left-3 top-3.5 p-1 rounded-lg text-primary hover:bg-background"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Results */}
      {q ? (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-text-secondary">
            نتایج جست‌وجو برای عبارت «<span className="text-text-primary">{q}</span>»:
          </h2>

          {filtered.length === 0 ? (
            <EmptyState
              title="نتیجه‌ای برای این عبارت یافت نشد"
              description="پیشنهاد می‌شود از کلمات کلیدی عام‌تر استفاده کرده یا املا و نگارش واژه را بررسی فرمایید."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((item) => (
                <ExperienceCard key={item.publicId} {...item} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-text-secondary bg-surface rounded-xl border border-border/80">
          برای مشاهده نتایج، عبارت مورد نظر خود را در کادر بالا وارد کرده و کلید Enter را فشار دهید.
        </div>
      )}
    </div>
  )
}
