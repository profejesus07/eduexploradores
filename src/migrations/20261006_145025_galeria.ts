import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_layout" AS ENUM('mosaic', 'grid');
  CREATE TABLE "gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show" boolean DEFAULT true,
  	"eyebrow" varchar DEFAULT 'Galería',
  	"title" varchar DEFAULT 'Momentos que inspiran',
  	"intro" varchar DEFAULT 'Un recorrido por la forma en que exploramos, jugamos y aprendemos cada día.',
  	"layout" "enum_gallery_layout" DEFAULT 'mosaic',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "gallery_items_order_idx" ON "gallery_items" USING btree ("_order");
  CREATE INDEX "gallery_items_parent_id_idx" ON "gallery_items" USING btree ("_parent_id");
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "gallery_items" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TYPE "public"."enum_gallery_layout";`)
}
