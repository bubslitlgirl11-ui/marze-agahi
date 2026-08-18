import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { ExperienceTypes } from './collections/ExperienceTypes'
import { Patterns } from './collections/Patterns'
import { Experiences } from './collections/Experiences'
import { Submissions } from './collections/Submissions'
import { ConsentRecords } from './collections/ConsentRecords'
import { Reviews } from './collections/Reviews'
import { MediaAssets } from './collections/MediaAssets'
import { Transcripts } from './collections/Transcripts'
import { ScientificSources } from './collections/ScientificSources'
import { Articles } from './collections/Articles'
import { Pages } from './collections/Pages'
import { ContactMessages } from './collections/ContactMessages'
import { AuditLogs } from './collections/AuditLogs'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation, Footer, SubmissionSettings, ResearchSettings } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    ExperienceTypes,
    Patterns,
    Experiences,
    Submissions,
    ConsentRecords,
    Reviews,
    MediaAssets,
    Transcripts,
    ScientificSources,
    Articles,
    Pages,
    ContactMessages,
    AuditLogs,
  ],
  globals: [
    SiteSettings,
    Navigation,
    Footer,
    SubmissionSettings,
    ResearchSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback_secret_32_characters_long_for_dev_only',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./local.db',
    },
  }),
})
