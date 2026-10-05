import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    { name: 'url', label: 'URL del video', type: 'text', required: true, admin: { description: 'YouTube, Vimeo o enlace directo a .mp4' } },
    { name: 'caption', label: 'Pie de video', type: 'text' },
  ],
}

export const ButtonBlock: Block = {
  slug: 'button',
  labels: { singular: 'Botón con enlace', plural: 'Botones' },
  fields: [
    { name: 'label', label: 'Texto del botón', type: 'text', required: true },
    { name: 'url', label: 'Enlace', type: 'text', required: true },
    { name: 'style', label: 'Estilo', type: 'select', defaultValue: 'primary', options: [{ label: 'Principal (azul)', value: 'primary' }, { label: 'Destacado (dorado)', value: 'gold' }, { label: 'Contorno', value: 'outline' }] },
    { name: 'newTab', label: 'Abrir en pestaña nueva', type: 'checkbox' },
  ],
}

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Recuadro destacado', plural: 'Recuadros' },
  fields: [
    { name: 'tone', label: 'Tipo', type: 'select', defaultValue: 'info', options: [{ label: 'Información', value: 'info' }, { label: 'Importante', value: 'gold' }, { label: 'Ciencia / logro', value: 'green' }] },
    { name: 'title', label: 'Título', type: 'text' },
    { name: 'text', label: 'Texto', type: 'textarea', required: true },
  ],
}

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: { singular: 'Preguntas frecuentes (acordeón)', plural: 'Acordeones' },
  fields: [
    {
      name: 'items',
      label: 'Preguntas',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Pregunta', plural: 'Preguntas' },
      fields: [
        { name: 'question', label: 'Pregunta', type: 'text', required: true },
        { name: 'answer', label: 'Respuesta', type: 'textarea', required: true },
      ],
    },
  ],
}

export const folderOptions = [
  { label: 'Azul', value: 'azul' },
  { label: 'Roja', value: 'roja' },
  { label: 'Amarilla', value: 'amarilla' },
  { label: 'Verde', value: 'verde' },
  { label: 'Naranja', value: 'naranja' },
  { label: 'Morada', value: 'morada' },
  { label: 'Gris', value: 'gris' },
]

export const FolderColorsBlock: Block = {
  slug: 'folderColors',
  labels: { singular: 'Color de carpeta por grado', plural: 'Colores de carpeta' },
  fields: [
    {
      name: 'items',
      label: 'Grados',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Grado', plural: 'Grados' },
      fields: [
        { name: 'grade', label: 'Grado', type: 'text', required: true },
        { name: 'folder', label: 'Color de la carpeta', type: 'select', required: true, options: folderOptions },
      ],
    },
  ],
}

export const blocks = [VideoBlock, ButtonBlock, CalloutBlock, AccordionBlock, FolderColorsBlock]
