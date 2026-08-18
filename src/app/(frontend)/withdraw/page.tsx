'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react'

export default function WithdrawalPortalPage() {
  const [caseCode, setCaseCode] = useState('')
  const [withdrawalToken, setWithdrawalToken] = useState('')
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!caseCode.trim() || !withdrawalToken.trim()) {
      setError('ورود کد پرونده و توکن پس‌گیری الزامی است.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseCode: caseCode.trim(),
          withdrawalToken: withdrawalToken.trim(),
          reason: reason.trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'خطایی در پردازش درخواست لغو رخ داد.')
      }

      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطای ارتباط با سرور.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      <Breadcrumb
        items={[
          { label: 'صفحه اصلی', href: '/' },
          { label: 'پس‌گیری رضایت و لغو پرونده' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">سامانه پس‌گیری و لغو رضایت راوی</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          شما در هر زمان حق دارید بدون نیاز به ذکر دلیل، رضایت قبلی خود را پس گرفته و پرونده یا روایت منتشرشده خود را از
          آرشیو خارج نمایید.
        </p>
      </div>

      {success ? (
        <Card className="p-8 space-y-4 bg-surface text-center">
          <div className="w-12 h-12 rounded-full bg-success-light text-success mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">رضایت شما با موفقیت لغو شد</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-persian">
            پرونده شما در وضعیت لغوشده (Withdrawn) قرار گرفت و در صورتی که روایتی در سایت عمومی منتشر شده باشد، بلافاصله
            از دسترس عمومی خارج گردید.
          </p>
          <div className="pt-4">
            <Link href="/">
              <Button variant="primary">بازگشت به صفحه اصلی</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-sm">
          {error && (
            <Alert variant="error" title="خطا در اعتبارسنجی توکن">
              {error}
            </Alert>
          )}

          <Alert variant="info" title="راهنمای بازیابی">
            کد پیگیری پرونده (Case Code) و توکن پس‌گیری اختصاصی (Withdrawal Token) در پایان مرحله ثبت تجربه به شما نمایش
            داده شده‌اند.
          </Alert>

          <div className="space-y-4">
            <Input
              label="کد پیگیری پرونده (مثال: NDE-2026-XXXXXX)"
              value={caseCode}
              onChange={(e) => setCaseCode(e.target.value)}
              placeholder="NDE-2026-..."
              required
            />

            <Input
              label="توکن پس‌گیری یک‌بارمصرف (Withdrawal Token)"
              value={withdrawalToken}
              onChange={(e) => setWithdrawalToken(e.target.value)}
              placeholder="توکن امنیتی ۴۸ کاراکتری..."
              required
            />

            <Textarea
              label="دلیل پس‌گیری (اختیاری)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="در صورت تمایل، می‌توانید دلیل انصراف خود را برای بهبود فرآیندها بنویسید..."
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button
              type="submit"
              variant="danger"
              size="lg"
              isLoading={isSubmitting}
              className="gap-2 font-bold px-8 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>لغو قطعی رضایت و خروج پرونده</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
