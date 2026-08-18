import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, Compass } from 'lucide-react'
import { INITIAL_PATTERNS } from '@/../scripts/seed-prod'

export const metadata: Metadata = {
  title: 'اطلس الگوهای مشترک',
  description: 'اطلس و طبقه‌بندی ساختاریافته الگوها و پدیدارهای گزارش‌شده در تجارب مرزی آگاهی.',
}

export default function PatternsAtlasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'اطلس الگوها' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">اطلس الگوهای مشترک آگاهی</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          تعاریف پژوهشی، معیارهای ورود و خروج، و نمونه‌های مستندسازی‌شده الگوهای تکرارشونده در آرشیو
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_PATTERNS.map((pattern) => (
          <Link key={pattern.slug} href={`/patterns/${pattern.slug}`} className="group">
            <Card className="p-6 h-full flex flex-col justify-between space-y-4 group-hover:border-primary/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" className="text-xs">
                    {pattern.category === 'coreElement' && 'عنصر اصلی'}
                    {pattern.category === 'spatiotemporal' && 'فضایی-زمانی'}
                    {pattern.category === 'transcendental' && 'ادراکات متعالی'}
                    {pattern.category === 'aftereffects' && 'پیامدها و تحولات'}
                  </Badge>
                  <BookOpen className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                  {pattern.title}
                </h3>

                <p className="text-xs text-text-secondary leading-persian line-clamp-3">
                  {pattern.shortDefinition}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-primary font-medium">
                <span>مشاهده تعریف و تجارب مرتبط</span>
                <span>←</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
