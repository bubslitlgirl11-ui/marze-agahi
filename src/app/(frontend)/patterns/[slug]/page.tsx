import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ExperienceCard } from '@/features/experiences/ExperienceCard'
import { CheckCircle, XCircle } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `الگوی پژوهشی: ${decodeURIComponent(slug).replace(/-/g, ' ')}`,
    description: 'تعریف علمی، معیارهای شمول و تجارب مرتبط با الگو در آرشیو.',
  }
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const patternData = {
    title: 'احساس وحدت، عشق نامشروط و آرامش عمیق',
    slug: decodedSlug,
    category: 'transcendental',
    categoryTitle: 'ادراکات متعالی',
    image: '/images/patterns/pattern_peace_unity_1787053635840.jpg',
    definition:
      'وضعیتی که در آن شخص ادراک می‌کند تمامی موانع جدایی و کثرت از میان رفته و خود را در محاصره و پیوند با عشقی نامشروط، آرامشی ژرف و شعوری کیهانی بازمی‌یابد که هیچ ترس یا رنجی در آن راه ندارد.',
    inclusionCriteria: [
      'گزارش صریح احساس رهایی کامل از درد، رنج و اضطراب جسمانی.',
      'ادراک حضور پیونددهنده محبت تام و نامشروط نسبت به کل کائنات و موجودات.',
    ],
    exclusionCriteria: [
      'احساس آرامش موقت پس از مصرف مسکن‌های دارویی معمولی بدون درک یگانگی آگاهی.',
      'خواب‌آلودگی ناشی از خستگی شدید بدون مؤلفه‌های شناختی وحدت وجود.',
    ],
    sampleCountText: 'در ۱۵ مورد از مجموع ۱۸ تجربه ثبت‌شده در مجموعه منتشرشده این سایت',
    biasLimitationNote:
      'تعداد موارد فوق صرفاً بازتاب نمونه‌های ورودی و داوری‌شده در این پایگاه است و نباید به عنوان برآورد آماری از شیوع در کل جامعه انسانی تفسیر شود (سوگیری انتخاب خودخواسته).',
    relatedExperiences: [
      {
        publicId: 'exp-1',
        title: 'ادراک آرامش عمیق و مشاهده اتاق عمل از دید بالا در حین جراحی قلب',
        slug: 'deep-peace-out-of-body-surgery',
        editorialSummary:
          'روایتی مستند از احساس ناگهانی انقطاع درد، ادراک نقطه دیدی معلق در سقف اتاق عمل و توصیف دقیق وسایل و مکالمات کادر جراحی.',
        experienceTypeTitle: 'تجربه نزدیک به مرگ',
        anonymityLevel: 'alias' as const,
        publicAlias: 'م. سهرابی',
        patterns: [{ title: 'احساس وحدت و آرامش', slug: 'deep-peace-and-unity' }],
        documentationMethods: ['structuredInterview'],
        occurrenceYear: '۱۳۹۶',
        hasAudio: true,
        publishedAt: '۱۴۰۴/۰۳/۱۵',
      },
    ],
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'اطلس الگوها', href: '/patterns' },
          { label: patternData.title },
        ]}
      />

      {/* Main Banner Image */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-sm aspect-video max-h-[360px] w-full bg-surface">
        <img
          src={patternData.image}
          alt={patternData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title Header */}
      <div className="space-y-3">
        <Badge variant="primary" className="text-xs">
          {patternData.categoryTitle}
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">{patternData.title}</h1>
        <p className="text-sm text-text-secondary leading-persian max-w-3xl">{patternData.definition}</p>
      </div>

      {/* Inclusion & Exclusion Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-3 bg-surface">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <h3 className="text-sm font-bold text-text-primary">معیارهای شمول (Inclusion Criteria)</h3>
          </div>
          <ul className="space-y-2 text-xs text-text-secondary leading-relaxed">
            {patternData.inclusionCriteria.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-success font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 space-y-3 bg-surface">
          <div className="flex items-center gap-2 text-danger">
            <XCircle className="w-5 h-5" />
            <h3 className="text-sm font-bold text-text-primary">معیارهای عدم شمول (Exclusion Criteria)</h3>
          </div>
          <ul className="space-y-2 text-xs text-text-secondary leading-relaxed">
            {patternData.exclusionCriteria.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-danger font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Sample Stats & Selection Bias Disclaimer */}
      <Alert variant="info" title="فراوانی نمونه و محدودیت‌های روش‌شناختی">
        <strong className="block text-text-primary mb-1">{patternData.sampleCountText}</strong>
        <p className="text-xs text-text-secondary leading-relaxed">{patternData.biasLimitationNote}</p>
      </Alert>

      {/* Related Experiences */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text-primary">تجربه‌های مرتبط با این الگو در آرشیو</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patternData.relatedExperiences.map((exp) => (
            <ExperienceCard key={exp.publicId} {...exp} />
          ))}
        </div>
      </div>
    </div>
  )
}
