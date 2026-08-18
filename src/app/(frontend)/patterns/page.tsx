import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'اطلس الگوهای مشترک',
  description: 'اطلس و طبقه‌بندی ساختاریافته الگوها و پدیدارهای گزارش‌شده در تجارب مرزی آگاهی.',
}

const PATTERNS_DATA = [
  {
    title: 'احساس وحدت، عشق نامشروط و آرامش عمیق',
    slug: 'deep-peace-and-unity',
    category: 'transcendental',
    categoryTitle: 'ادراکات متعالی',
    shortDefinition: 'احساس یکپارچگی کیهانی، رهایی از رنج، ادراک محبت نامشروط و آرامشی فراتر از ادراک روزمره.',
    image: '/images/patterns/pattern_peace_unity_1787053635840.jpg',
  },
  {
    title: 'مواجهه با نور یا حضور سرشار از شعور و محبت',
    slug: 'radiant-light-or-presence',
    category: 'transcendental',
    categoryTitle: 'ادراکات متعالی',
    shortDefinition: 'درک مواجهه با کانون درخشانی از آگاهی، سرشار از پذیرش کامل، گرما و راهنمایی اخلاقی.',
    image: '/images/patterns/pattern_radiant_presence_1787053654464.jpg',
  },
  {
    title: 'ملاقات با درگذشتگان و راهنمایان',
    slug: 'meeting-deceased-or-guides',
    category: 'transcendental',
    categoryTitle: 'ارتباطات عاطفی',
    shortDefinition: 'مشاهده و برقراری ارتباط با دوستان، بستگان از دست‌رفته یا موجودات همراه با حس استقبال و مهربانی.',
    image: '/images/patterns/pattern_loving_reunion_1787053743223.jpg',
  },
  {
    title: 'مرور همه‌جانبه زندگی با درک همدلانه',
    slug: 'life-review',
    category: 'coreElement',
    categoryTitle: 'عنصر ادراکی اصلی',
    shortDefinition: 'بازبینی سریع یا پانورامیک کنش‌های گذشته، همراه با تجربه احساسات مستقیم دیگران ناشی از رفتارهای خود.',
    image: '/images/patterns/pattern_life_review_1787053828375.jpg',
  },
  {
    title: 'گذر از تاریکی یا گذرگاه انتقالی',
    slug: 'tunnel-or-passage',
    category: 'spatiotemporal',
    categoryTitle: 'فضایی-زمانی',
    shortDefinition: 'احساس حرکت سریع از میان یک دالان، تونل یا تاریکی موقت به سوی روشنایی و گسترش آگاهی.',
    image: '/images/patterns/pattern_passage_transition_1787053948875.jpg',
  },
  {
    title: 'تغییر در ادراک زمان و بی‌زمانی',
    slug: 'altered-time-perception',
    category: 'spatiotemporal',
    categoryTitle: 'فضایی-زمانی',
    shortDefinition: 'ادراک توقف زمان خطی، احساس حضور هم‌زمان در گذشته، حال و آینده و تجربه جاودانگی لحظه حال.',
    image: '/images/patterns/pattern_timelessness_1787054002123.jpg',
  },
  {
    title: 'رسیدن به مرز یا نقطه بدون بازگشت',
    slug: 'border-or-point-of-no-return',
    category: 'coreElement',
    categoryTitle: 'عنصر ادراکی اصلی',
    shortDefinition: 'مواجهه با یک خط حائل نمادین یا آستانه نهایی، همراه با درک لزوم بازگشت برای تکمیل رسالت زندگی.',
    image: '/images/patterns/pattern_sacred_threshold_1787053967564.jpg',
  },
  {
    title: 'تجربه دشوار، بحران و دستیابی به تاب‌آوری درونی',
    slug: 'distressing-experience',
    category: 'aftereffects',
    categoryTitle: 'تاب‌آوری و تحول',
    shortDefinition: 'تجربه موقت ابهام، خلاء یا هراس که با عبور از آن و تسلیم به حضور آگاهی، به قدرت و رشد معنوی منجر می‌شود.',
    image: '/images/patterns/pattern_strength_resilience_1787053984381.jpg',
  },
  {
    title: 'احساس خروج از کالبد فیزیکی (OBE)',
    slug: 'out-of-body-sensation',
    category: 'coreElement',
    categoryTitle: 'عنصر ادراکی اصلی',
    shortDefinition: 'ادراک تفکیک نقطه دید آگاهی از جسم مادی و مشاهده محیط پیرامون از جایگاهی بیرونی و مسلط.',
    image: '/images/patterns/pattern_peace_unity_1787053635840.jpg',
  },
  {
    title: 'پیامدها و دگرگونی پایدار ارزش‌های زیستی',
    slug: 'aftereffects-and-values',
    category: 'aftereffects',
    categoryTitle: 'پیامدها و تحولات',
    shortDefinition: 'دگرگونی عمیق در سبک زندگی، افزایش نوع‌دوستی، شفقت اجتماعی و از بین رفتن کامل ترس از مرگ.',
    image: '/images/patterns/pattern_sacred_threshold_1787053967564.jpg',
  },
]

export default function PatternsAtlasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'اطلس الگوها' },
        ]}
      />

      <div className="space-y-3">
        <Badge variant="primary" className="text-xs">
          اطلس پژوهشی پدیدارهای آگاهی
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          اطلس الگوهای مشترک در تجارب مرزی آگاهی
        </h1>
        <p className="text-sm text-text-secondary leading-persian max-w-4xl">
          تعاریف پژوهشی، معیارهای ورود و خروج، و بازنمایی بصری مفاهیم عشق نامشروط، اعتماد عمیق و اقتدار درونی آگاهی
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PATTERNS_DATA.map((pattern) => (
          <Link key={pattern.slug} href={`/patterns/${pattern.slug}`} className="group">
            <Card className="h-full flex flex-col justify-between overflow-hidden group-hover:border-primary/60 transition-all">
              <div className="space-y-3">
                {/* Visual Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-surface border-b border-border/60">
                  <img
                    src={pattern.image}
                    alt={pattern.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" className="text-xs font-semibold">
                      {pattern.categoryTitle}
                    </Badge>
                    <BookOpen className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {pattern.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-persian line-clamp-3">
                    {pattern.shortDefinition}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-primary font-medium">
                  <span>مشاهده تعریف و تجارب مرتبط</span>
                  <span>←</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
