import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Campo "Mostrar el título en el popup" (por defecto desactivado).
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
ALTER TABLE "popups" ADD COLUMN IF NOT EXISTS "show_title" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
ALTER TABLE "popups" DROP COLUMN IF EXISTS "show_title";`)
}
