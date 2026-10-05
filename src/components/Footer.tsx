import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { nav } from '@/components/Header'
import { getSettings } from '@/lib/settings'

export default async function Footer() {
  const s = await getSettings().catch(() => null)
  const email = s?.email || 'exploradoresdelsaber@gmail.com'
  const phone = s?.phone || '311 740 5949'
  const address = s?.address || 'Urb. Casa Carmelo Etapa II, Manzana C Casa 1, Valledupar'
  return (
    <footer className="mt-24 bg-primary-dark text-white">
      <div className="h-2 bg-gradient-to-r from-secondary via-sky to-science" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.webp" alt="" width={64} height={64} className="rounded-full bg-white" />
            <p className="font-display text-2xl font-bold leading-tight">Exploradores<br />del Saber</p>
          </div>
          <p className="mt-4 max-w-xs text-white/80">Enfoque constructivista que coloca al niño en el centro del aprendizaje.</p>
          <p className="mt-2 font-display text-lg font-semibold text-secondary">Crecer, Explorar y Aprender</p>
        </div>
        <nav aria-label="Pie de página">
          <h2 className="font-display text-lg font-bold text-secondary">Explora</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-white/85 hover:text-secondary">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-lg font-bold text-secondary">Contacto</h2>
          <ul className="mt-3 space-y-3 text-white/90">
            <li className="flex gap-3"><MapPin aria-hidden className="mt-1 shrink-0 text-secondary" size={18} />{address}</li>
            <li className="flex gap-3"><Phone aria-hidden className="mt-1 shrink-0 text-secondary" size={18} /><a href={`tel:+57${phone.replace(/\D/g, '')}`} className="hover:text-secondary">{phone}</a></li>
            <li className="flex gap-3"><Mail aria-hidden className="mt-1 shrink-0 text-secondary" size={18} /><a href={`mailto:${email}`} className="break-all hover:text-secondary">{email}</a></li>
            <li className="flex gap-3"><Clock aria-hidden className="mt-1 shrink-0 text-secondary" size={18} />Lunes a viernes · 7:15 a.m. – 12:15 p.m.</li>
          </ul>
          {s?.facebook && <a href={s.facebook} className="mt-4 inline-block font-semibold text-secondary underline">Facebook</a>}
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-sm text-white/60">© {new Date().getFullYear()} Exploradores del Saber · Todos los derechos reservados.</p>
    </footer>
  )
}
