import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '@/lib/access'

export const Patterns: CollectionConfig = {
  slug: 'patterns',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'isActive'],
    group: 'تاکسونومی و طبقه‌بندی',
  },
  access: {
    read: () => true, // Publicly readable for research atlas
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان الگو (فارسی)',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'شناسه یکتا (Slug انگلیسی)',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'دسته‌بندی الگو',
      defaultValue: 'coreElement',
      options: [
        { label: 'عناصر ادراکی اصلی (Core Element)', value: 'coreElement' },
        { label: 'ادراکات فضایی-زمانی (Spatiotemporal)', value: 'spatiotemporal' },
        { label: 'مواجهات و ادراکات وجودی (Transcendental)', value: 'transcendental' },
        { label: 'پیامدها و تحولات پس از تجربه (Aftereffects)', value: 'aftereffects' },
      ],
    },
    {
      name: 'shortDefinition',
      type: 'textarea',
      label: 'تعریف خلاصه',
      required: true,
    },
    {
      name: 'definition',
      type: 'textarea',
      label: 'تعریف پژوهشی و ابعاد توصیفی',
    },
    {
      name: 'inclusionCriteria',
      type: 'textarea',
      label: 'معیارهای شمول (Inclusion Criteria)',
    },
    {
      name: 'exclusionCriteria',
      type: 'textarea',
      label: 'معیارهای عدم شمول (Exclusion Criteria)',
    },
    {
      name: 'editorialNotes',
      type: 'textarea',
      label: 'یادداشت‌های تحریریه و اخطارها',
    },
    {
      name: 'order',
      type: 'number',
      label: 'ترتیب نمایش',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'فعال در اطلس الگوها',
      defaultValue: true,
    },
  ],
}
