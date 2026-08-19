/**
 * Development Seed Script
 * Adds 3 draft experiences clearly marked as DEMO (isDemo=true, draft only, noindex).
 * Never seeds fake citations or published items into production.
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { seedProd } from './seed-prod'

export async function seedDev() {
  console.log('[Seed:Dev] Starting development demo seed...')
  await seedProd()

  const payload = await getPayload({ config })

  // Find nde type
  const ndeTypes = await payload.find({
    collection: 'experience-types',
    where: { slug: { equals: 'near-death-experience' } },
  })
  const ndeTypeId = ndeTypes.docs[0]?.id

  // Create DEMO Experiences (marked as draft and unindexed)
  const demoExperiences = [
    {
      publicId: 'demo-exp-uuid-001',
      title: '[DEMO] روایت نمونه: تجربه آرامش عمیق و ادراک نور',
      slug: 'demo-deep-peace-and-light',
      experienceType: ndeTypeId,
      anonymityLevel: 'anonymous' as const,
      editorialSummary: 'این یک تجربه ساختگی جهت آزمایش و اعتبارسنجی سیستم رندرینگ و پلیر است و جنبه واقعی ندارد.',
      publicNarrative: {
        root: {
          type: 'root',
          direction: 'rtl' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              direction: 'rtl' as const,
              format: '' as const,
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'این متن آزمایشی صرفاً جهت تست ظاهر و خوانایی قلم فارسی و رندر پاراگراف‌هاست.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
            },
          ],
        },
      },
      documentationMethods: ['selfReport' as const],
      documentationNote: 'مستند آزمایشی توسعه.',
      editorialStage: 'draft' as const,
      isFeatured: false,
    },
  ]

  for (const exp of demoExperiences) {
    const existing = await payload.find({
      collection: 'experiences',
      where: { slug: { equals: exp.slug } },
      draft: true,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'experiences',
        data: exp,
        draft: true,
      })
      console.log(`Created DEMO Draft Experience: ${exp.slug}`)
    }
  }

  console.log('[Seed:Dev] Development seed completed.')
}

if (process.argv[1]?.includes('seed-dev')) {
  seedDev().then(() => process.exit(0)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
