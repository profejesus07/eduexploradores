import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Popups } from '@/collections/Popups'
import { Posts } from '@/collections/Posts'
import { Users } from '@/collections/Users'
import { SiteSettings } from '@/globals/SiteSettings'
import { richEditor } from '@/lib/editor'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Exploradores del Saber' },
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: 'es' },
  collections: [Pages, Posts, Popups, Media, Users],
  globals: [SiteSettings],
  editor: richEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./data/payload.db' } }),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp,
})
