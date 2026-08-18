import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, ExternalLink } from 'lucide-react'
import { RESEARCH_TOPICS } from '@/data/research'

export const metadata: Metadata = {
  title: 'پژوهش‌ها و مقالات علمی',
  description: 'مقالات علمی داوری‌شده، منابع معتبر بین‌المللی و چکیده مطالعات تجارب مرزی آگاهی.',
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
          در این بخش، برای هر یک از موضوعات محوری مورد مطالعه در پایگاه، دو مقاله برجسته از معتبرترین ژورنال‌های بین‌المللی
          (همراه با شناسه‌های رسمی DOI، PMID، مشخصات نویسندگان و خلاصه تحلیلی به زبان فارسی) به همراه تصویرسازی‌های
          انتزاعی و آرام علمی گردآوری شده است.
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

            {/* Two Articles Section */}
            <div className="space-y-4 pt-4 border-t border-border/70">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>مقالات برگزیده داوری‌شده (Peer-Reviewed Papers):</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.articles.map((art, idx) => (
                  <Card key={idx} className="p-5 space-y-3 bg-background/60 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-text-primary leading-snug" dir="ltr">
                        {art.title}
                      </h4>

                      <div className="text-xs text-text-secondary space-y-1" dir="ltr">
                        <p className="font-medium text-text-primary">{art.authors} ({art.year})</p>
                        <p className="italic text-primary">{art.journal}</p>
                        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                          {art.doi && (
                            <span className="bg-surface px-2 py-0.5 rounded border border-border">
                              DOI: {art.doi}
                            </span>
                          )}
                          {art.pmid && (
                            <span className="bg-surface px-2 py-0.5 rounded border border-border">
                              PMID: {art.pmid}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-text-secondary leading-persian text-right border-t border-border/40">
                        <strong className="text-text-primary block mb-1">خلاصه مقاله:</strong>
                        <p>{art.summaryFa}</p>
                      </div>
                    </div>

                    {art.doi && (
                      <div className="pt-2 flex justify-end" dir="ltr">
                        <a
                          href={`https://doi.org/${art.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                        >
                          <span>مشاهده مقاله اصلی در ژورنال</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
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
