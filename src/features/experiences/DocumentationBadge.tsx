import React from 'react'
import { Badge } from '@/components/ui/Badge'

export type DocumentationMethodType =
  | 'selfReport'
  | 'structuredInterview'
  | 'witnessCompared'
  | 'recordsReviewed'
  | 'publishedSource'

const METHOD_LABELS: Record<DocumentationMethodType, { label: string; description: string }> = {
  selfReport: {
    label: 'گزارش مستقیم راوی',
    description: 'روایت به صورت مستقیم توسط خود شخص تجربهگر ارسال شده است.',
  },
  structuredInterview: {
    label: 'مصاحبه ساختاریافته',
    description: 'تحریریه با راوی مصاحبه ساختاریافته تکمیلی انجام داده است.',
  },
  witnessCompared: {
    label: 'گزارش هم‌راستا با شاهدان',
    description: 'روایت با اظهارات اطرافیان یا کادر حاضر در صحنه تطبیق داده شده است.',
  },
  recordsReviewed: {
    label: 'بررسی مدارک بالینی',
    description: 'اسناد بستری، بیهوشی یا مدارک پزشکی هم‌زمان بررسی شده‌اند.',
  },
  publishedSource: {
    label: 'منبع مکتوب معتبر',
    description: 'روایت برگرفته از مقاله علمی، کتاب یا منبع پژوهشی موثق است.',
  },
}

export interface DocumentationBadgeProps {
  method: string
  showDescription?: boolean
}

export const DocumentationBadge: React.FC<DocumentationBadgeProps> = ({ method, showDescription = false }) => {
  const methodInfo = METHOD_LABELS[method as DocumentationMethodType] || {
    label: 'گزارش ارسالی',
    description: 'روایت ثبت‌شده در آرشیو.',
  }

  return (
    <div className="inline-flex items-center gap-1.5" title={methodInfo.description}>
      <Badge variant="primary" className="text-[11px] py-0.5 px-2 font-medium">
        روش مستندسازی: {methodInfo.label}
      </Badge>
    </div>
  )
}
