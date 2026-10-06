import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '@/access'

export const Gallery: GlobalConfig = {
  slug: 'gallery',
  label: 'Galería de inicio',
  access: { read: () => true, update: isLoggedIn },
  admin: { description: 'Galería de la pantalla de inicio. Cada elemento sin imagen muestra una imagen de demostración: sube una foto para reemplazarla.' },
  fields: [
    { name: 'show', label: 'Mostrar la galería en el inicio', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', label: 'Etiqueta superior', type: 'text', defaultValue: 'Galería' },
    { name: 'title', label: 'Título', type: 'text', defaultValue: 'Momentos que inspiran' },
    { name: 'intro', label: 'Texto introductorio', type: 'textarea', defaultValue: 'Un recorrido por la forma en que exploramos, jugamos y aprendemos cada día.' },
    {
      name: 'layout',
      label: 'Diseño',
      type: 'select',
      defaultValue: 'mosaic',
      options: [{ label: 'Mosaico (tamaños variados)', value: 'mosaic' }, { label: 'Cuadrícula uniforme', value: 'grid' }],
    },
    {
      name: 'items',
      label: 'Imágenes',
      type: 'array',
      maxRows: 12,
      labels: { singular: 'Imagen', plural: 'Imágenes' },
      admin: { description: 'El mosaico está pensado para 6 imágenes (también funciona con otras cantidades).' },
      fields: [
        { name: 'image', label: 'Imagen (si la dejas vacía se usa la de demostración)', type: 'upload', relationTo: 'media' },
        { name: 'caption', label: 'Título / pie de foto', type: 'text', required: true },
        { name: 'detail', label: 'Descripción breve (opcional)', type: 'text' },
      ],
    },
  ],
}
