'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ShieldCheck, AlertTriangle, ArrowRight, ArrowLeft, Copy, Check, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Checkbox } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { toPersianDigits } from '@/lib/text/persian'

export interface SubmissionWizardProps {
  experienceTypes: { label: string; value: string }[]
  patterns: { label: string; value: string }[]
}

export const SubmissionWizard: React.FC<SubmissionWizardProps> = ({ experienceTypes, patterns }) => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ caseCode: string; withdrawalToken: string } | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)

  // Wizard state in memory
  const [formData, setFormData] = useState({
    // Step 1
    ageConfirmed18Plus: false,
    privacyUnderstood: false,
    // Step 2
    experienceTypeCandidate: experienceTypes[0]?.value || 'near-death-experience',
    country: 'ایران',
    occurrenceApproximation: '',
    ageAtOccurrence: '',
    generalContext: '',
    // Step 3
    rawNarrative: '',
    // Step 4
    selectedPatterns: [] as string[],
    aftereffectsRaw: '',
    witnessAvailable: false,
    documentsAvailable: false,
    mediaAvailable: false,
    // Step 5
    hasPhysicalDocumentsOrMedia: false,
    mediaDescription: '',
    // Step 6
    preferredAnonymity: 'anonymous' as 'anonymous' | 'alias' | 'named',
    realName: '',
    publicAlias: '',
    email: '',
    phone: '',
    preferredContactMethod: 'none' as 'email' | 'phone' | 'none',
    // Step 7
    consentToProcess: false,
    consentToContact: false,
    consentToPublishAnonymously: false,
    consentToPublishName: false,
    consentToResearchUseDeidentified: false,
    consentToMediaUse: false,
    // Honeypot
    honeypot: '',
  })

  const handlePatternToggle = (patternSlug: string) => {
    setFormData((prev) => {
      const exists = prev.selectedPatterns.includes(patternSlug)
      return {
        ...prev,
        selectedPatterns: exists
          ? prev.selectedPatterns.filter((p) => p !== patternSlug)
          : [...prev.selectedPatterns, patternSlug],
      }
    })
  }

  const validateCurrentStep = (): boolean => {
    setError(null)
    if (step === 1) {
      if (!formData.ageConfirmed18Plus) {
        setError('تأیید سن بالای ۱۸ سال برای ثبت تجربه الزامی است.')
        return false
      }
      if (!formData.privacyUnderstood) {
        setError('لطفاً شرایط حریم خصوصی و نحوه بررسی را مطالعه و تأیید فرمایید.')
        return false
      }
    }
    if (step === 2) {
      if (!formData.occurrenceApproximation.trim()) {
        setError('لطفاً زمان تقریبی وقوع تجربه را وارد کنید.')
        return false
      }
    }
    if (step === 3) {
      if (formData.rawNarrative.trim().length < 50) {
        setError('روایت تجربه باید حداقل ۵۰ کاراکتر باشد تا امکان بررسی علمی و تحریریه فراهم شود.')
        return false
      }
    }
    if (step === 7) {
      if (!formData.consentToProcess) {
        setError('رضایت به پردازش و بررسی پرونده توسط هیئت داوران الزامی است.')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 7))
    }
  }

  const handlePrev = () => {
    setError(null)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'خطایی در ثبت تجربه رخ داد.')
      }

      setSuccessData({
        caseCode: data.caseCode,
        withdrawalToken: data.withdrawalToken,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطای ارتباط با سرور.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string, type: 'code' | 'token') => {
    navigator.clipboard.writeText(text)
    if (type === 'code') {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } else {
      setCopiedToken(true)
      setTimeout(() => setCopiedToken(false), 2000)
    }
  }

  // Render Post-Submission Success Screen
  if (successData) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-10 max-w-2xl mx-auto text-right space-y-6 shadow-sm">
        <div className="flex items-center gap-3 text-success">
          <CheckCircle2 className="w-8 h-8 shrink-0" />
          <h2 className="text-xl font-bold text-text-primary">روایت شما با موفقیت در آرشیو ثبت شد</h2>
        </div>

        <Alert variant="info" title="اطلاعیه مهم رهگیری و حریم خصوصی">
          پرونده شما در صف بررسی اولیه تحریریه قرار گرفت. لطفاً کدهای زیر را به صورت امن ذخیره یا چاپ کنید. به دلیل حفظ
          امنیت، توکن پس‌گیری فقط یک‌بار نمایش داده می‌شود.
        </Alert>

        {/* Case Code */}
        <div className="p-4 bg-background rounded-xl border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">کد پیگیری پرونده (Case Code):</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(successData.caseCode, 'code')}
              className="gap-1.5 py-1 px-2.5 h-8"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'کپی شد' : 'کپی'}</span>
            </Button>
          </div>
          <div className="font-mono text-base font-bold text-primary" dir="ltr">
            {successData.caseCode}
          </div>
        </div>

        {/* Withdrawal Token */}
        <div className="p-4 bg-background rounded-xl border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">توکن پس‌گیری و انصراف (Withdrawal Token):</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(successData.withdrawalToken, 'token')}
              className="gap-1.5 py-1 px-2.5 h-8"
            >
              {copiedToken ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedToken ? 'کپی شد' : 'کپی'}</span>
            </Button>
          </div>
          <div className="font-mono text-xs text-text-primary break-all bg-surface p-2.5 rounded border border-border" dir="ltr">
            {successData.withdrawalToken}
          </div>
          <p className="text-[11px] text-text-secondary">
            در صورت تمایل به لغو انتشار یا حذف پرونده در هر مرحله از بررسی، می‌توانید با ورود این توکن در صفحه{' '}
            <a href="/withdraw" className="text-primary underline">
              پس‌گیری رضایت
            </a>{' '}
            پرونده خود را از پایگاه خارج کنید.
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <Link href="/">
            <Button variant="primary">بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 max-w-3xl mx-auto text-right space-y-6 shadow-sm">
      {/* Wizard Progress Stepper */}
      <div className="border-b border-border/80 pb-5">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <span className="font-bold text-primary">گام {toPersianDigits(step)} از ۷</span>
          <span>
            {step === 1 && 'مقدمه و حریم خصوصی'}
            {step === 2 && 'مشخصات رخداد'}
            {step === 3 && 'متن روایت'}
            {step === 4 && 'عناصر و پیامدها'}
            {step === 5 && 'اسناد و شواهد'}
            {step === 6 && 'هویت و تماس'}
            {step === 7 && 'رضایت‌نامه نهایی'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <Alert variant="error" title="خطای اعتبارسنجی">
          {error}
        </Alert>
      )}

      {/* Honeypot for bot protection */}
      <input
        type="text"
        name="website_url_hp"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-base font-bold text-text-primary">گام ۱: معرفی، اصول حریم خصوصی و تأیید سن</h3>
          <p className="text-sm text-text-secondary leading-persian">
            این پایگاه یک آرشیو مستقل پژوهشی است. ارسال روایت به منزله انتشار خودکار در وب‌سایت نیست؛ کلیه ارسالی‌ها
            ابتدا توسط داوران بررسی و ناشناس‌سازی می‌شوند.
          </p>

          <div className="space-y-4 pt-2">
            <Checkbox
              label="سن من ۱۸ سال تمام یا بیشتر است."
              checked={formData.ageConfirmed18Plus}
              onChange={(e) => setFormData({ ...formData, ageConfirmed18Plus: e.target.checked })}
            />
            <Checkbox
              label="تأیید می‌کنم که از ارسال مدارک هویتی محرمانه یا نام اشخاص ثالث در متن عمومی خودداری می‌کنم."
              checked={formData.privacyUnderstood}
              onChange={(e) => setFormData({ ...formData, privacyUnderstood: e.target.checked })}
            />
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="text-base font-bold text-text-primary">گام ۲: اطلاعات و زمینه کلی رخداد</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">نوع احتمالی تجربه</label>
            <select
              value={formData.experienceTypeCandidate}
              onChange={(e) => setFormData({ ...formData, experienceTypeCandidate: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {experienceTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="زمان تقریبی وقوع (مثال: تابستان ۱۳۹۸ یا حدود ۱۰ سال پیش)"
              value={formData.occurrenceApproximation}
              onChange={(e) => setFormData({ ...formData, occurrenceApproximation: e.target.value })}
              required
            />
            <Input
              label="سن تقریبی هنگام وقوع تجربه (اختیاری)"
              value={formData.ageAtOccurrence}
              onChange={(e) => setFormData({ ...formData, ageAtOccurrence: e.target.value })}
            />
          </div>

          <Textarea
            label="زمینه کلی رخداد (اختیاری: مثلاً بیهوشی در اتاق عمل، سانحه تصادف، بیماری، یا در حالت آرامش)"
            value={formData.generalContext}
            onChange={(e) => setFormData({ ...formData, generalContext: e.target.value })}
            rows={3}
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary">گام ۳: شرح کامل و بدون قضاوت روایت</h3>
            <span className="text-xs text-text-secondary font-mono">
              {toPersianDigits(formData.rawNarrative.length)} کاراکتر
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            لطفاً آنچه را شخصاً مشاهده، احساس و ادراک کرده‌اید به زبان خود بنویسید. نیازی به استفاده از اصطلاحات تخصصی
            نیست؛ صداقت و جزئیات تجربی راوی مهم‌ترین ارزش پژوهشی است.
          </p>
          <Textarea
            value={formData.rawNarrative}
            onChange={(e) => setFormData({ ...formData, rawNarrative: e.target.value })}
            rows={10}
            placeholder="روایت خود را از لحظات آغازین، احساسات، مشاهدات و بازگشت بنویسید..."
            required
          />
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="space-y-5">
          <h3 className="text-base font-bold text-text-primary">گام ۴: عناصر برجسته و پیامدهای ادراک‌شده</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            کدام یک از این الگوها در تجربه شما وجود داشت؟ (انتخاب اختیاری است)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {patterns.map((pat) => (
              <label
                key={pat.value}
                className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                  formData.selectedPatterns.includes(pat.value)
                    ? 'bg-primary-light/60 border-primary text-text-primary font-medium'
                    : 'bg-background border-border text-text-secondary hover:bg-surface'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.selectedPatterns.includes(pat.value)}
                  onChange={() => handlePatternToggle(pat.value)}
                  className="rounded border-border text-primary accent-primary"
                />
                <span>{pat.label}</span>
              </label>
            ))}
          </div>

          <Textarea
            label="پیامدها و تغییرات پس از تجربه بر نگرش، رفتار یا ارزش‌های زندگی شما (اختیاری)"
            value={formData.aftereffectsRaw}
            onChange={(e) => setFormData({ ...formData, aftereffectsRaw: e.target.value })}
            rows={3}
          />
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div className="space-y-5">
          <h3 className="text-base font-bold text-text-primary">گام ۵: مدارک، شواهد و فایل‌های پیوست</h3>
          <Alert variant="info">
            در نسخه جاری، جهت حفظ امنیت کاربران، آپلود مستقیم اسناد هویتی و پزشکی در فرم عمومی فعال نیست. در صورت تمایل،
            پس از بررسی اولیه تحریریه، پیوند آپلود امن اختصاصی برای شما ارسال خواهد شد.
          </Alert>

          <div className="space-y-3 pt-2">
            <Checkbox
              label="برای این رخداد شاهد عینی (پزشک، پرستار یا همراهان) وجود دارد."
              checked={formData.witnessAvailable}
              onChange={(e) => setFormData({ ...formData, witnessAvailable: e.target.checked })}
            />
            <Checkbox
              label="مدارک بیمارستانی، بالینی یا ثبت‌های پزشکی هم‌زمان در دسترس است."
              checked={formData.documentsAvailable}
              onChange={(e) => setFormData({ ...formData, documentsAvailable: e.target.checked })}
            />
            <Checkbox
              label="یادداشت صوتی یا فایل تصویری از روایت خود در اختیار دارم."
              checked={formData.mediaAvailable}
              onChange={(e) => setFormData({ ...formData, mediaAvailable: e.target.checked })}
            />
          </div>
        </div>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <h3 className="text-base font-bold text-text-primary">گام ۶: هویت، سطح ناشناس‌ماندن و راه‌های ارتباطی</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">ترجیح شما برای انتشار نام</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                <input
                  type="radio"
                  name="preferredAnonymity"
                  value="anonymous"
                  checked={formData.preferredAnonymity === 'anonymous'}
                  onChange={() => setFormData({ ...formData, preferredAnonymity: 'anonymous' })}
                  className="accent-primary"
                />
                <span>کاملاً ناشناس (بدون ذکر نام یا مشخصه فردی)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                <input
                  type="radio"
                  name="preferredAnonymity"
                  value="alias"
                  checked={formData.preferredAnonymity === 'alias'}
                  onChange={() => setFormData({ ...formData, preferredAnonymity: 'alias' })}
                  className="accent-primary"
                />
                <span>با نام مستعار انتخابی من</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                <input
                  type="radio"
                  name="preferredAnonymity"
                  value="named"
                  checked={formData.preferredAnonymity === 'named'}
                  onChange={() => setFormData({ ...formData, preferredAnonymity: 'named' })}
                  className="accent-primary"
                />
                <span>با نام واقعی من (با رضایت صریح)</span>
              </label>
            </div>
          </div>

          {formData.preferredAnonymity === 'alias' && (
            <Input
              label="نام مستعار عمومی پیشنهادی"
              value={formData.publicAlias}
              onChange={(e) => setFormData({ ...formData, publicAlias: e.target.value })}
              placeholder="مثال: ر. کاظمی یا مسافر نور"
            />
          )}

          <div className="p-4 bg-background rounded-xl border border-border/80 space-y-3">
            <span className="text-xs font-semibold text-text-primary block">
              اطلاعات تماس محرمانه (رمزنگاری‌شده در سرور با AES-GCM و غیرقابل دسترسی عمومی):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="نام و نام خانوادگی واقعی (اختیاری)"
                value={formData.realName}
                onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
              />
              <Input
                label="ایمیل جهت پیگیری (اختیاری)"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 7 */}
      {step === 7 && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base font-bold text-text-primary">گام ۷: رضایت‌نامه آگاهانه و ثبت نهایی</h3>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            گزینه‌های زیر به صورت مستقل طراحی شده‌اند. لطفاً هر کدام را جداگانه بررسی و انتخاب فرمایید:
          </p>

          <div className="space-y-3.5 bg-background p-4 rounded-xl border border-border">
            <Checkbox
              label={<span className="font-semibold">۱. رضایت به پردازش و ارزیابی اطلاعات پرونده توسط هیئت تحریریه (الزامی)</span>}
              checked={formData.consentToProcess}
              onChange={(e) => setFormData({ ...formData, consentToProcess: e.target.checked })}
            />

            <Checkbox
              label="۲. رضایت به تماس تحریریه در صورت نیاز به مصاحبه یا تکمیل شواهد (اختیاری)"
              checked={formData.consentToContact}
              onChange={(e) => setFormData({ ...formData, consentToContact: e.target.checked })}
            />

            <Checkbox
              label="۳. رضایت به انتشار متن روایت به صورت ناشناس در آرشیو عمومی پایگاه (اختیاری)"
              checked={formData.consentToPublishAnonymously}
              onChange={(e) => setFormData({ ...formData, consentToPublishAnonymously: e.target.checked })}
            />

            <Checkbox
              label="۴. رضایت به استفاده در مقالات پژوهشی و تحلیلی آکادمیک به صورت بی‌نام (اختیاری)"
              checked={formData.consentToResearchUseDeidentified}
              onChange={(e) => setFormData({ ...formData, consentToResearchUseDeidentified: e.target.checked })}
            />
          </div>
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {step > 1 ? (
          <Button variant="outline" size="md" onClick={handlePrev} className="gap-2">
            <ArrowRight className="w-4 h-4" />
            <span>گام قبل</span>
          </Button>
        ) : (
          <div />
        )}

        {step < 7 ? (
          <Button variant="primary" size="md" onClick={handleNext} className="gap-2">
            <span>گام بعدی</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            onClick={handleSubmit}
            className="gap-2 font-bold px-8 shadow-md"
          >
            <span>ثبت نهایی و دریافت کد پرونده</span>
            <CheckCircle2 className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
