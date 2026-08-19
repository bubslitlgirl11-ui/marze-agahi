import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, ExternalLink, ChevronDown, FileText, CheckCircle, BarChart2, ArrowLeft } from 'lucide-react'
import { RESEARCH_TOPICS } from '@/data/research'

export const metadata: Metadata = {
  title: 'پژوهش‌ها و مقالات علمی',
  description: 'مقالات علمی داوری‌شده، منابع معتبر بین‌المللی و ترجمه کامل و تفصیلی مطالعات تجارب مرزی آگاهی.',
}

export default function ResearchDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'پژوهش و مقالات علمی' },
        ]}
      />

      <div className="space-y-3">
        <Badge variant="primary" className="text-xs">
          پایگاه داده مقالات علمی و داوری‌شده
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          پژوهش‌های علمی و مقالات مرجع پدیدارهای مرزی آگاهی
        </h1>
        <p className="text-sm text-text-secondary leading-persian max-w-4xl">
          در این بخش، برای هر یک از موضوعات محوری مورد مطالعه در پایگاه، مقالات برجسته از معتبرترین ژورنال‌های بین‌المللی
          (همراه با شناسه‌های رسمی DOI، PMID، مشخصات نویسندگان، روش‌شناسی و <strong>ترجمه کامل و تحلیلی چندصفحه‌ای به زبان فارسی</strong>)
          گردآوری شده است. شما می‌توانید خلاصه سریع هر پژوهش را در همین صفحه مطالعه کرده یا برای مشاهده <strong>ترجمه کامل آکادمیک</strong> روی هر مقاله کلیک کنید.
        </p>
      </div>

      {/* Topics List */}
      <div className="space-y-12">
        {RESEARCH_TOPICS.map((topic) => (
          <div
            key={topic.topicId}
            id={topic.topicId}
            className="bg-surface rounded-2xl border border-border/90 overflow-hidden shadow-sm space-y-6 p-6 sm:p-8 transition-all hover:border-primary/40"
          >
            {/* Header with image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <Badge variant="primary" className="text-xs font-semibold">
                  {topic.category}
                </Badge>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary leading-snug">{topic.title}</h2>
                <p className="text-sm text-text-secondary leading-persian">{topic.description}</p>
              </div>

              <div className="lg:col-span-5 relative aspect-video rounded-xl overflow-hidden border border-border/60 bg-background">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Articles Section */}
            <div className="space-y-4 pt-4 border-t border-border/70">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>مقالات برگزیده داوری‌شده و ترجمه کامل (Peer-Reviewed Papers):</span>
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {topic.articles.map((art, idx) => (
                  <Card key={idx} className="p-6 space-y-4 bg-background/80 border border-border/80">
                    <div className="space-y-3">
                      {/* Persian and English Titles */}
                      <div>
                        <Link href={`/research/${art.slug}`} className="group">
                          <h4 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                            {art.titleFa}
                          </h4>
                        </Link>
                        <p className="text-xs text-text-secondary mt-1 font-sans" dir="ltr">
                          {art.title}
                        </p>
                      </div>

                      {/* Citation badges */}
                      <div className="text-xs text-text-secondary flex flex-wrap items-center gap-2" dir="ltr">
                        <span className="font-semibold text-text-primary">{art.authors} ({art.year})</span>
                        <span className="text-border">•</span>
                        <span className="italic text-primary">{art.journal}</span>
                        {art.doi && (
                          <span className="bg-surface px-2 py-0.5 rounded border border-border text-[11px] font-mono">
                            DOI: {art.doi}
                          </span>
                        )}
                        {art.pmid && (
                          <span className="bg-surface px-2 py-0.5 rounded border border-border text-[11px] font-mono">
                            PMID: {art.pmid}
                          </span>
                        )}
                      </div>

                      {/* Concise Summary */}
                      <div className="p-3.5 bg-surface/80 rounded-xl border border-border/60 text-xs sm:text-sm text-text-secondary leading-persian">
                        <strong className="text-text-primary block mb-1 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                          <span>چکیده و پیام کلیدی پژوهش:</span>
                        </strong>
                        <p>{art.summaryFa}</p>
                      </div>

                      {/* Expandable Preview */}
                      <details className="group border border-primary/20 rounded-xl bg-surface/40 overflow-hidden">
                        <summary className="p-3.5 cursor-pointer font-medium text-xs sm:text-sm text-primary flex items-center justify-between select-none hover:bg-primary/5 transition-colors">
                          <span className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>پیش‌نمایش بخش‌های ترجمه و روش‌شناسی</span>
                          </span>
                          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 text-primary" />
                        </summary>

                        <div className="p-5 pt-3 space-y-5 text-xs sm:text-sm text-text-secondary leading-persian border-t border-border/50 bg-background/50">
                          {/* Methodology */}
                          {art.methodologyFa && (
                            <div className="space-y-1.5 p-3 rounded-lg bg-surface/70 border border-border/40">
                              <strong className="text-text-primary font-bold flex items-center gap-1.5 text-xs text-primary">
                                <BarChart2 className="w-3.5 h-3.5" />
                                <span>روش‌شناسی و جامعه آماری:</span>
                              </strong>
                              <p className="text-xs leading-relaxed">{art.methodologyFa}</p>
                            </div>
                          )}

                          {/* Key Findings */}
                          {art.findingsFa && (
                            <div className="space-y-1.5 p-3 rounded-lg bg-surface/70 border border-border/40">
                              <strong className="text-text-primary font-bold flex items-center gap-1.5 text-xs text-secondary-600">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>یافته‌های آماری و نتایج بالینی:</span>
                              </strong>
                              <p className="text-xs leading-relaxed">{art.findingsFa}</p>
                            </div>
                          )}

                          {/* Section titles preview */}
                          <div className="space-y-2 pt-2">
                            <strong className="text-text-primary font-bold block text-xs">
                              سرفصل‌های ترجمه کامل مقاله:
                            </strong>
                            <ul className="space-y-1 text-xs text-text-secondary list-disc list-inside">
                              {art.sections.map((sec, sIdx) => (
                                <li key={sIdx}>{sec.heading}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* Action Links */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/40">
                      <Link
                        href={`/research/${art.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary text-xs font-semibold hover:text-white transition-colors"
                      >
                        <span>مطالعه متن کامل و ترجمه آکادمیک</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>

                      {art.doi && (
                        <a
                          href={`https://doi.org/${art.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors font-medium"
                          dir="ltr"
                        >
                          <span>Journal DOI</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
