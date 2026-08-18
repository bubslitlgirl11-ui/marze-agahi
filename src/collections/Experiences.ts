import type { CollectionConfig } from 'payload'
import { isEditorOrAbove, publishedOnlyAccess } from '@/lib/access'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'experienceType', 'anonymityLevel', 'editorialStage', 'publishedAt'],
    group: 'آرشیو تجارب',
  },
  access: {
    read: publishedOnlyAccess,
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'publicId',
      type: 'text',
      label: 'شناسه عمومی یکتا (Public UUID)',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'عنوان تجربه',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (Slug URL)',
      required: true,
      unique: true,
    },
    {
      name: 'experienceType',
      type: 'relationship',
      relationTo: 'experience-types',
      label: 'نوع تجربه',
      required: true,
    },
    {
      name: 'anonymityLevel',
      type: 'select',
      label: 'سطح انتشار نام راوی',
      defaultValue: 'anonymous',
      options: [
        { label: 'کاملاً ناشناس', value: 'anonymous' },
        { label: 'نام مستعار (Alias)', value: 'alias' },
        { label: 'نام واقعی با رضایت صریح', value: 'named' },
      ],
    },
    {
      name: 'publicAlias',
      type: 'text',
      label: 'نام یا نام مستعار عمومی',
    },
    {
      name: 'editorialSummary',
      type: 'textarea',
      label: 'خلاصه تحریریه (بی‌طرف و غیرارزشی)',
      required: true,
    },
    {
      name: 'publicNarrative',
      type: 'richText',
      label: 'متن ویرایش‌شده و ناشناس‌سازی‌شده روایت',
      required: true,
    },
    {
      name: 'occurrenceDatePrecision',
      type: 'select',
      label: 'دقت تاریخ وقوع',
      defaultValue: 'approximate',
      options: [
        { label: 'روز و ماه دقیق', value: 'exact' },
        { label: 'ماه و سال', value: 'month' },
        { label: 'سال تقریبی', value: 'year' },
        { label: 'بازه تقریبی', value: 'approximate' },
        { label: 'نامشخص', value: 'unknown' },
      ],
    },
    {
      name: 'occurrenceYear',
      type: 'text',
      label: 'سال تقریبی وقوع',
    },
    {
      name: 'ageAtOccurrenceRange',
      type: 'text',
      label: 'بازه سنی راوی هنگام تجربه',
    },
    {
      name: 'country',
      type: 'text',
      label: 'کشور محل وقوع',
      defaultValue: 'ایران',
    },
    {
      name: 'regionPublic',
      type: 'text',
      label: 'منطقه عمومی (در صورت رضایت)',
    },
    {
      name: 'generalContext',
      type: 'textarea',
      label: 'زمینه کلی رخداد (پزشکی، حادثه، بیهوشی و غیره)',
    },
    {
      name: 'patterns',
      type: 'relationship',
      relationTo: 'patterns',
      hasMany: true,
      label: 'الگوهای شناسایی‌شده در روایت',
    },
    {
      name: 'aftereffects',
      type: 'richText',
      label: 'پیامدها و دگرگونی‌های پس از تجربه',
    },
    {
      name: 'documentationMethods',
      type: 'select',
      hasMany: true,
      label: 'روش‌های مستندسازی (غیرارزشی)',
      options: [
        { label: 'گزارش مستقیم راوی (Self-Report)', value: 'selfReport' },
        { label: 'مصاحبه ساختاریافته تحریریه (Structured Interview)', value: 'structuredInterview' },
        { label: 'روایت هم‌راستا با گزارش شاهدان عینی (Witness Corroborated)', value: 'witnessCompared' },
        { label: 'بررسی مدارک و مستندات هم‌زمان (Records Reviewed)', value: 'recordsReviewed' },
        { label: 'منبع مکتوب یا پژوهشی منتشرشده (Published Source)', value: 'publishedSource' },
      ],
    },
    {
      name: 'documentationNote',
      type: 'textarea',
      label: 'توضیحات روش مستندسازی و حدود شواهد',
    },
    {
      name: 'mediaAssets',
      type: 'relationship',
      relationTo: 'media-assets',
      hasMany: true,
      label: 'رسانه‌ها و پیوست‌های چندرسانه‌ای',
    },
    {
      name: 'scientificSources',
      type: 'relationship',
      relationTo: 'scientific-sources',
      hasMany: true,
      label: 'منابع و مراجع علمی مرتبط',
    },
    {
      name: 'relatedExperiences',
      type: 'relationship',
      relationTo: 'experiences',
      hasMany: true,
      label: 'تجربه‌های مرتبط در آرشیو',
    },
    {
      name: 'sourceSubmission',
      type: 'relationship',
      relationTo: 'submissions',
      label: 'پرونده مبدأ (کاملاً محرمانه)',
      access: {
        read: ({ req }) => Boolean(req.user?.role === 'superAdmin' || req.user?.role === 'editor'),
      },
    },
    {
      name: 'editorialStage',
      type: 'select',
      label: 'مرحله تحریریه',
      defaultValue: 'draft',
      options: [
        { label: 'پیش‌نویس (Draft)', value: 'draft' },
        { label: 'بررسی واقعیت‌ها (Fact Check)', value: 'factCheck' },
        { label: 'بررسی حریم خصوصی و رضایت (Privacy Review)', value: 'privacyReview' },
        { label: 'آماده انتشار (Ready)', value: 'ready' },
        { label: 'منتشرشده (Published)', value: 'published' },
        { label: 'بایگانی‌شده (Archived)', value: 'archived' },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'نمایش در بخش تجربه‌های منتخب صفحه اصلی',
      defaultValue: false,
    },
    {
      name: 'contentWarning',
      type: 'text',
      label: 'هشدار محتوا (در صورت وجود مضامین دشوار یا اضطراب‌آور)',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'تاریخ انتشار عمومی',
    },
  ],
}
