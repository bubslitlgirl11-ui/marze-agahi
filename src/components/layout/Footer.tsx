import React from 'react'
import Link from 'next/link'
import { Shield, BookOpen, HeartHandshake } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export interface FooterProps {
  siteName?: string
  siteDescription?: string
}

export const Footer: React.FC<FooterProps> = ({
  siteName = 'مرز آگاهی',
  siteDescription = 'آرشیو مستقل و پژوهشی تجربه‌های نزدیک به مرگ و ادراکات مرزی آگاهی.',
}) => {
  return (
    <footer className="bg-surface border-t border-border/80 mt-20 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-0.5" aria-label={siteName}>
              <Logo size="md" variant="compact" />
            </Link>
            <p className="text-sm text-text-secondary leading-persian max-w-lg">{siteDescription}</p>
            <div className="p-3 bg-background rounded-lg border border-border/60 text-xs text-text-secondary leading-relaxed">
              <strong className="text-text-primary block mb-1">هشدار مهم اخلاقی و بالینی:</strong>
              اطلاعات این پایگاه صرفاً بازتاب روایات شخصی راویان و بررسی‌های پژوهشی است و به هیچ عنوان جایگزین خدمات
              پزشکی، روان‌پزشکی یا اورژانس نیست.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary">بخش‌های پایگاه</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/experiences" className="hover:text-primary transition-colors">
                  آرشیو تجربه‌ها
                </Link>
              </li>
              <li>
                <Link href="/patterns" className="hover:text-primary transition-colors">
                  اطلس الگوهای مشترک
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-primary transition-colors">
                  پژوهش‌ها و مقالات علمی
                </Link>
              </li>
              <li>
                <Link href="/links" className="hover:text-primary transition-colors">
                  پیوندها و مراکز تحقیقاتی
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-primary transition-colors">
                  روششناسی بررسی شواهد
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-primary transition-colors font-medium text-primary">
                  ثبت تجربه جدید
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary">حریم خصوصی و قوانین</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  سیاست حفظ حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="hover:text-primary transition-colors">
                  منشور اخلاقی و ناشناس‌سازی
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  شرایط استفاده
                </Link>
              </li>
              <li>
                <Link href="/withdraw" className="hover:text-primary transition-colors text-accent font-medium">
                  پس‌گیری و حذف رضایت راوی
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  ارتباط با هیئت تحریریه
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} تمامی حقوق برای آرشیو مستقل مرز آگاهی محفوظ است.</p>
          <div className="flex items-center gap-4">
            <Link href="/rss.xml" className="hover:text-primary transition-colors">
              خوراک RSS
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-primary transition-colors">
              نقشه سایت
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
