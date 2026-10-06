import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { migrations } from '@/migrations'
import { Levels } from '@/collections/Levels'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Popups } from '@/collections/Popups'
import { Posts } from '@/collections/Posts'
import { Testimonials } from '@/collections/Testimonials'
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
  collections: [Pages, Posts, Levels, Popups, Testimonials, Media, Users],
  globals: [SiteSettings],
  editor: richEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  // Producción (Vercel): Postgres si existe POSTGRES_URL. Local: SQLite.
  db: process.env.POSTGRES_URL
    ? vercelPostgresAdapter({ pool: { connectionString: process.env.POSTGRES_URL }, prodMigrations: migrations })
    : sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./data/payload.db' } }),
  plugins: [
    // Imágenes en Vercel Blob cuando hay token; en local, en disco.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp,
})
