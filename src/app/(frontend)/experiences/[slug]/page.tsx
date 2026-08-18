import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { DocumentationBadge } from '@/features/experiences/DocumentationBadge'
import { MediaPlayer } from '@/components/media/MediaPlayer'
import { TranscriptViewer } from '@/components/media/TranscriptViewer'
import { Calendar, User, MapPin, BookOpen, ShieldAlert, FileEdit, Clock } from 'lucide-react'
import { toPersianDigits } from '@/lib/text/persian'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `روایت تجربه: ${decodeURIComponent(slug).replace(/-/g, ' ')}`,
    description: 'مستندات و بررسی تحریریه درباره روایت تجربه مرزی آگاهی.',
  }
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  // Experience Mock / Local data
  const expData = {
    publicId: 'exp-uuid-sample',
    title: 'ادراک آرامش عمیق و مشاهده اتاق عمل از دید بالا در حین جراحی قلب',
    slug: decodedSlug,
    experienceTypeTitle: 'تجربه نزدیک به مرگ',
    anonymityLevel: 'alias',
    publicAlias: 'م. سهرابی',
    occurrenceYear: '۱۳۹۶',
    country: 'ایران',
    regionPublic: 'تهران',
    generalContext: 'در جریان عمل جراحی قلب باز و تحت بیهوشی عمومی.',
    documentationMethods: ['structuredInterview', 'witnessCompared'],
    documentationNote:
      'این روایت پس از انجام دو جلسه مصاحبه ساختاریافته با راوی و بررسی کلی برگه‌های خلاصه پرونده بستری مستندسازی شده است. ادعاهای راوی درباره مکالمات با کادر درمانی تطبیق داده شده است.',
    editorialSummary:
      'روایتی مستند از احساس ناگهانی انقطاع درد، ادراک نقطه دیدی معلق در سقف اتاق عمل و توصیف دقیق وسایل و مکالمات کادر جراحی.',
    narrativeParagraphs: [
      'در حین عمل جراحی، احساس کردم که تمام سنگینی و فشار قفسه سینه به یکباره ناپدید شد. در کمال شگفتی، متوجه شدم که از بالا و نزدیک به چراغ‌های جراحی در حال تماشای بدن خود و پزشکان هستم.',
      'پزشک جراح اصلی با صدای بلند به تکنسین بیهوشی دستور داد که میزان اکسیژن را تنظیم کند و نام یک داروی خاص را بیان کرد که من پیش از آن هرگز نشنیده بودم. بعداً این نام را از پزشکم جویا شدم و صحت آن تأیید شد.',
      'هیچ ترسی وجود نداشت؛ بلکه نوری بسیار آرامش‌بخش و سرشار از گرما در انتهای اتاق حس می‌شد. با یک تکانه شدید ناگهان خود را مجدداً در بستر و در حال تجربه درد حس کردم.',
    ],
    aftereffects:
      'پس از این رخداد، ترسم از مرگ به کلی برطرف شد و حس نوع‌دوستی و اولویت دادن به روابط انسانی در من بسیار عمیق‌تر گشت.',
    patterns: [
      { title: 'احساس خروج از بدن', slug: 'out-of-body-sensation' },
      { title: 'احساس آرامش و وحدت', slug: 'deep-peace-and-unity' },
      { title: 'ادراک‌های قابل مقایسه با گزارش شاهد', slug: 'witness-compared-perception' },
    ],
    scientificSources: [
      {
        title: 'AWAreness during REsuscitation (AWARE) Study',
        authors: 'Parnia, S. et al.',
        year: 2014,
        journal: 'Resuscitation',
        doi: '10.1016/j.resuscitation.2014.09.004',
        notes: 'بررسی بالینی ادراکات بصری و شنیداری در زمان ایست قلبی.',
      },
    ],
    media: {
      type: 'audio' as const,
      src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
      title: 'فایل صوتی مصاحبه ساختاریافته با راوی',
      downloadAllowed: false,
    },
    transcript: {
      humanReviewed: true,
      segments: [
        { startMs: 0, endMs: 4500, text: 'من کاملاً احساس کردم که از بالای چراغ‌ها اتاق عمل را می‌بینم.' },
        { startMs: 4600, endMs: 9000, text: 'پزشک بیهوشی دستگاه را دوباره تنظیم کرد و نام دارویی را گفت.' },
        { startMs: 9100, endMs: 14000, text: 'همه چیز بسیار آرام و بدون کوچکترین هراس یا اضطرابی بود.' },
      ],
    },
    publishedAt: '۱۴۰۴/۰۳/۱۵',
    lastUpdated: '۱۴۰۴/۰۵/۱۰',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'آرشیو تجربه‌ها', href: '/experiences' },
          { label: expData.title },
        ]}
      />

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" className="font-semibold text-xs">
            {expData.experienceTypeTitle}
          </Badge>
          <span className="text-xs text-text-secondary">روایت شخصی مستندشده</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary leading-tight">
          {expData.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary pt-2 border-b border-border/80 pb-4">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-primary" />
            <span>راوی: {expData.publicAlias}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>سال رخداد: {toPersianDigits(expData.occurrenceYear)}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>منطقه: {expData.regionPublic}، {expData.country}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>انتشار: {expData.publishedAt}</span>
          </span>
        </div>
      </div>

      {/* Editorial Summary Box */}
      <div className="p-5 rounded-2xl bg-surface border border-border/90 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-text-primary">خلاصه تحریریه</h3>
        <p className="text-sm text-text-secondary leading-persian">{expData.editorialSummary}</p>
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {expData.documentationMethods.map((m) => (
            <DocumentationBadge key={m} method={m} />
          ))}
        </div>
      </div>

      {/* Media Player and Transcript if present */}
      {expData.media && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-primary">مستندات صوتی / تصویری مصاحبه</h3>
          <MediaPlayer
            src={expData.media.src}
            type={expData.media.type}
            title={expData.media.title}
            downloadAllowed={expData.media.downloadAllowed}
          />
          {expData.transcript && (
            <TranscriptViewer
              segments={expData.transcript.segments}
              humanReviewed={expData.transcript.humanReviewed}
            />
          )}
        </div>
      )}

      {/* Main Narrative Text */}
      <article className="space-y-4">
        <h3 className="text-lg font-bold text-text-primary border-b border-border/60 pb-2">
          متن ویرایش‌شده روایت راوی
        </h3>
        <div className="space-y-4 text-base text-text-primary leading-persian">
          {expData.narrativeParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {/* Aftereffects */}
      {expData.aftereffects && (
        <Card className="p-6 space-y-2 bg-background/60">
          <h4 className="text-sm font-bold text-text-primary">پیامدها و دگرگونی‌های پس از تجربه</h4>
          <p className="text-sm text-text-secondary leading-persian">{expData.aftereffects}</p>
        </Card>
      )}

      {/* Patterns in this experience */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-text-primary">الگوهای شناسایی‌شده در این تجربه</h4>
        <div className="flex flex-wrap gap-2">
          {expData.patterns.map((p) => (
            <Link key={p.slug} href={`/patterns/${p.slug}`}>
              <Badge variant="neutral" className="text-xs py-1 px-3 hover:border-primary transition-colors">
                #{p.title}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Methodological limits note */}
      <Alert variant="info" title="حدود شواهد و روش‌شناسی مستندسازی">
        {expData.documentationNote}
      </Alert>

      {/* Scientific References */}
      {expData.scientificSources.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-bold text-text-primary">منابع و ارجاعات علمی مرتبط</h4>
          </div>
          <div className="space-y-2">
            {expData.scientificSources.map((source, idx) => (
              <div key={idx} className="p-3 bg-surface rounded-xl border border-border/80 text-xs space-y-1">
                <span className="font-semibold text-text-primary block">{source.title}</span>
                <span className="text-text-secondary block">
                  {source.authors} ({source.year}) — {source.journal}
                </span>
                {source.doi && (
                  <span className="font-mono text-primary block" dir="ltr">
                    DOI: {source.doi}
                  </span>
                )}
                {source.notes && <p className="text-text-secondary pt-1">{source.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report or Amendment request */}
      <div className="p-4 bg-surface rounded-xl border border-border flex items-center justify-between gap-4 text-xs text-text-secondary">
        <span>آیا نقصی در این مستند مشاهده می‌کنید یا نکته‌ای برای اصلاح دارید؟</span>
        <Link href="/contact">
          <span className="text-primary font-medium hover:underline flex items-center gap-1">
            <FileEdit className="w-3.5 h-3.5" />
            <span>گزارش اصلاحیه</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
