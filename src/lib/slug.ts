import type { Field } from 'payload'

export const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const slugField: Field = {
  name: 'slug',
  label: 'Enlace (slug)',
  type: 'text',
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'Se genera del título si lo dejas vacío.' },
  hooks: {
    beforeValidate: [
      ({ value, data }) => (value ? slugify(String(value)) : data?.title ? slugify(String(data.title)) : value),
    ],
  },
}
