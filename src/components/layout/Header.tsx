'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, FileEdit, BookOpen, Compass, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export interface HeaderProps {
  siteName?: string
}

export const Header: React.FC<HeaderProps> = ({ siteName = 'مرز آگاهی' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'آرشیو تجربه‌ها', href: '/experiences', icon: Compass },
    { label: 'اطلس الگوها', href: '/patterns', icon: BookOpen },
    { label: 'پژوهش و مقالات', href: '/research', icon: BookOpen },
    { label: 'مراکز و پیوندها', href: '/links', icon: Globe },
    { label: 'روششناسی بررسی', href: '/methodology', icon: Shield },
    { label: 'منشور اخلاقی', href: '/ethics', icon: Shield },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-border/80 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1 transition-transform hover:opacity-95"
            aria-label={`${siteName} - صفحه اصلی`}
          >
            <Logo size="lg" variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            aria-label="جست‌وجو در پایگاه"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </Link>

          <Link href="/submit" className="hidden sm:inline-flex">
            <Button size="sm" variant="primary" className="gap-1.5 shadow-sm">
              <FileEdit className="w-4 h-4" />
              <span>ثبت تجربه من</span>
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-text-primary hover:bg-background transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="pt-2">
            <Link href="/submit" onClick={() => setMobileMenuOpen(false)} className="w-full block">
              <Button size="md" variant="primary" className="w-full gap-2">
                <FileEdit className="w-4 h-4" />
                <span>ثبت تجربه من</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
