import type { CollectionConfig } from 'payload'
import { isReviewerOrAbove } from '@/lib/access'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'caseCode',
    defaultColumns: ['caseCode', 'status', 'preferredAnonymity', 'createdAt'],
    group: 'پرونده‌های دریافتی',
  },
  access: {
    read: isReviewerOrAbove,
    create: () => false, // Only created via custom validated endpoint
    update: isReviewerOrAbove,
    delete: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
  },
  fields: [
    {
      name: 'caseCode',
      type: 'text',
      label: 'کد پرونده (Case Code)',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'withdrawalTokenHash',
      type: 'text',
      label: 'هش توکن پس‌گیری (Withdrawal Token Hash)',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت پرونده',
      defaultValue: 'received',
      options: [
        { label: 'دریافت‌شده (Received)', value: 'received' },
        { label: 'تریاژ اولیه (Triage)', value: 'triage' },
        { label: 'درخواست تماس / تکمیل اطلاعات (Contact Requested)', value: 'contactRequested' },
        { label: 'در حال بررسی توسط داور (Under Review)', value: 'underReview' },
        { label: 'پذیرفته‌شده برای انتشار (Accepted)', value: 'accepted' },
        { label: 'ردشده (Declined)', value: 'declined' },
        { label: 'پس‌گرفته‌شده توسط راوی (Withdrawn)', value: 'withdrawn' },
        { label: 'اسپم / نامعتبر (Spam)', value: 'spam' },
      ],
    },
    {
      name: 'rawNarrative',
      type: 'textarea',
      label: 'متن خام روایت ارسالی راوی',
      required: true,
    },
    {
      name: 'experienceTypeCandidate',
      type: 'text',
      label: 'نوع احتمالی تجربه بر اساس فرم راوی',
    },
    {
      name: 'occurrenceApproximation',
      type: 'text',
      label: 'زمان تقریبی وقوع',
    },
    {
      name: 'country',
      type: 'text',
      label: 'کشور',
      defaultValue: 'ایران',
    },
    {
      name: 'generalContext',
      type: 'textarea',
      label: 'توضیحات زمینه وقوع',
    },
    {
      name: 'selectedPatterns',
      type: 'json',
      label: 'الگوهای انتخاب‌شده توسط راوی',
    },
    {
      name: 'aftereffectsRaw',
      type: 'textarea',
      label: 'پیامدهای اظهارشده توسط راوی',
    },
    {
      name: 'witnessAvailable',
      type: 'checkbox',
      label: 'شاهد عینی وجود دارد',
      defaultValue: false,
    },
    {
      name: 'documentsAvailable',
      type: 'checkbox',
      label: 'مدارک بالینی یا اسناد وجود دارد',
      defaultValue: false,
    },
    {
      name: 'mediaAvailable',
      type: 'checkbox',
      label: 'رسانه (صوت/تصویر) وجود دارد',
      defaultValue: false,
    },
    {
      name: 'preferredAnonymity',
      type: 'select',
      label: 'ترجیح راوی برای سطح انتشار نام',
      defaultValue: 'anonymous',
      options: [
        { label: 'کاملاً ناشناس', value: 'anonymous' },
        { label: 'نام مستعار', value: 'alias' },
        { label: 'نام واقعی', value: 'named' },
      ],
    },
    // Encrypted PII Fields
    {
      name: 'encryptedRealName',
      type: 'text',
      label: 'نام واقعی (رمزنگاری‌شده با AES-GCM)',
      admin: {
        description: 'این فیلد با کلید سرور رمزگذاری شده و متن خام آن در دیتابیس ذخیره نمی‌شود.',
      },
    },
    {
      name: 'encryptedEmail',
      type: 'text',
      label: 'ایمیل راوی (رمزنگاری‌شده)',
    },
    {
      name: 'encryptedPhone',
      type: 'text',
      label: 'شماره تماس (رمزنگاری‌شده)',
    },
    {
      name: 'publicAlias',
      type: 'text',
      label: 'نام مستعار اعلام‌شده',
    },
    {
      name: 'preferredContactMethod',
      type: 'select',
      label: 'روش تماس ترجیحی',
      defaultValue: 'none',
      options: [
        { label: 'ایمیل', value: 'email' },
        { label: 'تلفن', value: 'phone' },
        { label: 'بدون تماس', value: 'none' },
      ],
    },
    {
      name: 'ageConfirmed18Plus',
      type: 'checkbox',
      label: 'تأیید سن ۱۸ سال یا بیشتر',
      required: true,
    },
    {
      name: 'consentRecord',
      type: 'relationship',
      relationTo: 'consent-records',
      label: 'سند رضایت‌نامه رسمی',
    },
    {
      name: 'assignedReviewer',
      type: 'relationship',
      relationTo: 'users',
      label: 'داور / بازبین مسئول پرونده',
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'یادداشت‌های محرمانه تحریریه و داوران',
    },
    {
      name: 'convertedExperience',
      type: 'relationship',
      relationTo: 'experiences',
      label: 'تجربه عمومی منتشرشده از این پرونده',
    },
  ],
}
