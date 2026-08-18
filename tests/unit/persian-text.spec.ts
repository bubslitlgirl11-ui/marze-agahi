import { describe, it, expect } from 'vitest'
import { normalizePersianText, toLatinDigits, toPersianDigits, slugify } from '@/lib/text/persian'

describe('Persian Text Processing', () => {
  it('normalizes Arabic characters to Persian (ي/ك to ی/ک)', () => {
    const rawArabic = 'تاريخ پزشكي و مرگ'
    const normalized = normalizePersianText(rawArabic)
    expect(normalized).toBe('تاریخ پزشکی و مرگ')
  })

  it('normalizes Arabic digits to Persian digits', () => {
    const arabicNumbers = 'سال ١٤٠٥'
    const normalized = normalizePersianText(arabicNumbers)
    expect(normalized).toBe('سال ۱۴۰۵')
  })

  it('converts Persian digits to Latin digits correctly', () => {
    const persianPhone = '۰۹۱۲۳۴۵۶۷۸۹'
    const latinPhone = toLatinDigits(persianPhone)
    expect(latinPhone).toBe('09123456789')
  })

  it('converts Latin digits to Persian digits correctly', () => {
    const latinYear = 2026
    const persianYear = toPersianDigits(latinYear)
    expect(persianYear).toBe('۲۰۲۶')
  })

  it('generates clean URL slug from Persian text', () => {
    const title = 'تجربه نزدیک به مرگ و ادراک نور!'
    const slug = slugify(title)
    expect(slug).toBe('تجربه-نزدیک-به-مرگ-و-ادراک-نور')
  })
})
