'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { OrganizationCard } from '@/features/links/OrganizationCard'
import { ORGANIZATIONS } from '@/data/organizations'
import {
  Globe,
  Search,
  Filter,
  Building2,
  GraduationCap,
  Database,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react'

export default function LinksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const countryOptions = [
    { value: 'all', label: 'همه کشورها' },
    { value: 'Germany', label: '🇩🇪 آلمان' },
    { value: 'United States', label: '🇺🇸 آمریکا' },
    { value: 'United Kingdom', label: '🇬🇧 بریتانیا' },
    { value: 'France', label: '🇫🇷 فرانسه' },
    { value: 'Belgium', label: '🇧🇪 بلژیک' },
    { value: 'Switzerland', label: '🇨🇭 سوئیس' },
  ]

  const categoryOptions = [
    { value: 'all', label: 'همه دسته‌ها', icon: Layers },
    { value: 'association', label: 'انجمن‌ها و شبکه‌های علمی', icon: Building2 },
    { value: 'academic_research', label: 'مراکز دانشگاهی و بالینی', icon: GraduationCap },
    { value: 'archive_database', label: 'پایگاه‌های داده و آرشیو', icon: Database },
    { value: 'foundation', label: 'بنیادهای گرنت پژوهشی', icon: Award },
  ]

  const filteredOrganizations = useMemo(() => {
    return ORGANIZATIONS.filter((org) => {
      const matchesCountry = selectedCountry === 'all' || org.country.toLowerCase().includes(selectedCountry.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) {
        return matchesCountry && matchesCategory
      }

      const matchesQuery =
        org.nameFa.toLowerCase().includes(query) ||
        org.name.toLowerCase().includes(query) ||
        (org.acronym && org.acronym.toLowerCase().includes(query)) ||
        org.countryFa.toLowerCase().includes(query) ||
        org.summaryFa.toLowerCase().includes(query) ||
        org.founders.some(
          (f) =>
            f.nameFa.toLowerCase().includes(query) ||
            f.name.toLowerCase().includes(query) ||
            f.roleFa.toLowerCase().includes(query)
        )

      return matchesCountry && matchesCategory && matchesQuery
    })
  }, [searchQuery, selectedCountry, selectedCategory])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'پیوندها و مراکز تحقیقاتی NDE' },
        ]}
      />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" className="py-1 px-3 text-xs font-semibold gap-1.5 shadow-xs">
            <Globe className="w-3.5 h-3.5" />
            <span>شبکه جهانی پژوهش آگاهی</span>
          </Badge>
          <span className="text-xs text-text-secondary">
            شامل {ORGANIZATIONS.length} مرکز و بنیاد بین‌المللی
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
          پیوندها و انجمن‌های فعال در تحقیقات تجارب نزدیک به مرگ (NDE)
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-persian max-w-4xl">
          راهنمای جامع، مستند و معتبر از انجمن‌های پژوهشی، دپارتمان‌های دانشگاهی علوم اعصاب، پایگاه‌های داده چندزبانه و
          بنیادهای علمی حامی تحقیقات هوشیاری در سراسر جهان (آمریکا، آلمان، بریتانیا، فرانسه، بلژیک و سوئیس) همراه با معرفی
          بنیانگذاران پیشگام و پیوند مستقیم به تارنماهای رسمی.
        </p>
      </div>

      {/* Quick Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1 border-primary/20 bg-primary-light/40">
          <div className="flex items-center gap-2 text-primary">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-bold">انجمن‌های مرجع</span>
          </div>
          <p className="text-xs text-text-secondary">
            IANDS آمریکا، Netzwerk NDE آلمان و انجمن‌های فرانسه و سوئیس
          </p>
        </Card>

        <Card className="p-4 space-y-1 border-accent/20 bg-accent-light/40">
          <div className="flex items-center gap-2 text-accent">
            <GraduationCap className="w-4 h-4" />
            <span className="text-xs font-bold">مراکز دانشگاهی بالینی</span>
          </div>
          <p className="text-xs text-text-secondary">
            مطالعات احیای AWARE، دانشگاه ویرجینیا DOPS و دانشگاه لیژ بلژیک
          </p>
        </Card>

        <Card className="p-4 space-y-1 border-border bg-surface">
          <div className="flex items-center gap-2 text-text-primary">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold">پایگاه‌های داده جهانی</span>
          </div>
          <p className="text-xs text-text-secondary">
            آرشیو چندزبانه NDERF با بیش از ۵۰۰۰ موردکاوی تفصیلی استاندارد
          </p>
        </Card>

        <Card className="p-4 space-y-1 border-border bg-surface">
          <div className="flex items-center gap-2 text-text-primary">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold">بنیادهای پژوهشی و گرنت</span>
          </div>
          <p className="text-xs text-text-secondary">
            بنیاد مطالعات آگاهی بیگلو (BICS) و بنیاد پژوهشی افق
          </p>
        </Card>
      </div>

      {/* Interactive Controls (Search & Filters) */}
      <div className="bg-surface rounded-2xl border border-border/80 p-5 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-3 relative">
            <Search className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جست‌وجو در نام سازمان، کشور، نام بنیانگذار (مثلاً مودی، ون لاک، لانگ، پرنیا)..."
              className="pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary hover:text-text-primary px-2 py-1 rounded bg-background"
              >
                پاک کردن
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-2 pt-2 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span>دسته‌بندی نوع مرکز:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((opt) => {
              const Icon = opt.icon
              const isSelected = selectedCategory === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setSelectedCategory(opt.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-primary text-surface shadow-xs font-semibold'
                      : 'bg-background text-text-secondary hover:text-text-primary hover:bg-background/80 border border-border/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-surface' : 'text-primary'}`} />
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Country Filters */}
        <div className="space-y-2 pt-2 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>فیلتر بر اساس کشور:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {countryOptions.map((country) => {
              const isSelected = selectedCountry === country.value
              return (
                <button
                  key={country.value}
                  onClick={() => setSelectedCountry(country.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-accent text-surface shadow-xs font-semibold'
                      : 'bg-background text-text-secondary hover:text-text-primary hover:bg-background/80 border border-border/60'
                  }`}
                >
                  {country.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-text-secondary px-1">
        <span>نمایش {filteredOrganizations.length} مرکز از مجموع {ORGANIZATIONS.length} مرکز ثبت‌شده</span>
        {(selectedCountry !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCountry('all')
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="text-primary hover:underline font-medium"
          >
            بازنشانی همه فیلترها
          </button>
        )}
      </div>

      {/* Organizations List Grid */}
      {filteredOrganizations.length > 0 ? (
        <div className="space-y-6">
          {filteredOrganizations.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="مرکزی با این مشخصات یافت نشد"
          description="لطفاً عبارت جستجو یا فیلترهای کشور و دسته‌بندی را تغییر دهید."
          action={
            <button
              onClick={() => {
                setSelectedCountry('all')
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="px-4 py-2 rounded-lg bg-primary text-surface text-xs font-medium"
            >
              نمایش همه مراکز
            </button>
          }
        />
      )}

      {/* Scientific & Ethical Notice */}
      <Alert variant="info" title="شفافیت و استقلال علمی پایگاه مرز آگاهی">
        تمامی پیوندها و سازمان‌های معرفی‌شده در این بخش، نهادها و مجامع مستقل بین‌المللی هستند که صرفاً جهت دسترسی
        پژوهشگران، دانشگاهیان و علاقه‌مندان به منابع دست اول، ژورنال‌های داوری‌شده و مطالعات بیمارستانی معرفی شده‌اند. پایگاه
        «مرز آگاهی» وابسته به هیچ‌یک از این نهادها نبوده و رویکردی کاملاً مستقل و روش‌شناختی را دنبال می‌کند.
      </Alert>
    </div>
  )
}
