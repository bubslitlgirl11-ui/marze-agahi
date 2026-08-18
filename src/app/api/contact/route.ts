import { NextRequest, NextResponse } from 'next/server'
import { encryptPII } from '@/lib/crypto/pii'
import { hashIp } from '@/lib/crypto/hash'

export async function POST(req: NextRequest) {
  try {
    const { name, contactInfo, subject, message, honeypot } = await req.json()

    if (honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
    }

    if (!subject || !message) {
      return NextResponse.json({ error: 'موضوع و متن پیام الزامی است.' }, { status: 400 })
    }

    const encryptedSenderName = name ? await encryptPII(name) : undefined
    const encryptedSenderContact = contactInfo ? await encryptPII(contactInfo) : undefined

    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const ipHash = await hashIp(clientIp)

    return NextResponse.json({
      success: true,
      message: 'پیام شما با موفقیت ثبت شد.',
    })
  } catch (error: unknown) {
    console.error('[Contact API Error]', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'خطا در ثبت پیام.' }, { status: 500 })
  }
}
