import type { CollectionConfig } from 'payload'
import { isEditorOrAbove, publishedOnlyAccess } from '@/lib/access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
    group: 'منابع و مقالات علمی',
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
      name: 'title',
      type: 'text',
      label: 'عنوان مقاله',
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
      name: 'excerpt',
      type: 'textarea',
      label: 'چکیده و خلاصه مقاله',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      label: 'متن کامل مقاله',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'دسته‌بندی موضوعی',
      defaultValue: 'research',
      options: [
        { label: 'پژوهش و تحلیل علمی (Research)', value: 'research' },
        { label: 'روششناسی و متدولوژی (Methodology)', value: 'methodology' },
        { label: 'تلفیق و بررسی تطبیقی (Integration)', value: 'integration' },
        { label: 'سرمقاله و یادداشت اخلاقی (Editorial)', value: 'editorial' },
      ],
    },
    {
      name: 'author',
      type: 'text',
      label: 'نویسنده / پژوهشگر',
      required: true,
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'داور علمی مقاله',
    },
    {
      name: 'scientificSources',
      type: 'relationship',
      relationTo: 'scientific-sources',
      hasMany: true,
      label: 'منابع و ارجاعات علمی مقاله',
    },
    {
      name: 'relatedPatterns',
      type: 'relationship',
      relationTo: 'patterns',
      hasMany: true,
      label: 'الگوهای مرتبط',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'مقاله ویژه صفحه اصلی',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'تاریخ انتشار',
    },
  ],
}
