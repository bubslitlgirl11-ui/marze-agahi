import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, User, BookOpen, Clock } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `مقاله: ${decodeURIComponent(slug).replace(/-/g, ' ')}`,
    description: 'مقاله پژوهشی و روش‌شناختی پایگاه مرز آگاهی.',
  }
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const article = {
    title: 'روششناسی گردآوری و اعتبارسنجی روایت‌های تجارب نزدیک به مرگ',
    slug: decodedSlug,
    category: 'methodology',
    author: 'هیئت پژوهشی پایگاه مرز آگاهی',
    reviewedBy: 'شورای اخلاق و متدولوژی',
    publishedAt: '۱۴۰۴/۰۲/۲۰',
    updatedAt: '۱۴۰۴/۰۴/۱۵',
    excerpt:
      'در این نوشتار، استانداردهای بین‌المللی مصاحبه با راویان تجارب مرزی آگاهی، تکنیک‌های تفکیک ادراکات شخصی از تأثیرات دارویی، و شیوه‌های حفظ محرمانگی بررسی شده‌اند.',
    paragraphs: [
      'مستندسازی رویدادهای استثنایی آگاهی نیازمند اتخاذ رویکردی محتاطانه، بی‌طرف و روش‌مند است که همزمان به حرمت روایت شخصی راوی احترام گذاشته و از غلو، نتیجه‌گیری‌های اثبات‌گرایانه زودرس و هیجان‌زدگی دوری گزیند.',
      'یکی از چالش‌های بنیادین در ارزیابی تجارب نزدیک به مرگ، تفکیک دقیق بین خاطره اولیه راوی و بازسازی‌های ذهنی متأخر است. به همین جهت، طراحی پروتکل‌های مصاحبه ساختاریافته با سوالات خنثی (Neutral Questions) که فاقد هرگونه القای محتوا باشند الزامی است.',
      'همچنین بررسی اسناد هم‌زمان بیمارستانی، ثبت‌های داروی بیهوشی، و اظهارات شاهدان عینی تنها به منظور شفاف‌سازی بستر رخداد انجام می‌شود، نه برای تولید یک رتبه ارزشی یا برچسب حقانیت.',
    ],
    references: [
      {
        citation: 'Greyson, B. (1983). The near-death experience scale: Construction, reliability, and validity. Journal of Nervous and Mental Disease, 171(6), 369-375.',
        doi: '10.1097/00005053-198306000-00007',
      },
      {
        citation: 'van Lommel, P., et al. (2001). Near-death experience in survivors of cardiac arrest: a prospective study in the Netherlands. The Lancet, 358(9298), 2039-2045.',
        doi: '10.1016/S0140-6736(01)07100-8',
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'پژوهش و مقالات', href: '/research' },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <div className="space-y-4">
        <Badge variant="primary" className="text-xs">
          مقاله روش‌شناسی و تحریریه
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary leading-tight">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary border-b border-border/80 pb-4">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>نویسنده: {article.author}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>انتشار: {article.publishedAt}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>بازبینی علمی: {article.reviewedBy}</span>
          </span>
        </div>
      </div>

      {/* Abstract */}
      <div className="p-5 bg-surface rounded-2xl border border-border space-y-2">
        <h3 className="text-xs font-bold text-primary">چکیده مقاله</h3>
        <p className="text-sm text-text-secondary leading-persian">{article.excerpt}</p>
      </div>

      {/* Article Body */}
      <article className="space-y-5 text-base text-text-primary leading-persian">
        {article.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </article>

      {/* References */}
      <div className="space-y-3 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="text-base font-bold text-text-primary">فهرست منابع و مراجع دانشگاهی</h3>
        </div>
        <div className="space-y-2">
          {article.references.map((ref, idx) => (
            <div key={idx} className="p-3 bg-surface rounded-lg border border-border text-xs space-y-1">
              <p className="text-text-primary font-mono" dir="ltr">
                [{idx + 1}] {ref.citation}
              </p>
              {ref.doi && (
                <span className="text-primary font-mono block" dir="ltr">
                  DOI: {ref.doi}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Alert variant="info" title="سلب مسئولیت پژوهشی">
        دیدگاه‌های ارائه‌شده در این مقاله با هدف گسترش افق‌های پژوهش روش‌مند نگارش شده و بازتاب‌دهنده نتایج مطالعات
        دانشگاهی است.
      </Alert>
    </div>
  )
}
