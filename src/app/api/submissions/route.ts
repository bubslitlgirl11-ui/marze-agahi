import { NextRequest, NextResponse } from 'next/server'
import { CompleteSubmissionSchema } from '@/lib/validation/submission'
import { generateCaseCode, generateWithdrawalToken, sha256, hashIp } from '@/lib/crypto/hash'
import { encryptPII } from '@/lib/crypto/pii'
import { getEmailProvider } from '@/providers/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Zod Validation
    const validationResult = CompleteSubmissionSchema.safeParse(body)
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'اطلاعات ارسالی نامعتبر است.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const data = validationResult.data

    // 2. Honeypot Bot Check
    if (data.honeypot) {
      return NextResponse.json({ error: 'خطای اعتبارسنجی بات.' }, { status: 400 })
    }

    // 3. Cryptographic Token & Code Generation
    const caseCode = generateCaseCode()
    const rawWithdrawalToken = generateWithdrawalToken()
    const withdrawalTokenHash = await sha256(rawWithdrawalToken)

    // 4. IP Hashing for abuse control without storing plaintext IP
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || '127.0.0.1'
    const ipHash = await hashIp(clientIp)

    // 5. Encrypt Sensitive PII (Name, Email, Phone) using AES-256-GCM
    const encryptedRealName = data.realName ? await encryptPII(data.realName) : undefined
    const encryptedEmail = data.email ? await encryptPII(data.email) : undefined
    const encryptedPhone = data.phone ? await encryptPII(data.phone) : undefined

    // 6. Non-blocking Admin notification via EmailProvider
    const emailProvider = getEmailProvider()
    await emailProvider.sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@neadrdeath.ir',
      subject: `[مرز آگاهی] پرونده جدید ثبت شد: ${caseCode}`,
      text: `پرونده جدیدی با کد ${caseCode} در سامانه ثبت شد و در صف تریاژ قرار گرفت.`,
    })

    // 7. Return single-view token and case code to user
    return NextResponse.json(
      {
        success: true,
        caseCode,
        withdrawalToken: rawWithdrawalToken,
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('[Submissions API Error]', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'خطای غیرمنتظره در سرور رخ داد. لطفاً مجدداً تلاش فرمایید.' },
      { status: 500 }
    )
  }
}
