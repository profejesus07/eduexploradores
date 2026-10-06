import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/access'
import { richEditor } from '@/lib/editor'

export const Popups: CollectionConfig = {
  slug: 'popups',
  labels: { singular: 'Popup', plural: 'Popups' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'active', 'showOn', 'startAt', 'endAt'] },
  access: {
    // El público solo ve los activos
    read: ({ req }) => (req.user ? true : { active: { equals: true } }),
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'title',
      label: 'Título interno / encabezado',
      type: 'text',
      required: true,
      admin: { description: 'Identifica el popup en el panel. Solo se muestra al público si marcas "Mostrar el título en el popup".' },
    },
    {
      name: 'showTitle',
      label: 'Mostrar el título en el popup',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'active', label: 'Activo', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media' },
    {
      name: 'body',
      label: 'Texto (admite enlaces)',
      type: 'richText',
      editor: richEditor,
      admin: { description: 'Opcional. Si lo dejas vacío no se muestra ningún texto.' },
    },
    { name: 'videoUrl', label: 'URL de video (YouTube, Vimeo o .mp4)', type: 'text' },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          label: 'Texto del botón',
          type: 'text',
          admin: { description: 'El botón solo aparece si escribes el texto y el enlace.' },
        },
        {
          name: 'ctaUrl',
          label: 'Enlace del botón',
          type: 'text',
          admin: { description: 'Déjalo vacío si no quieres botón.' },
        },
      ],
    },
    {
      name: 'showOn',
      label: 'Dónde se muestra',
      type: 'select',
      defaultValue: 'home',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Solo en el inicio', value: 'home' },
        { label: 'En todo el sitio', value: 'all' },
      ],
    },
    {
      name: 'frequency',
      label: 'Frecuencia',
      type: 'select',
      defaultValue: 'session',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Una vez por visita', value: 'session' },
        { label: 'Una vez al día', value: 'day' },
        { label: 'Siempre', value: 'always' },
      ],
    },
    { name: 'delaySeconds', label: 'Segundos antes de mostrarse', type: 'number', defaultValue: 2, min: 0, max: 60, admin: { position: 'sidebar' } },
    { name: 'startAt', label: 'Mostrar desde', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endAt', label: 'Mostrar hasta', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
  ],
}
