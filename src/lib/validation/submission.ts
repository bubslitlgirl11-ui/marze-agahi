/**
 * Submission Validation Schemas using Zod
 * Enforces strict validation across all 7 steps of experience submission.
 */

import { z } from 'zod'

export const SubmissionStep1Schema = z.object({
  ageConfirmed18Plus: z.literal(true, {
    errorMap: () => ({ message: 'تأیید سن قانونی (۱۸ سال یا بیشتر) برای ثبت تجربه الزامی است.' }),
  }),
  privacyUnderstood: z.literal(true, {
    errorMap: () => ({ message: 'لطفاً شرایط حریم خصوصی و نحوه بررسی را تأیید کنید.' }),
  }),
})

export const SubmissionStep2Schema = z.object({
  experienceTypeCandidate: z.string().min(1, 'انتخاب نوع احتمالی تجربه الزامی است.'),
  country: z.string().default('ایران'),
  occurrenceApproximation: z.string().min(2, 'لطفاً زمان تقریبی وقوع تجربه را وارد کنید.'),
  ageAtOccurrence: z.string().optional(),
  generalContext: z.string().max(1000, 'توضیحات زمینه نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.').optional(),
})

export const SubmissionStep3Schema = z.object({
  rawNarrative: z
    .string()
    .min(50, 'روایت تجربه باید حداقل ۵۰ کاراکتر داشته باشد تا قابل بررسی علمی باشد.')
    .max(50000, 'طول روایت از حد مجاز فراتر رفته است.'),
})

export const SubmissionStep4Schema = z.object({
  selectedPatterns: z.array(z.string()).optional().default([]),
  aftereffectsRaw: z.string().max(5000).optional(),
  witnessAvailable: z.boolean().default(false),
  documentsAvailable: z.boolean().default(false),
  mediaAvailable: z.boolean().default(false),
})

export const SubmissionStep5Schema = z.object({
  hasPhysicalDocumentsOrMedia: z.boolean().default(false),
  mediaDescription: z.string().max(1000).optional(),
})

export const SubmissionStep6Schema = z.object({
  preferredAnonymity: z.enum(['anonymous', 'alias', 'named']).default('anonymous'),
  realName: z.string().max(150).optional(),
  publicAlias: z.string().max(100).optional(),
  email: z.string().email('فرمت ایمیل نامعتبر است.').optional().or(z.literal('')),
  phone: z.string().max(30).optional().or(z.literal('')),
  preferredContactMethod: z.enum(['email', 'phone', 'none']).default('none'),
})

export const SubmissionStep7ConsentSchema = z.object({
  consentToProcess: z.literal(true, {
    errorMap: () => ({ message: 'رضایت برای پردازش و بررسی اطلاعات پرونده الزامی است.' }),
  }),
  consentToContact: z.boolean().default(false),
  consentToPublishAnonymously: z.boolean().default(false),
  consentToPublishName: z.boolean().default(false),
  consentToResearchUseDeidentified: z.boolean().default(false),
  consentToMediaUse: z.boolean().default(false),
})

export const CompleteSubmissionSchema = z.object({
  // Step 1
  ageConfirmed18Plus: z.literal(true),
  // Step 2
  experienceTypeCandidate: z.string().min(1),
  country: z.string().default('ایران'),
  occurrenceApproximation: z.string().min(2),
  ageAtOccurrence: z.string().optional(),
  generalContext: z.string().optional(),
  // Step 3
  rawNarrative: z.string().min(50).max(50000),
  // Step 4
  selectedPatterns: z.array(z.string()).optional().default([]),
  aftereffectsRaw: z.string().optional(),
  witnessAvailable: z.boolean().default(false),
  documentsAvailable: z.boolean().default(false),
  mediaAvailable: z.boolean().default(false),
  // Step 5
  hasPhysicalDocumentsOrMedia: z.boolean().default(false),
  mediaDescription: z.string().optional(),
  // Step 6
  preferredAnonymity: z.enum(['anonymous', 'alias', 'named']).default('anonymous'),
  realName: z.string().optional(),
  publicAlias: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  preferredContactMethod: z.enum(['email', 'phone', 'none']).default('none'),
  // Step 7
  consentToProcess: z.literal(true),
  consentToContact: z.boolean().default(false),
  consentToPublishAnonymously: z.boolean().default(false),
  consentToPublishName: z.boolean().default(false),
  consentToResearchUseDeidentified: z.boolean().default(false),
  consentToMediaUse: z.boolean().default(false),
  // Bot protection & Honeypot
  honeypot: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
  turnstileToken: z.string().optional(),
})

export type CompleteSubmissionInput = z.infer<typeof CompleteSubmissionSchema>
