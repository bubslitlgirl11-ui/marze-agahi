import type { CollectionConfig } from 'payload'
import { isReviewerOrAbove } from '@/lib/access'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'createdAt'],
    group: 'پیام‌های کاربران',
  },
  access: {
    read: isReviewerOrAbove,
    create: () => false, // Created through secure custom contact endpoint
    update: isReviewerOrAbove,
    delete: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      label: 'موضوع پیام',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'متن پیام',
      required: true,
    },
    {
      name: 'encryptedSenderName',
      type: 'text',
      label: 'نام فرستنده (رمزنگاری‌شده)',
    },
    {
      name: 'encryptedSenderContact',
      type: 'text',
      label: 'اطلاعات تماس فرستنده (ایمیل/تلفن رمزنگاری‌شده)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت پیام',
      defaultValue: 'received',
      options: [
        { label: 'دریافت‌شده (Received)', value: 'received' },
        { label: 'پاسخ‌داده‌شده (Replied)', value: 'replied' },
        { label: 'بسته‌شده (Closed)', value: 'closed' },
        { label: 'اسپم (Spam)', value: 'spam' },
      ],
    },
    {
      name: 'ipHash',
      type: 'text',
      label: 'هش آی‌پی فرستنده',
    },
  ],
}
