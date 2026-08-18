import type { CollectionConfig } from 'payload'
import { isReviewerOrAbove, publishedOnlyAccess } from '@/lib/access'

export const MediaAssets: CollectionConfig = {
  slug: 'media-assets',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'visibility', 'processingStatus', 'publishedAt'],
    group: 'مدیریت چندرسانه‌ای',
  },
  access: {
    read: ({ req }) => {
      if (req.user && req.user.status !== 'suspended') return true
      return {
        visibility: {
          equals: 'public',
        },
        processingStatus: {
          equals: 'ready',
        },
      }
    },
    create: isReviewerOrAbove,
    update: isReviewerOrAbove,
    delete: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
  },
  fields: [
    {
      name: 'publicId',
      type: 'text',
      label: 'شناسه یکتا (Public UUID)',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'نوع رسانه',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'تصویر (Image)', value: 'image' },
        { label: 'ویدئو (Video)', value: 'video' },
        { label: 'صوت (Audio)', value: 'audio' },
        { label: 'سند عمومی (Document PDF)', value: 'document' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'عنوان رسانه',
      required: true,
    },
    {
      name: 'altText',
      type: 'text',
      label: 'متن جایگزین (Alt Text برای دسترس‌پذیری)',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'توضیح زیرنویس رسانه (Caption)',
    },
    {
      name: 'visibility',
      type: 'select',
      label: 'سطح دسترسی و مشاهده',
      defaultValue: 'quarantine',
      options: [
        { label: 'عمومی (Public)', value: 'public' },
        { label: 'خصوصی (Private)', value: 'private' },
        { label: 'قرنطینه / بررسی‌نشده (Quarantine)', value: 'quarantine' },
      ],
    },
    {
      name: 'provider',
      type: 'select',
      label: 'سرویس‌دهنده ذخیره‌سازی/پخش',
      defaultValue: 'r2',
      options: [
        { label: 'Cloudflare R2', value: 'r2' },
        { label: 'Cloudflare Stream', value: 'cloudflareStream' },
        { label: 'Local Mock', value: 'localMock' },
      ],
    },
    {
      name: 'originalStorageKey',
      type: 'text',
      label: 'کلید فایل اصلی در مخزن (Storage Key)',
    },
    {
      name: 'publicStorageKey',
      type: 'text',
      label: 'کلید فایل عمومی در CDN',
    },
    {
      name: 'streamUid',
      type: 'text',
      label: 'شناسه ویدئو در Cloudflare Stream (UID)',
    },
    {
      name: 'processingStatus',
      type: 'select',
      label: 'وضعیت پردازش و تبدیل',
      defaultValue: 'pending',
      options: [
        { label: 'در انتظار (Pending)', value: 'pending' },
        { label: 'در حال آپلود (Uploading)', value: 'uploading' },
        { label: 'آپلود شده (Uploaded)', value: 'uploaded' },
        { label: 'در حال ترنسکدینگ (Processing)', value: 'processing' },
        { label: 'آماده پخش (Ready)', value: 'ready' },
        { label: 'مسدود شده (Blocked)', value: 'blocked' },
        { label: 'خطا در پردازش (Failed)', value: 'failed' },
      ],
    },
    {
      name: 'mimeType',
      type: 'text',
      label: 'نوع فرمت MIME',
    },
    {
      name: 'fileSize',
      type: 'number',
      label: 'حجم فایل (بایت)',
    },
    {
      name: 'durationSeconds',
      type: 'number',
      label: 'طول مدت (ثانیه)',
    },
    {
      name: 'width',
      type: 'number',
      label: 'عرض (پیکسل)',
    },
    {
      name: 'height',
      type: 'number',
      label: 'ارتفاع (پیکسل)',
    },
    {
      name: 'sha256',
      type: 'text',
      label: 'چک‌سام SHA-256 فایل اصلی',
    },
    {
      name: 'posterKey',
      type: 'text',
      label: 'کلید تصویر پیش‌نمایش (Poster)',
    },
    {
      name: 'transcript',
      type: 'relationship',
      relationTo: 'transcripts',
      label: 'رونوشت متنی همگام',
    },
    {
      name: 'downloadAllowed',
      type: 'checkbox',
      label: 'مجوز دانلود مستقیم توسط کاربر عمومی',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'تاریخ انتشار عمومی',
    },
  ],
}
