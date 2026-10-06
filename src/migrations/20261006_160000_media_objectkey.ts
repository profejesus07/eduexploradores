import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// El adaptador de Vercel Blob (subida directa desde el navegador) consulta la columna "_objectkey"
// de la tabla "media". Sin ella, la lista de medios y la subida de imágenes fallan con
// "column _objectkey does not exist". IF NOT EXISTS la hace segura de re-ejecutar.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";`)
}
