import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { DocumentationBadge } from '@/features/experiences/DocumentationBadge'
import { SynchronizedTranscriptPlayer } from '@/components/media/SynchronizedTranscriptPlayer'
import { MediaPlayer } from '@/components/media/MediaPlayer'
import { getExperienceBySlug } from '@/data/experiences'
import { Calendar, User, MapPin, BookOpen, FileEdit, Clock, Activity } from 'lucide-react'
import { toPersianDigits } from '@/lib/text/persian'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exp = getExperienceBySlug(slug)
  if (!exp) {
    return {
      title: 'تجربه یافت نشد | آرشیو تجارب',
    }
  }

  return {
    title: `${exp.title} | آرشیو تجارب مرز آگاهی`,
    description: exp.editorialSummary,
  }
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params
  const expData = getExperienceBySlug(slug)

  if (!expData) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'آرشیو تجربه‌ها', href: '/experiences' },
          { label: expData.publicAlias || expData.title },
        ]}
      />

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" className="font-semibold text-xs py-1 px-3">
            {expData.experienceTypeTitle}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {expData.anonymityLevel === 'named' ? 'راوی با نام واقعی و رضایت صریح' : 'روایت مستند'}
          </Badge>
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
            <span>سال رخداد: {toPersianDigits(expData.occurrenceYear)} {expData.ageAtOccurrence ? `(${expData.ageAtOccurrence})` : ''}</span>
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
      <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-border/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-text-primary">خلاصه تحریریه و چارچوب رخداد</h3>
        </div>
        <p className="text-sm text-text-secondary leading-persian">{expData.editorialSummary}</p>
        
        {expData.generalContext && (
          <div className="p-3 bg-background/70 rounded-xl border border-border/60 text-xs text-text-secondary">
            <strong className="text-text-primary">زمینه پزشکی و وقوع: </strong>
            {expData.generalContext}
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center gap-2">
          {expData.documentationMethods.map((m) => (
            <DocumentationBadge key={m} method={m} />
          ))}
        </div>
      </div>

      {/* Synchronized Audio Player & Interactive Transcript */}
      {expData.media && expData.transcript ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              مستندات صوتی و رونوشت همگام گفتار
            </h3>
            <span className="text-xs text-primary font-medium">پخش صوت با هایلایت لحظه‌ای متن</span>
          </div>

          <SynchronizedTranscriptPlayer
            media={expData.media}
            transcript={expData.transcript}
          />
        </div>
      ) : expData.media ? (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-text-primary">مستندات صوتی / تصویری مصاحبه</h3>
          <MediaPlayer
            src={expData.media.src}
            type={expData.media.type}
            title={expData.media.title}
            downloadAllowed={expData.media.downloadAllowed}
          />
        </div>
      ) : null}

      {/* Main Narrative Text */}
      <article className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-text-primary border-b border-border/60 pb-2">
          متن تفصیلی و ویرایش‌شده روایت راوی
        </h3>
        <div className="space-y-4 text-base text-text-primary leading-persian">
          {expData.narrativeParagraphs.map((para, i) => (
            <p key={i} className="text-justify sm:text-right bg-surface/40 p-4 rounded-xl border border-border/30">
              {para}
            </p>
          ))}
        </div>
      </article>

      {/* Aftereffects */}
      {expData.aftereffects && (
        <Card className="p-6 space-y-2 bg-background/80 border-primary/20">
          <h4 className="text-sm font-bold text-text-primary">پیامدها، تحولات روانی و تغییر نگرش پس از تجربه</h4>
          <p className="text-sm text-text-secondary leading-persian">{expData.aftereffects}</p>
        </Card>
      )}

      {/* Patterns in this experience */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-text-primary">الگوهای شناسایی‌شده در این تجربه</h4>
        <div className="flex flex-wrap gap-2">
          {expData.patterns.map((p) => (
            <Link key={p.slug} href={`/patterns/${p.slug}`}>
              <Badge variant="neutral" className="text-xs py-1 px-3 hover:border-primary transition-colors cursor-pointer">
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
            <h4 className="text-sm font-bold text-text-primary">منابع و ارجاعات پژوهشی مرتبط</h4>
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
        <span>آیا نکته یا شواهد تکمیلی درباره این مستند دارید؟</span>
        <Link href="/contact">
          <span className="text-primary font-medium hover:underline flex items-center gap-1">
            <FileEdit className="w-3.5 h-3.5" />
            <span>ارسال بازخورد و اصلاحیه</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
