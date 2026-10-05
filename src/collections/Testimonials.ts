import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonio', plural: 'Testimonios' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'active'] },
  access: {
    read: ({ req }) => (req.user ? true : { active: { equals: true } }),
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'role', label: 'Rol (ej. Madre de familia)', type: 'text', required: true },
    { name: 'text', label: 'Testimonio', type: 'textarea', required: true },
    { name: 'active', label: 'Mostrar en la web', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
