import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    // Solo los administradores ven la sección Usuarios en el panel.
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    // Admin: todos. Editor: únicamente su propia cuenta (nombre y contraseña; el rol solo lo cambia un admin).
    read: ({ req }) => (req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: isAdmin,
    update: ({ req }) => (req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false),
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
