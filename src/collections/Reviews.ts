import type { CollectionConfig } from 'payload'
import { isReviewerOrAbove } from '@/lib/access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['submission', 'reviewer', 'status', 'createdAt'],
    group: 'پرونده‌های دریافتی',
  },
  access: {
    read: isReviewerOrAbove,
    create: isReviewerOrAbove,
    update: isReviewerOrAbove,
    delete: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
  },
  fields: [
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'submissions',
      label: 'پرونده مربوطه',
      required: true,
    },
    {
      name: 'reviewer',
      type: 'relationship',
      relationTo: 'users',
      label: 'داور / بازبین',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت بررسی',
      defaultValue: 'pending',
      options: [
        { label: 'در انتظار (Pending)', value: 'pending' },
        { label: 'در حال بررسی (In Progress)', value: 'inProgress' },
        { label: 'نیازمند اطلاعات تکمیلی (Needs More Info)', value: 'needsMoreInfo' },
        { label: 'تأییدشده برای انتشار (Approved)', value: 'approved' },
        { label: 'ردشده (Rejected)', value: 'rejected' },
      ],
    },
    {
      name: 'checklist',
      type: 'group',
      label: 'چک‌لیست الزامی ارزیابی',
      fields: [
        {
          name: 'validConsent',
          type: 'checkbox',
          label: '۱. رضایت‌نامه معتبر و بدون ابهام بررسی شد.',
          defaultValue: false,
        },
        {
          name: 'anonymizationDone',
          type: 'checkbox',
          label: '۲. ناشناس‌سازی دقیق انجام شد و اسامی/اماکن حساس حذف شدند.',
          defaultValue: false,
        },
        {
          name: 'claimsSeparatedFromNarrative',
          type: 'checkbox',
          label: '۳. ادعاهای پزشکی/فراشناختی از اصل روایت شخصی تفکیک شدند.',
          defaultValue: false,
        },
        {
          name: 'sourcesOrWitnessesAccuratelyDescribed',
          type: 'checkbox',
          label: '۴. وضعیت شواهد و مدارک به درستی و بدون غلو توصیف شده است.',
          defaultValue: false,
        },
        {
          name: 'mediaRightsCleared',
          type: 'checkbox',
          label: '۵. فایل‌های رسانه حق انتشار دارند و فاقد اطلاعات محرمانه هستند.',
          defaultValue: false,
        },
        {
          name: 'respectfulTone',
          type: 'checkbox',
          label: '۶. متن دارای لحن محترمانه، خنثی و غیرتحریک‌آمیز است.',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'conflictOfInterestDeclared',
      type: 'checkbox',
      label: 'عدم وجود تعارض منافع (Conflict of Interest)',
      defaultValue: false,
    },
    {
      name: 'privacyRisk',
      type: 'select',
      label: 'سطح ریسک حریم خصوصی',
      defaultValue: 'low',
      options: [
        { label: 'پایین (Low)', value: 'low' },
        { label: 'متوسط (Medium)', value: 'medium' },
        { label: 'بالا (High)', value: 'high' },
      ],
    },
    {
      name: 'decisionReason',
      type: 'textarea',
      label: 'دلایل تصمیم تحریریه / یادداشت نهایی داور',
    },
    {
      name: 'privateNotes',
      type: 'textarea',
      label: 'یادداشت‌های محرمانه داخلی داوران',
    },
  ],
}
