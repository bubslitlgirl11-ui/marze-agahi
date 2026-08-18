import { describe, it, expect } from 'vitest'
import { CompleteSubmissionSchema } from '@/lib/validation/submission'

describe('Submission Validation Schemas', () => {
  it('validates a complete and legitimate submission', () => {
    const validData = {
      ageConfirmed18Plus: true as const,
      experienceTypeCandidate: 'near-death-experience',
      country: 'ایران',
      occurrenceApproximation: 'حدود تابستان ۱۳۹۵ در بیمارستان',
      rawNarrative: 'این یک روایت مستند و دقیق از احساس خروج از بدن و مشاهده پزشکان در اتاق عمل است که بیش از پنجاه کاراکتر دارد.',
      preferredAnonymity: 'anonymous' as const,
      consentToProcess: true as const,
      consentToContact: false,
      consentToPublishAnonymously: true,
      consentToPublishName: false,
      consentToResearchUseDeidentified: true,
      consentToMediaUse: false,
      witnessAvailable: false,
      documentsAvailable: false,
      mediaAvailable: false,
      hasPhysicalDocumentsOrMedia: false,
      preferredContactMethod: 'none' as const,
      selectedPatterns: ['out-of-body-sensation'],
    }

    const result = CompleteSubmissionSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects submissions with narrative under 50 characters', () => {
    const shortData = {
      ageConfirmed18Plus: true as const,
      experienceTypeCandidate: 'near-death-experience',
      country: 'ایران',
      occurrenceApproximation: '۱۳۹۵',
      rawNarrative: 'خیلی کوتاه',
      preferredAnonymity: 'anonymous' as const,
      consentToProcess: true as const,
    }

    const result = CompleteSubmissionSchema.safeParse(shortData)
    expect(result.success).toBe(false)
  })

  it('rejects submissions when 18+ age is not confirmed', () => {
    const underAge = {
      ageConfirmed18Plus: false,
      experienceTypeCandidate: 'near-death-experience',
      country: 'ایران',
      occurrenceApproximation: '۱۳۹۵',
      rawNarrative: 'این یک روایت طولانی و کافی برای ثبت در سامانه است که بیش از پنجاه کاراکتر دارد.',
      consentToProcess: true as const,
    }

    const result = CompleteSubmissionSchema.safeParse(underAge)
    expect(result.success).toBe(false)
  })

  it('rejects honeypot bots', () => {
    const botData = {
      ageConfirmed18Plus: true as const,
      experienceTypeCandidate: 'near-death-experience',
      country: 'ایران',
      occurrenceApproximation: '۱۳۹۵',
      rawNarrative: 'این یک روایت طولانی و کافی برای ثبت در سامانه است که بیش از پنجاه کاراکتر دارد.',
      consentToProcess: true as const,
      honeypot: 'spam-bot-value',
    }

    const result = CompleteSubmissionSchema.safeParse(botData)
    expect(result.success).toBe(false)
  })
})
