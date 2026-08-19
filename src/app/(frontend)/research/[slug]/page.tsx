import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, User, BookOpen, ExternalLink, ArrowRight, CheckCircle, BarChart2, FileText, Share2 } from 'lucide-react'
import { getScientificArticleBySlug, getAllScientificArticles } from '@/data/research'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllScientificArticles()
  return articles.map((art) => ({
    slug: art.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getScientificArticleBySlug(slug)
  if (!article) {
    return {
      title: 'مقاله پژوهشی یافت نشد',
    }
  }
  return {
    title: `${article.titleFa} | پژوهش‌های علمی مرز آگاهی`,
    description: article.summaryFa,
  }
}

export default async function ScientificArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getScientificArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'پژوهش و مقالات علمی', href: '/research' },
          { label: article.titleFa },
        ]}
      />

      {/* Back to Research List */}
      <div>
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست مقالات علمی</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="primary" className="text-xs">
            {article.topicCategory}
          </Badge>
          <Badge variant="neutral" className="text-xs">
            مقاله داوری‌شده بین‌المللی (Peer-Reviewed)
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight">
          {article.titleFa}
        </h1>

        <p className="text-sm sm:text-base text-text-secondary font-sans leading-relaxed" dir="ltr">
          {article.title}
        </p>

        {/* Citation Meta Bar */}
        <div className="p-4 bg-surface rounded-2xl border border-border/80 space-y-2 text-xs sm:text-sm text-text-secondary">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-text-primary font-semibold" dir="ltr">
              <User className="w-4 h-4 text-primary" />
              <span>{article.authors}</span>
            </span>
            <span className="flex items-center gap-1.5 text-text-secondary" dir="ltr">
              <Calendar className="w-4 h-4 text-primary" />
              <span>سال انتشار: {article.year}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-border/60" dir="ltr">
            <span className="italic text-primary font-medium">{article.journal}</span>
            {article.doi && (
              <span className="bg-background px-2.5 py-0.5 rounded border border-border text-xs font-mono">
                DOI: {article.doi}
              </span>
            )}
            {article.pmid && (
              <span className="bg-background px-2.5 py-0.5 rounded border border-border text-xs font-mono">
                PMID: {article.pmid}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Abstract & Key Takeaway */}
      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-3">
        <h2 className="text-sm font-bold text-primary flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>چکیده و پیام کلیدی پژوهش</span>
        </h2>
        <p className="text-sm sm:text-base text-text-primary leading-persian text-justify">
          {article.summaryFa}
        </p>
      </div>

      {/* Methodology & Cohort */}
      {article.methodologyFa && (
        <Card className="p-6 space-y-3 bg-surface border border-border">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            <span>روش‌شناسی، جامعه آماری و پروتکل‌های کارآزمایی</span>
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-persian text-justify">
            {article.methodologyFa}
          </p>
        </Card>
      )}

      {/* Statistical & Clinical Findings */}
      {article.findingsFa && (
        <Card className="p-6 space-y-3 bg-surface border border-border">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-secondary-600" />
            <span>یافته‌های آماری و نتایج بالینی پژوهش</span>
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-persian text-justify">
            {article.findingsFa}
          </p>
        </Card>
      )}

      {/* Full Multi-Section Persian Academic Translation */}
      <div className="space-y-8 pt-4">
        <div className="border-b border-border pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">
            ترجمه و بررسی تفصیلی و آکادمیک مقاله (متن کامل)
          </h2>
        </div>

        <div className="space-y-8">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3.5 bg-surface/40 p-6 rounded-2xl border border-border/70">
              <h3 className="text-base sm:text-lg font-bold text-text-primary text-primary">
                {sec.heading}
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-text-secondary leading-persian text-justify whitespace-pre-line">
                {sec.content}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* External Original Link */}
      {article.doi && (
        <div className="p-6 bg-surface rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-text-secondary">
            <span>برای مطالعه متن اصلی انگلیسی در پایگاه ناشر رسمی:</span>
          </div>
          <a
            href={`https://doi.org/${article.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span>مشاهده مقاله کامل در ژورنال بین‌المللی (DOI)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}
