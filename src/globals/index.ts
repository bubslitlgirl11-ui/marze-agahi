import type { GlobalConfig } from 'payload'
import { isSuperAdmin } from '@/lib/access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'تنظیمات سراسری',
  },
  access: {
    read: () => true,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'mainNav',
      type: 'array',
      label: 'پیوندهای ناوبری اصلی',
      defaultValue: [
        { label: 'صفحه اصلی', url: '/' },
        { label: 'آرشیو تجربه‌ها', url: '/experiences' },
        { label: 'اطلس الگوها', url: '/patterns' },
        { label: 'پژوهش و مقالات', url: '/research' },
        { label: 'روششناسی بررسی', url: '/methodology' },
        { label: 'منشور اخلاقی', url: '/ethics' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'عنوان پیوند',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'آدرس پیوند',
          required: true,
        },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'تنظیمات سراسری',
  },
  access: {
    read: () => true,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'copyrightText',
      type: 'text',
      label: 'متن کپی‌رایت',
      defaultValue: 'تمامی حقوق برای آرشیو مستقل مرز آگاهی محفوظ است.',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'پیوندهای حقوقی و خط‌مشی‌ها',
      defaultValue: [
        { label: 'حریم خصوصی', url: '/privacy' },
        { label: 'شرایط استفاده', url: '/terms' },
        { label: 'پس‌گیری رضایت راوی', url: '/withdraw' },
        { label: 'تماس با تحریریه', url: '/contact' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const SubmissionSettings: GlobalConfig = {
  slug: 'submission-settings',
  admin: {
    group: 'تنظیمات سراسری',
  },
  access: {
    read: () => true,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'isOpen',
      type: 'checkbox',
      label: 'دریافت تجربه‌های جدید فعال است',
      defaultValue: true,
    },
    {
      name: 'closedMessage',
      type: 'textarea',
      label: 'پیام هنگام بسته بودن موقت فرم دریافت',
      defaultValue: 'فرم دریافت تجربه‌ها به دلیل بررسی و اولویت‌بندی پرونده‌های جاری موقتاً بسته است.',
    },
    {
      name: 'currentConsentVersion',
      type: 'text',
      label: 'نسخه جاری متن رضایت‌نامه',
      defaultValue: 'v1.0-2026',
      required: true,
    },
    {
      name: 'maxImageUploadCount',
      type: 'number',
      label: 'حداکثر تعداد تصویر ارسالی',
      defaultValue: 3,
    },
    {
      name: 'maxImageSizeMB',
      type: 'number',
      label: 'حداکثر حجم هر تصویر (مگابایت)',
      defaultValue: 5,
    },
  ],
}

export const ResearchSettings: GlobalConfig = {
  slug: 'research-settings',
  admin: {
    group: 'تنظیمات سراسری',
  },
  access: {
    read: () => true,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'methodologyIntro',
      type: 'textarea',
      label: 'مقدمه روش‌شناسی بررسی تجارب',
      defaultValue: 'این پلتفرم شواهد را با روش‌های استاندارد روایی و مصاحبه مستندسازی می‌کند و هیچ‌گونه ادعای اثبات یا ارزش‌گذاری ماورایی انجام نمی‌دهد.',
    },
  ],
}
