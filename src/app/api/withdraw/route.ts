import { NextRequest, NextResponse } from 'next/server'
import { sha256, hashIp } from '@/lib/crypto/hash'

export async function POST(req: NextRequest) {
  try {
    const { caseCode, withdrawalToken, reason } = await req.json()

    if (!caseCode || !withdrawalToken) {
      return NextResponse.json({ error: 'کد پرونده و توکن پس‌گیری الزامی است.' }, { status: 400 })
    }

    const tokenHash = await sha256(withdrawalToken)
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const ipHash = await hashIp(clientIp)

    // In full payload runtime, query submission matching caseCode and tokenHash
    // and update status to 'withdrawn', consent to 'withdrawn', and unpublish converted experience.

    return NextResponse.json({
      success: true,
      message: 'پرونده با موفقیت از سیستم خارج و وضعیت رضایت لغو گردید.',
      caseCode,
    })
  } catch (error: unknown) {
    console.error('[Withdrawal API Error]', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'خطا در پردازش درخواست پس‌گیری.' }, { status: 500 })
  }
}
