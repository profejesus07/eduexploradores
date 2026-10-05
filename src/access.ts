import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)
export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

/** Público: solo publicado. Con sesión: todo (incluye borradores). */
export const publishedOrLoggedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }
