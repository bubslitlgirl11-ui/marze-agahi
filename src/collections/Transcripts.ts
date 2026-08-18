import type { CollectionConfig } from 'payload'
import { isReviewerOrAbove } from '@/lib/access'

export const Transcripts: CollectionConfig = {
  slug: 'transcripts',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'language', 'humanReviewed', 'reviewedAt'],
    group: 'مدیریت چندرسانه‌ای',
  },
  access: {
    read: () => true, // Publicly readable when linked to public MediaAsset
    create: isReviewerOrAbove,
    update: isReviewerOrAbove,
    delete: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      label: 'زبان رونوشت',
      defaultValue: 'fa',
      options: [
        { label: 'فارسی', value: 'fa' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'fullText',
      type: 'textarea',
      label: 'متن کامل پیوسته',
      required: true,
    },
    {
      name: 'segments',
      type: 'json',
      label: 'قطعات زمان‌بندی‌شده [{startMs, endMs, text, speaker?}]',
      required: true,
    },
    {
      name: 'chapters',
      type: 'json',
      label: 'فصل‌بندی زمانی [{startMs, title}]',
    },
    {
      name: 'vttStorageKey',
      type: 'text',
      label: 'کلید فایل VTT در مخزن ذخیره‌سازی',
    },
    {
      name: 'source',
      type: 'select',
      label: 'منبع تولید رونوشت',
      defaultValue: 'manual',
      options: [
        { label: 'تایپ دستی / بازشنوایی دقیق (Manual)', value: 'manual' },
        { label: 'واردشده از فایل زیرنویس (Imported)', value: 'imported' },
        { label: 'پیش‌نویس خودکار (Automatic Draft)', value: 'automaticDraft' },
      ],
    },
    {
      name: 'humanReviewed',
      type: 'checkbox',
      label: 'بازبینی‌شده و تأییدشده توسط انسان (Human Reviewed)',
      defaultValue: false,
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'بازبین مسئول',
    },
    {
      name: 'reviewedAt',
      type: 'date',
      label: 'تاریخ بازبینی نهایی',
    },
  ],
}
