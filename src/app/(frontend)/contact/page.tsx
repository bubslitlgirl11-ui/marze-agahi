'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, Alert } from '@/components/ui/Alert'
import { Card } from '@/components/ui/Card'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle2, Mail } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.subject.trim() || !formData.message.trim()) {
      setError('ورود موضوع و متن پیام الزامی است.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'خطایی در ارسال پیام رخ داد.')
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
          { label: 'تماس با تحریریه' },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">ارتباط با هیئت تحریریه و پژوهشگران</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          انتقادات، پیشنهادات، گزارش‌های اصلاحی مقالات یا درخواست‌های همکاری پژوهشی خود را ارسال فرمایید.
        </p>
      </div>

      {success ? (
        <Card className="p-8 space-y-4 bg-surface text-center">
          <div className="w-12 h-12 rounded-full bg-success-light text-success mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">پیام شما با موفقیت ارسال شد</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-persian">
            پیام شما به صورت رمزنگاری‌شده در سامانه ثبت شد و در اسرع وقت توسط دبیران تحریریه بررسی خواهد شد.
          </p>
          <div className="pt-4">
            <Link href="/">
              <Button variant="primary">بازگشت به صفحه اصلی</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-5 shadow-sm">
          {error && (
            <Alert variant="error" title="خطای ارسال">
              {error}
            </Alert>
          )}

          {/* Honeypot */}
          <input
            type="text"
            name="website_url_hp"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="نام و نام خانوادگی (اختیاری)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="ایمیل یا شماره تماس جهت پاسخ (اختیاری)"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
            />
          </div>

          <Input
            label="موضوع پیام"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="مثال: گزارش اشکال در مقاله، پرسش روش‌شناختی..."
            required
          />

          <Textarea
            label="متن پیام"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            placeholder="پیام خود را بنویسید..."
            required
          />

          <div className="pt-4 border-t border-border flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="gap-2 font-bold px-8 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>ارسال پیام</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
