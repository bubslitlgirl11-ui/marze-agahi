/**
 * Persian Text Processing & Normalization
 * Standardizes Arabic characters (ي/ك) to Persian (ی/ک), normalizes numbers and handles ZWNJ.
 */

const ARABIC_YE = '\u064A'
const ARABIC_KAF = '\u0643'
const PERSIAN_YE = '\u06CC'
const PERSIAN_KAF = '\u06A9'

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const LATIN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

/**
 * Normalizes Persian search strings and content
 */
export function normalizePersianText(text: string): string {
  if (!text) return ''

  let normalized = text
    // Replace Arabic Ye with Persian Ye
    .replace(new RegExp(ARABIC_YE, 'g'), PERSIAN_YE)
    // Replace Arabic Kaf with Persian Kaf
    .replace(new RegExp(ARABIC_KAF, 'g'), PERSIAN_KAF)
    // Normalize arabic diacritics (Tanween, Tashdeed, Harakat)
    .replace(/[\u064B-\u0652]/g, '')
    // Standardize zero-width non-joiner
    .replace(/\u200c{2,}/g, '\u200c')
    // Remove extra whitespaces
    .replace(/\s+/g, ' ')
    .trim()

  // Convert Arabic digits to Persian
  for (let i = 0; i < 10; i++) {
    normalized = normalized.replace(new RegExp(ARABIC_DIGITS[i], 'g'), PERSIAN_DIGITS[i])
  }

  return normalized
}

/**
 * Convert all digits to Latin digits (0-9) for standard numerical processing / validation
 */
export function toLatinDigits(text: string): string {
  if (!text) return ''
  let result = text
  for (let i = 0; i < 10; i++) {
    result = result
      .replace(new RegExp(PERSIAN_DIGITS[i], 'g'), LATIN_DIGITS[i])
      .replace(new RegExp(ARABIC_DIGITS[i], 'g'), LATIN_DIGITS[i])
  }
  return result
}

/**
 * Convert Latin digits to Persian digits for display in Persian UI
 */
export function toPersianDigits(text: string | number): string {
  if (text === undefined || text === null) return ''
  const str = text.toString()
  let result = str
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(LATIN_DIGITS[i], 'g'), PERSIAN_DIGITS[i])
  }
  return result
}

/**
 * Generate a clean URL-friendly Persian/English slug
 */
export function slugify(text: string): string {
  return normalizePersianText(text)
    .toLowerCase()
    .replace(/[\s\u200c]+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}
