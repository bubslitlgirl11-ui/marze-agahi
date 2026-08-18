import type { GlobalConfig } from 'payload'
import { isSuperAdmin } from '@/lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'تنظیمات سراسری',
  },
  access: {
    read: () => true, // Publicly readable for site header/footer/metadata
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'نام سامانه',
      defaultValue: 'مرز آگاهی',
      required: true,
    },
    {
      name: 'siteSubtitle',
      type: 'text',
      label: 'زیرعنوان سامانه',
      defaultValue: 'آرشیو مستقل تجربه‌های نزدیک به مرگ و تجربه‌های مرزی آگاهی',
      required: true,
    },
    {
      name: 'siteUrl',
      type: 'text',
      label: 'دامنه رسمی سایت',
      defaultValue: 'https://neadrdeath.ir',
      required: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'توضیحات کلی برای سئو و موتورهای جستجو',
      defaultValue: 'پلتفرم جامع و مستقل برای ثبت، روایت، بررسی و مستندسازی پژوهشی تجربه‌های نزدیک به مرگ (NDE) و الگوهای مشترک آگاهی.',
    },
    {
      name: 'medicalDisclaimer',
      type: 'textarea',
      label: 'متن هشدار عدم جایگزینی با مشاوره پزشکی و روان‌شناختی',
      defaultValue: 'توجه: این پایگاه یک آرشیو مستقل پژوهشی و روایی است و اطلاعات ارائه‌شده در آن جایگزین خدمات تخصصی روان‌پزشکی، روان‌درمانی، پزشکی یا اورژانس نیست.',
    },
    {
      name: 'featureFlags',
      type: 'group',
      label: 'تنظیمات قابلیت‌ها (Feature Flags)',
      fields: [
        {
          name: 'submissionsOpen',
          type: 'checkbox',
          label: 'فرم ثبت تجربه باز و فعال است',
          defaultValue: true,
        },
        {
          name: 'videoPlaybackEnabled',
          type: 'checkbox',
          label: 'پخش ویدئوها فعال است',
          defaultValue: true,
        },
        {
          name: 'analyticsEnabled',
          type: 'checkbox',
          label: 'تحلیل آماری ناشناس فعال است',
          defaultValue: false,
        },
      ],
    },
  ],
}
