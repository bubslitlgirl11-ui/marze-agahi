import { describe, it, expect } from 'vitest'
import { generateCaseCode, generateWithdrawalToken, sha256, hashIp } from '@/lib/crypto/hash'
import { encryptPII, decryptPII } from '@/lib/crypto/pii'
import { CompleteSubmissionSchema } from '@/lib/validation/submission'

describe('Integration: Submission Creation & PII Shielding Flow', () => {
  it('processes valid submission payload, generates secure case code, hashes withdrawal token, and encrypts contact data', async () => {
    const rawSubmission = {
      ageConfirmed18Plus: true as const,
      experienceTypeCandidate: 'near-death-experience',
      country: 'ایران',
      occurrenceApproximation: '۱۳۹۷ - بیمارستان امام خمینی',
      rawNarrative:
        'من ناگهان احساس جدا شدن از کالبدم را داشتم و چراغ‌های اتاق عمل و مکالمات کادر جراحی را از دید ناظر بالا می‌دیدم که بیش از پنجاه کاراکتر است.',
      preferredAnonymity: 'alias' as const,
      realName: 'رضا کمالی',
      publicAlias: 'ر. ک.',
      email: 'reza.kamali@example.com',
      phone: '09121112233',
      preferredContactMethod: 'email' as const,
      consentToProcess: true as const,
      consentToContact: true,
      consentToPublishAnonymously: true,
      consentToPublishName: false,
      consentToResearchUseDeidentified: true,
      consentToMediaUse: false,
      selectedPatterns: ['out-of-body-sensation'],
    }

    // 1. Zod validation
    const parsed = CompleteSubmissionSchema.parse(rawSubmission)
    expect(parsed.experienceTypeCandidate).toBe('near-death-experience')

    // 2. Encryption
    const encryptedName = await encryptPII(rawSubmission.realName)
    const encryptedEmail = await encryptPII(rawSubmission.email)
    const encryptedPhone = await encryptPII(rawSubmission.phone)

    expect(encryptedName).not.toContain('رضا')
    expect(encryptedEmail).not.toContain('reza')
    expect(encryptedPhone).not.toContain('0912')

    // 3. Decryption check
    expect(await decryptPII(encryptedName)).toBe('رضا کمالی')
    expect(await decryptPII(encryptedEmail)).toBe('reza.kamali@example.com')
    expect(await decryptPII(encryptedPhone)).toBe('09121112233')

    // 4. Token generation & verification
    const caseCode = generateCaseCode()
    const rawToken = generateWithdrawalToken()
    const tokenHash = await sha256(rawToken)

    expect(caseCode).toMatch(/^NDE-\d{4}-[0-9A-F]{6}$/)
    expect(tokenHash).toBe(await sha256(rawToken))
  })
})
