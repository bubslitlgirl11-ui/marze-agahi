import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '@/lib/access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'صفحات و محتوای ثابت',
  },
  access: {
    read: () => true, // Publicly readable
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان صفحه',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (Slug)',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'محتوای صفحه',
      required: true,
    },
    {
      name: 'versionTag',
      type: 'text',
      label: 'نسخه سند حقوقی / اخلاقی (مانند v1.0)',
    },
    {
      name: 'effectiveDate',
      type: 'date',
      label: 'تاریخ لازم‌الاجرا شدن',
    },
    {
      name: 'reviewStatusNotice',
      type: 'text',
      label: 'پیام وضعیت بازبینی (مانند: نیازمند بازبینی حقوقی)',
    },
  ],
}
