/**
 * Export Public and De-identified Research Data
 * Outputs JSON and CSV exports of published experiences, patterns, and sources.
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

export async function exportPublicData() {
  console.log('[Export] Exporting published experiences and research taxonomy...')
  const payload = await getPayload({ config })

  // 1. Export published experiences (zero PII)
  const experiences = await payload.find({
    collection: 'experiences',
    where: {
      editorialStage: { equals: 'published' },
    },
    limit: 1000,
  })

  // 2. Export patterns
  const patterns = await payload.find({
    collection: 'patterns',
    where: { isActive: { equals: true } },
    limit: 1000,
  })

  const exportDir = path.resolve(process.cwd(), 'exports')
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true })
  }

  // Save JSON
  const publicDataset = {
    generatedAt: new Date().toISOString(),
    totalExperiences: experiences.totalDocs,
    experiences: experiences.docs.map((doc) => ({
      publicId: doc.publicId,
      title: doc.title,
      slug: doc.slug,
      editorialSummary: doc.editorialSummary,
      anonymityLevel: doc.anonymityLevel,
      publicAlias: doc.publicAlias,
      occurrenceYear: doc.occurrenceYear,
      country: doc.country,
      documentationMethods: doc.documentationMethods,
      publishedAt: doc.publishedAt,
    })),
    patterns: patterns.docs.map((p) => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      shortDefinition: p.shortDefinition,
    })),
  }

  fs.writeFileSync(path.join(exportDir, 'public-dataset.json'), JSON.stringify(publicDataset, null, 2))
  console.log(`[Export] Successfully wrote ${path.join(exportDir, 'public-dataset.json')}`)
}

if (process.argv[1]?.includes('export-public')) {
  exportPublicData().then(() => process.exit(0)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
