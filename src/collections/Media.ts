import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo', plural: 'Biblioteca de medios' },
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  admin: { useAsTitle: 'alt' },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: undefined },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    { name: 'alt', label: 'Texto alternativo (descripción de la imagen)', type: 'text', required: true },
  ],
}
