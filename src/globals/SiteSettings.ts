import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '@/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Datos de la institución',
  access: { read: () => true, update: isLoggedIn },
  fields: [
    { name: 'email', label: 'Correo', type: 'email', defaultValue: 'exploradoresdelsaber@gmail.com' },
    { name: 'phone', label: 'Celular', type: 'text', defaultValue: '311 740 5949' },
    { name: 'address', label: 'Dirección', type: 'text', defaultValue: 'Urb. Casa Carmelo Etapa II, Manzana C Casa 1, Valledupar' },
    { name: 'facebook', label: 'Facebook (URL)', type: 'text' },
    { name: 'instagram', label: 'Instagram (URL)', type: 'text' },
    { name: 'enrollmentOpen', label: 'Inscripciones abiertas', type: 'checkbox', defaultValue: true },
  ],
}
