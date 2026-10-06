import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Alinea la base con la configuración actual. Es idempotente: las columnas "show_title" y "_objectkey"
// ya las crearon las migraciones 20261006_184500_popup_mostrar_titulo y 20261006_160000_media_objectkey.
// - media.alt pasa a ser opcional (un hook la completa con el nombre del archivo).
// - media.prefix: campo que el plugin de Vercel Blob inserta siempre (alwaysInsertFields).
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "popups" ADD COLUMN IF NOT EXISTS "show_title" boolean DEFAULT false;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT '';
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";`)
}
