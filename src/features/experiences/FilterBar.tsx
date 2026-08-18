'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterBarProps {
  experienceTypes: FilterOption[]
  patterns: FilterOption[]
}

export const FilterBar: React.FC<FilterBarProps> = ({ experienceTypes, patterns }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSearch = searchParams.get('q') || ''
  const currentType = searchParams.get('type') || ''
  const currentPattern = searchParams.get('pattern') || ''
  const currentMedia = searchParams.get('media') || ''
  const currentSort = searchParams.get('sort') || 'newest'

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset page on filter change
    router.push(`/experiences?${params.toString()}`)
  }

  const handleReset = () => {
    router.push('/experiences')
  }

  return (
    <div className="bg-surface p-4 rounded-xl border border-border/80 shadow-sm space-y-4 text-right">
      {/* Search and Sort row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 relative">
          <input
            type="text"
            defaultValue={currentSearch}
            placeholder="جست‌وجو در عنوان، شرح یا محتوای روایت..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateFilters('q', (e.target as HTMLInputElement).value)
              }
            }}
            className="w-full pl-10 pr-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="w-4 h-4 text-text-secondary absolute left-3 top-3.5 pointer-events-none" />
        </div>

        <div>
          <select
            value={currentSort}
            onChange={(e) => updateFilters('sort', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">جدیدترین انتشارات</option>
            <option value="featured">تجربه‌های برگزیده</option>
            <option value="updated">تازه‌ترین به‌روزرسانی‌ها</option>
          </select>
        </div>
      </div>

      {/* Filter Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/60">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">نوع تجربه</label>
          <select
            value={currentType}
            onChange={(e) => updateFilters('type', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">همه انواع تجارب</option>
            {experienceTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">الگوی شاخص</label>
          <select
            value={currentPattern}
            onChange={(e) => updateFilters('pattern', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">همه الگوها</option>
            {patterns.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">نوع پیوست چندرسانه‌ای</label>
          <select
            value={currentMedia}
            onChange={(e) => updateFilters('media', e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">همه قالب‌ها</option>
            <option value="video">دارای ویدئوی راوی</option>
            <option value="audio">دارای فایل صوتی</option>
            <option value="text">روایت متنی</option>
          </select>
        </div>
      </div>

      {/* Active filters and reset */}
      {(currentSearch || currentType || currentPattern || currentMedia || currentSort !== 'newest') && (
        <div className="flex items-center justify-between pt-2 text-xs text-text-secondary">
          <span>فیلترهای فعال اعمال شده‌اند</span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-danger hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پاک کردن همه فیلترها</span>
          </button>
        </div>
      )}
    </div>
  )
}
