import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_levels_stage" AS ENUM('preescolar', 'primaria');
  CREATE TYPE "public"."enum_levels_folder" AS ENUM('azul', 'roja', 'amarilla', 'verde', 'naranja', 'morada', 'gris');
  CREATE TABLE "levels_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "levels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stage" "enum_levels_stage" DEFAULT 'preescolar' NOT NULL,
  	"order" numeric DEFAULT 1,
  	"active" boolean DEFAULT true,
  	"title" varchar NOT NULL,
  	"badge" varchar,
  	"subtitle" varchar,
  	"summary" varchar NOT NULL,
  	"schedule" varchar,
  	"folder" "enum_levels_folder",
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "levels_id" integer;
  ALTER TABLE "levels_highlights" ADD CONSTRAINT "levels_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."levels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "levels" ADD CONSTRAINT "levels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "levels_highlights_order_idx" ON "levels_highlights" USING btree ("_order");
  CREATE INDEX "levels_highlights_parent_id_idx" ON "levels_highlights" USING btree ("_parent_id");
  CREATE INDEX "levels_image_idx" ON "levels" USING btree ("image_id");
  CREATE INDEX "levels_updated_at_idx" ON "levels" USING btree ("updated_at");
  CREATE INDEX "levels_created_at_idx" ON "levels" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_levels_fk" FOREIGN KEY ("levels_id") REFERENCES "public"."levels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_levels_id_idx" ON "payload_locked_documents_rels" USING btree ("levels_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "levels_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "levels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "levels_highlights" CASCADE;
  DROP TABLE "levels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_levels_fk";
  
  DROP INDEX "payload_locked_documents_rels_levels_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "levels_id";
  DROP TYPE "public"."enum_levels_stage";
  DROP TYPE "public"."enum_levels_folder";`)
}
