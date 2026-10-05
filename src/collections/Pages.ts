import type { CollectionConfig } from 'payload'
import { isLoggedIn, publishedOrLoggedIn } from '@/access'
import { richEditor } from '@/lib/editor'
import { slugField } from '@/lib/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', '_status', 'updatedAt'] },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  fields: [
    { name: 'title', label: 'Título', type: 'text', required: true },
    slugField,
    { name: 'subtitle', label: 'Bajada / subtítulo', type: 'textarea' },
    { name: 'heroImage', label: 'Imagen de cabecera', type: 'upload', relationTo: 'media' },
    { name: 'content', label: 'Contenido', type: 'richText', editor: richEditor, required: true },
    { name: 'metaDescription', label: 'Descripción para buscadores (SEO)', type: 'textarea', admin: { position: 'sidebar' } },
  ],
}
