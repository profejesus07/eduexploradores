import type { CollectionConfig } from 'payload'
import { isLoggedIn, publishedOrLoggedIn } from '@/access'
import { richEditor } from '@/lib/editor'
import { slugField } from '@/lib/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Entrada', plural: 'Entradas' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', '_status'] },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    slugField,
    { name: 'excerpt', label: 'Resumen', type: 'textarea', required: true, maxLength: 240 },
    { name: 'coverImage', label: 'Imagen principal', type: 'upload', relationTo: 'media' },
    { name: 'content', label: 'Contenido', type: 'richText', editor: richEditor, required: true },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      defaultValue: 'noticias',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Noticias', value: 'noticias' },
        { label: 'Familias', value: 'familias' },
        { label: 'Docentes', value: 'docentes' },
        { label: 'Estudiantes', value: 'estudiantes' },
        { label: 'Comunidad', value: 'comunidad' },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicación',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
      hooks: { beforeChange: [({ value, siblingData }) => (!value && siblingData._status === 'published' ? new Date() : value)] },
    },
  ],
}
