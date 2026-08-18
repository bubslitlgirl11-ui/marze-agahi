import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '@/lib/access'

export const ScientificSources: CollectionConfig = {
  slug: 'scientific-sources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'authors', 'year', 'sourceType', 'doi'],
    group: 'منابع و مقالات علمی',
  },
  access: {
    read: () => true, // Publicly readable
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
  },
  fields: [
    {
      name: 'sourceType',
      type: 'select',
      label: 'نوع مرجع',
      required: true,
      defaultValue: 'journalArticle',
      options: [
        { label: 'مقاله مجله داوری‌شده (Journal Article)', value: 'journalArticle' },
        { label: 'کتاب دانشگاهی (Book)', value: 'book' },
        { label: 'فصلی از کتاب (Book Chapter)', value: 'chapter' },
        { label: 'گزارش رسمی / فنی (Report)', value: 'report' },
        { label: 'پایان‌نامه / رساله (Thesis)', value: 'thesis' },
        { label: 'مجموعه داده (Dataset)', value: 'dataset' },
        { label: 'وب‌سایت مرجع (Website)', value: 'website' },
        { label: 'سایر (Other)', value: 'other' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'عنوان اثر / مقاله',
      required: true,
    },
    {
      name: 'authors',
      type: 'text',
      label: 'نام نویسندگان (به ترتیب رسمی)',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      label: 'سال انتشار',
      required: true,
    },
    {
      name: 'journalOrPublisher',
      type: 'text',
      label: 'نام مجله علمی یا ناشر',
    },
    {
      name: 'volume',
      type: 'text',
      label: 'دوره (Volume)',
    },
    {
      name: 'issue',
      type: 'text',
      label: 'شماره (Issue)',
    },
    {
      name: 'pages',
      type: 'text',
      label: 'صفحات (Pages)',
    },
    {
      name: 'doi',
      type: 'text',
      label: 'شناسه دیجیتال رسمی (DOI)',
    },
    {
      name: 'pmid',
      type: 'text',
      label: 'شناسه پاب‌مد (PMID)',
    },
    {
      name: 'url',
      type: 'text',
      label: 'پیوند وب به مقاله اصلی',
    },
    {
      name: 'peerReviewStatus',
      type: 'select',
      label: 'وضعیت داوری علمی همتا (Peer Review)',
      defaultValue: 'yes',
      options: [
        { label: 'داوری‌شده (Peer-Reviewed)', value: 'yes' },
        { label: 'بدون داوری (Preprint / Non-reviewed)', value: 'no' },
        { label: 'نامشخص (Unknown)', value: 'unknown' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'توضیحات و نکات تحریریه درباره منبع',
    },
    {
      name: 'verifiedByEditor',
      type: 'checkbox',
      label: 'تأیید اصالت مشخصات توسط تحریریه',
      defaultValue: true,
    },
  ],
}
