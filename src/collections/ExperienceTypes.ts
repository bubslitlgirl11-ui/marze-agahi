import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '@/lib/access'

export const ExperienceTypes: CollectionConfig = {
  slug: 'experience-types',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'isActive'],
    group: 'تاکسونومی و طبقه‌بندی',
  },
  access: {
    read: () => true, // Publicly readable for taxonomy/filters
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان نوع تجربه (فارسی)',
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
      name: 'shortTitle',
      type: 'text',
      label: 'عنوان کوتاه برای برچسب‌ها',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'توضیح علمی و دامنه پدیده',
    },
    {
      name: 'scopeNotes',
      type: 'textarea',
      label: 'یادداشت‌های دامنه و تمایز با سایر پدیده‌ها',
    },
    {
      name: 'language',
      type: 'select',
      label: 'زبان',
      defaultValue: 'fa',
      options: [
        { label: 'فارسی', value: 'fa' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'translationGroupId',
      type: 'text',
      label: 'شناسه گروه ترجمه',
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
      label: 'فعال برای انتخاب در فرم و فیلترها',
      defaultValue: true,
    },
  ],
}
