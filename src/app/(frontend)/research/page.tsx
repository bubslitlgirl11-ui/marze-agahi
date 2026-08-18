import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, Calendar, User, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'پژوهش‌ها و مقالات علمی',
  description: 'مقالات مروری، روش‌شناسی بررسی و ارزیابی‌های علمی پدیدارهای مرزی آگاهی.',
}

export default function ResearchDirectoryPage() {
  const articles = [
    {
      title: 'روششناسی گردآوری و اعتبارسنجی روایت‌های تجارب نزدیک به مرگ',
      slug: 'methodology-of-collecting-nde-reports',
      category: 'methodology',
      excerpt:
        'بررسی چارچوب‌های استاندارد مصاحبه، روش‌های کاهش سوگیری حافظه راوی، و تمایز ادراکات شهودی از اثرات دارویی.',
      author: 'هیئت پژوهشی پایگاه مرز آگاهی',
      publishedAt: '۱۴۰۴/۰۲/۲۰',
    },
    {
      title: 'بررسی تطبیقی ادراک نور و مرور زندگی در گزارش‌های معاصر',
      slug: 'comparative-study-light-and-life-review',
      category: 'research',
      excerpt:
        'مروری بر عناصر تکرارشونده در ادبیات بین‌المللی علوم اعصاب و روان‌شناسی و بررسی شباهت‌ها در نمونه‌های فارسی.',
      author: 'دکتر ر. امینی',
      publishedAt: '۱۴۰۴/۰۴/۱۱',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'پژوهش و مقالات' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">پژوهش‌ها و مقالات علمی</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          تحلیل‌های روش‌شناختی، بررسی‌های مروری و تلفیق یافته‌های تجربی با مراجع معتبر دانشگاهی
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <Link key={art.slug} href={`/research/${art.slug}`} className="group">
            <Card className="p-6 h-full flex flex-col justify-between space-y-4 group-hover:border-primary/50 transition-all">
              <div className="space-y-3">
                <Badge variant="primary" className="text-xs">
                  {art.category === 'methodology' ? 'روششناسی' : 'تحلیل علمی'}
                </Badge>

                <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-text-secondary leading-persian line-clamp-3">{art.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{art.author}</span>
                </span>
                <span className="flex items-center gap-1 font-medium text-primary">
                  <span>مطالعه مقاله</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
