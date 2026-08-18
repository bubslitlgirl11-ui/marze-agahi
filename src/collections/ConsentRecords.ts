import type { CollectionConfig } from 'payload'
import { isReviewerOrAbove } from '@/lib/access'

export const ConsentRecords: CollectionConfig = {
  slug: 'consent-records',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'consentVersion', 'status', 'signedAt'],
    group: 'اسناد رضایت و حقوقی',
  },
  access: {
    read: isReviewerOrAbove,
    create: () => false,
    update: ({ req }) => Boolean(req.user?.role === 'superAdmin' || req.user?.capabilities?.canManageConsent),
    delete: () => false,
  },
  fields: [
    {
      name: 'consentVersion',
      type: 'text',
      label: 'نسخه متن رضایت‌نامه',
      required: true,
    },
    {
      name: 'consentTextHash',
      type: 'text',
      label: 'هش متن رضایت‌نامه امضاشده (SHA-256)',
      required: true,
    },
    {
      name: 'locale',
      type: 'text',
      label: 'زبان رضایت‌نامه',
      defaultValue: 'fa',
    },
    {
      name: 'consentToProcess',
      type: 'checkbox',
      label: 'رضایت به پردازش اطلاعات برای بررسی پرونده (الزامی)',
      required: true,
    },
    {
      name: 'consentToContact',
      type: 'checkbox',
      label: 'رضایت به تماس جهت مصاحبه یا تکمیل اطلاعات',
      defaultValue: false,
    },
    {
      name: 'consentToPublishAnonymously',
      type: 'checkbox',
      label: 'رضایت به انتشار عمومی متن روایت به صورت ناشناس یا با نام مستعار',
      defaultValue: false,
    },
    {
      name: 'consentToPublishName',
      type: 'checkbox',
      label: 'رضایت صریح به انتشار نام واقعی',
      defaultValue: false,
    },
    {
      name: 'consentToResearchUseDeidentified',
      type: 'checkbox',
      label: 'رضایت به استفاده پژوهشی و آماری از داده‌های ناشناس‌سازی‌شده',
      defaultValue: false,
    },
    {
      name: 'consentToMediaUse',
      type: 'checkbox',
      label: 'رضایت به انتشار فایل‌های رسانه‌ای پیوست',
      defaultValue: false,
    },
    {
      name: 'signedAt',
      type: 'date',
      label: 'تاریخ و زمان ثبت رضایت (UTC)',
      required: true,
    },
    {
      name: 'ipHash',
      type: 'text',
      label: 'هش آی‌پی زمان ثبت',
    },
    {
      name: 'userAgentCategory',
      type: 'text',
      label: 'نوع مرورگر/دستگاه (حداقلی)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت رضایت‌نامه',
      defaultValue: 'active',
      options: [
        { label: 'معتبر و فعال (Active)', value: 'active' },
        { label: 'لغو جزئی (Partially Withdrawn)', value: 'partiallyWithdrawn' },
        { label: 'لغو کامل (Withdrawn)', value: 'withdrawn' },
      ],
    },
    {
      name: 'withdrawnAt',
      type: 'date',
      label: 'زمان لغو رضایت',
    },
    {
      name: 'withdrawalScope',
      type: 'textarea',
      label: 'دامنه لغو رضایت',
    },
  ],
}
