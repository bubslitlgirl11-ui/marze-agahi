/**
 * Production Seed Script
 * Seeds only taxonomies, default settings, and policy pages.
 * Contains ZERO fake experiences or fake scientific citations.
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'

export const INITIAL_EXPERIENCE_TYPES = [
  {
    title: 'تجربه نزدیک به مرگ (Near-Death Experience)',
    slug: 'near-death-experience',
    shortTitle: 'تجربه نزدیک به مرگ',
    description: 'تجربه ادراکی عمیق و تحول‌آفرین که در شرایط تهدیدکننده حیات، ایست قلبی یا بحران‌های فیزیولوژیک رخ می‌دهد.',
    order: 1,
    isActive: true,
  },
  {
    title: 'تجربه خروج از بدن (Out-of-Body Experience)',
    slug: 'out-of-body-experience',
    shortTitle: 'خروج از بدن',
    description: 'احساس جدایی ادراک حسی از کالبد فیزیکی و مشاهده محیط از زاویه‌ای بیرون از بدن.',
    order: 2,
    isActive: true,
  },
  {
    title: 'تجربه مشترک مرگ (Shared-Death Experience)',
    slug: 'shared-death-experience',
    shortTitle: 'تجربه مشترک مرگ',
    description: 'ادراکات غیرمعمول و هم‌زمان اطرافیان یا مراقبان فرد در حال احتضار در لحظه انتقال.',
    order: 3,
    isActive: true,
  },
  {
    title: 'مشاهده یا رؤیای بستر مرگ (Deathbed Vision)',
    slug: 'deathbed-vision',
    shortTitle: 'رؤیای بستر مرگ',
    description: 'مشاهدات آرامش‌بخش، حضور درگذشتگان یا ادراکات نمادین در ساعات یا روزهای پایانی زندگی.',
    order: 4,
    isActive: true,
  },
  {
    title: 'تجربه عرفانی عمیق (Mystical Experience)',
    slug: 'mystical-experience',
    shortTitle: 'تجربه عرفانی',
    description: 'احساس وحدت بنیادین با هستی، انحلال مرزهای خود و درک حضور عشقی فراگیر بدون بحران زیستی.',
    order: 5,
    isActive: true,
  },
  {
    title: 'تجربه بیداری یا تحول آگاهی (Awakening Experience)',
    slug: 'awakening-experience',
    shortTitle: 'تحول آگاهی',
    description: 'دگرگونی ناگهانی یا تدریجی در شیوه ادراک واقعیت، کاهش اضطراب وجودی و تغییر ارزش‌های زیستی.',
    order: 6,
    isActive: true,
  },
  {
    title: 'سایر تجربه‌های استثنایی آگاهی (Exceptional Human Experience)',
    slug: 'exceptional-human-experience',
    shortTitle: 'سایر تجربه‌های استثنایی',
    description: 'رویدادهای ادراکی ویژه که در طبقه‌بندی‌های متعارف فوق قرار نمی‌گیرند.',
    order: 7,
    isActive: true,
  },
]

export const INITIAL_PATTERNS = [
  {
    title: 'احساس خروج از کالبد فیزیکی',
    slug: 'out-of-body-sensation',
    category: 'coreElement' as const,
    shortDefinition: 'ادراک جدا شدن از بدن فیزیکی و نگریستن به محیط از بالا یا نقطه دیدی خارج از کالبد.',
    order: 1,
  },
  {
    title: 'تغییر بنیادین در ادراک زمان',
    slug: 'altered-time-perception',
    category: 'spatiotemporal' as const,
    shortDefinition: 'احساس بی‌زمانی، کند شدن یا خارج شدن از جریان خطی زمان.',
    order: 2,
  },
  {
    title: 'گذر از تاریکی، تونل یا گذرگاه',
    slug: 'tunnel-or-passage',
    category: 'spatiotemporal' as const,
    shortDefinition: 'حرکت سریع یا آرام در فضایی تاریک، تونل‌مانند، خلأ یا مرزی به سوی افقی نورانی.',
    order: 3,
  },
  {
    title: 'مواجهه با نور یا حضور درخشان',
    slug: 'radiant-light-or-presence',
    category: 'transcendental' as const,
    shortDefinition: 'ادراک نوری بسیار پرفروغ و در عین حال نامتصاعد و آرامش‌بخش، توأم با شعور یا عشق فراگیر.',
    order: 4,
  },
  {
    title: 'ملاقات با درگذشتگان یا راهنمایان',
    slug: 'meeting-deceased-or-guides',
    category: 'transcendental' as const,
    shortDefinition: 'دیدار با خویشاوندان درگذشته، چهره‌های آشنا یا موجودات معنوی یاری‌رسان.',
    order: 5,
  },
  {
    title: 'مرور همه‌جانبه زندگی (Life Review)',
    slug: 'life-review',
    category: 'transcendental' as const,
    shortDefinition: 'بازبینی سریع، پانورامیک و همراه با درک اثرات اعمال و احساسات بر خود و دیگران.',
    order: 6,
  },
  {
    title: 'احساس آرامش عمیق، عشق و وحدت',
    slug: 'deep-peace-and-unity',
    category: 'coreElement' as const,
    shortDefinition: 'فقدان کامل درد و رنج جسمانی، تجربه شادی درونی و پیوند وجودی با کل جهان.',
    order: 7,
  },
  {
    title: 'تجربه دشوار، ناخوشایند یا اضطراب‌آور',
    slug: 'distressing-experience',
    category: 'coreElement' as const,
    shortDefinition: 'احساس سردرگمی، خلأ بی‌پایان، هراس از نابودی یا فضای اضطراب‌آور موقت.',
    order: 8,
  },
  {
    title: 'رسیدن به مرز یا نقطه بدون بازگشت',
    slug: 'border-or-point-of-no-return',
    category: 'spatiotemporal' as const,
    shortDefinition: 'مشاهده مانع، خط، پل، دره یا مرزی نمادین که عبور از آن به معنای عدم امکان بازگشت به زندگی است.',
    order: 9,
  },
  {
    title: 'پیامدهای روانی، اخلاقی و تغییر نگرش به مرگ',
    slug: 'aftereffects-and-values',
    category: 'aftereffects' as const,
    shortDefinition: 'کاهش شدید ترس از مرگ، تقویت حس نوع‌دوستی، تغییر در اولویت‌های زندگی و حساسیت‌های حسی.',
    order: 10,
  },
]

export async function seedProd() {
  console.log('[Seed:Prod] Starting production taxonomy seed...')
  const payload = await getPayload({ config })

  // Seed Experience Types
  for (const type of INITIAL_EXPERIENCE_TYPES) {
    const existing = await payload.find({
      collection: 'experience-types',
      where: { slug: { equals: type.slug } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'experience-types',
        data: type,
      })
      console.log(`Created ExperienceType: ${type.slug}`)
    }
  }

  // Seed Patterns
  for (const pattern of INITIAL_PATTERNS) {
    const existing = await payload.find({
      collection: 'patterns',
      where: { slug: { equals: pattern.slug } },
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'patterns',
        data: {
          ...pattern,
          definition: pattern.shortDefinition,
          isActive: true,
        },
      })
      console.log(`Created Pattern: ${pattern.slug}`)
    }
  }

  console.log('[Seed:Prod] Production seed completed successfully.')
}

if (process.argv[1]?.includes('seed-prod')) {
  seedProd().then(() => process.exit(0)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
