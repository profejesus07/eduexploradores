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
  hooks: {
    // El texto alternativo es opcional para el editor: si se deja vacío, se usa el nombre del archivo.
    beforeValidate: [
      ({ data, req }) => {
        if (data && !data.alt) {
          const name = String(data.filename ?? req.file?.name ?? '')
          data.alt = name ? name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'Imagen' : 'Imagen'
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo (opcional)',
      type: 'text',
      admin: { description: 'Describe la imagen para personas con lectores de pantalla. Si lo dejas vacío se usa el nombre del archivo.' },
    },
  ],
}
