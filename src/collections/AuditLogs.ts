import type { CollectionConfig } from 'payload'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['action', 'actor', 'entityType', 'entityId', 'createdAt'],
    group: 'حسابرسی و امنیت',
  },
  access: {
    read: ({ req }) => Boolean(req.user?.role === 'superAdmin'),
    create: () => false, // Only created via internal server functions
    update: () => false, // Immutable
    delete: () => false, // Immutable
  },
  fields: [
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      label: 'کاربر انجام‌دهنده عملیات',
      required: true,
    },
    {
      name: 'action',
      type: 'select',
      label: 'نوع عملیات حساس',
      required: true,
      options: [
        { label: 'مشاهده اطلاعات تماس و PII (revealPII)', value: 'revealPII' },
        { label: 'تغییر وضعیت رضایت‌نامه (consentUpdate)', value: 'consentUpdate' },
        { label: 'انتشار عمومی تجربه (publish)', value: 'publish' },
        { label: 'خروج از انتشار (unpublish)', value: 'unpublish' },
        { label: 'خروجی‌گیری داده حساس (sensitiveExport)', value: 'sensitiveExport' },
        { label: 'تغییر نقش یا دسترسی کاربر (roleChange)', value: 'roleChange' },
        { label: 'تولید پیوند رسانه خصوصی (generatePrivateMediaUrl)', value: 'generatePrivateMediaUrl' },
        { label: 'لغو و پس‌گیری پرونده توسط راوی (withdrawal)', value: 'withdrawal' },
      ],
    },
    {
      name: 'entityType',
      type: 'text',
      label: 'نوع موجودیت',
      required: true,
    },
    {
      name: 'entityId',
      type: 'text',
      label: 'شناسه موجودیت',
      required: true,
    },
    {
      name: 'safeDiff',
      type: 'json',
      label: 'خلاصه امن تغییرات (بدون PII و رمزها)',
    },
    {
      name: 'reason',
      type: 'text',
      label: 'دلیل انجام عملیات حساس',
    },
    {
      name: 'ipHash',
      type: 'text',
      label: 'هش آی‌پی مجری',
    },
  ],
}
