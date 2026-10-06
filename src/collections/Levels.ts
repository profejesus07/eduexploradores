import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/access'
import { folderOptions } from '@/blocks'

export const Levels: CollectionConfig = {
  slug: 'levels',
  labels: { singular: 'Nivel / grado', plural: 'Niveles y grados' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'stage', 'order', 'active'], description: 'Cada registro es una diapositiva de los sliders de Preescolar y Primaria.' },
  defaultSort: 'order',
  access: {
    read: ({ req }) => (req.user ? true : { active: { equals: true } }),
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'stage',
      label: 'Etapa (slider)',
      type: 'select',
      required: true,
      defaultValue: 'preescolar',
      options: [{ label: 'Preescolar', value: 'preescolar' }, { label: 'Primaria', value: 'primaria' }],
      admin: { position: 'sidebar' },
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 1, admin: { position: 'sidebar' } },
    { name: 'active', label: 'Mostrar en la web', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'title', label: 'Título (ej. Párvulos, Primero)', type: 'text', required: true },
    { name: 'badge', label: 'Numeral o marca (ej. 01, 1°)', type: 'text', maxLength: 4 },
    { name: 'subtitle', label: 'Antetítulo (ej. Primeros pasos)', type: 'text' },
    { name: 'summary', label: 'Descripción', type: 'textarea', required: true },
    {
      name: 'highlights',
      label: 'Puntos destacados (máx. 4)',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Punto', plural: 'Puntos' },
      fields: [{ name: 'text', label: 'Texto', type: 'text', required: true }],
    },
    { name: 'schedule', label: 'Horario (opcional)', type: 'text' },
    { name: 'folder', label: 'Color de carpeta (opcional)', type: 'select', options: folderOptions },
    { name: 'image', label: 'Imagen (opcional)', type: 'upload', relationTo: 'media' },
  ],
}
