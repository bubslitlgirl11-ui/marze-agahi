import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'status'],
    group: 'مدیریت کاربران',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isSuperAdmin,
    update: ({ req, id }) => {
      if (!req.user) return false
      // superAdmin can update any user, others can only update their own profile
      if (req.user.role === 'superAdmin') return true
      return req.user.id === id
    },
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام و نام خانوادگی',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'نقش کاربری',
      required: true,
      defaultValue: 'reviewer',
      options: [
        { label: 'مدیر ارشد (Super Admin)', value: 'superAdmin' },
        { label: 'سردبیر (Editor)', value: 'editor' },
        { label: 'بازبین / داور (Reviewer)', value: 'reviewer' },
        { label: 'پژوهشگر (Researcher)', value: 'researcher' },
      ],
      access: {
        update: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت حساب',
      defaultValue: 'active',
      options: [
        { label: 'فعال', value: 'active' },
        { label: 'معلق‌شده', value: 'suspended' },
      ],
      access: {
        update: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
      },
    },
    {
      name: 'capabilities',
      type: 'group',
      label: 'دسترسی‌های ویژه و حساس',
      access: {
        read: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
        update: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
      },
      fields: [
        {
          name: 'canRevealPII',
          type: 'checkbox',
          label: 'مشاهده اطلاعات تماس و هویت راوی (Reveal PII)',
          defaultValue: false,
        },
        {
          name: 'canManageConsent',
          type: 'checkbox',
          label: 'مدیریت و لغو رضایت‌نامه‌ها',
          defaultValue: false,
        },
        {
          name: 'canPublish',
          type: 'checkbox',
          label: 'انتشار رسمی تجربه در سایت عمومی',
          defaultValue: false,
        },
        {
          name: 'canManageUsers',
          type: 'checkbox',
          label: 'مدیریت کاربران و نقش‌ها',
          defaultValue: false,
        },
        {
          name: 'canExportSensitiveData',
          type: 'checkbox',
          label: 'خروجی‌گیری از داده‌های حساس',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      label: 'آخرین ورود',
      admin: {
        readOnly: true,
      },
    },
  ],
}
