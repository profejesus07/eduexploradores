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

export const blocks = [VideoBlock, ButtonBlock, CalloutBlock]
