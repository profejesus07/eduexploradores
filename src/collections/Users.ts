import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isLoggedIn } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  auth: true,
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'role'] },
  access: {
    admin: ({ req }) => Boolean(req.user),
    read: isLoggedIn,
    create: isAdmin,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      defaultValue: 'admin', // el primer usuario (registro inicial) queda como administrador
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor (entradas, páginas y popups)', value: 'editor' },
      ],
      access: { create: isAdminField, update: isAdminField },
    },
  ],
}
