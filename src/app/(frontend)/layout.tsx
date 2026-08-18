import React from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://neadrdeath.ir'),
  title: {
    template: '%s | مرز آگاهی',
    default: 'مرز آگاهی | آرشیو مستقل تجربه‌های نزدیک به مرگ و تجربه‌های مرزی آگاهی',
  },
  description:
    'پایگاه جامع و مستقل برای ثبت، بررسی و مستندسازی علمی تجربه‌های نزدیک به مرگ (NDE) و الگوهای مشترک آگاهی انسانی.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'مرز آگاهی',
    description: 'آرشیو مستقل تجربه‌های نزدیک به مرگ و تجربه‌های مرزی آگاهی',
    url: 'https://neadrdeath.ir',
    siteName: 'مرز آگاهی',
    locale: 'fa_IR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-primary text-white px-4 py-2 rounded-lg z-50 shadow-lg"
        >
          پرش به محتوای اصلی
        </a>
        <Header siteName="مرز آگاهی" />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer siteName="مرز آگاهی" />
      </body>
    </html>
  )
}
