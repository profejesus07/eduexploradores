import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import logo from '@/assets/logo.webp'
import { nav } from '@/components/Header'
import { getSettings } from '@/lib/settings'

export default async function Footer() {
  const s = await getSettings().catch(() => null)
  const email = s?.email || 'exploradoresdelsaber@gmail.com'
  const phone = s?.phone || '311 740 5949'
  const address = s?.address || 'Urb. Casa Carmelo Etapa II, Manzana C Casa 1, Valledupar'
  return (
    <footer className="on-dark mt-28 bg-primary-dark text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src={logo} alt="" width={60} height={60} className="rounded-full" />
            <p className="font-display text-3xl font-semibold leading-none">Exploradores<span className="mt-1 block text-lg font-medium italic text-gold-soft">del Saber</span></p>
          </div>
          <p className="mt-6 max-w-xs text-white/75">Enfoque constructivista que coloca al niño en el centro del aprendizaje.</p>
          <p className="mt-3 font-display text-xl italic text-gold-soft">Crecer, Explorar y Aprender</p>
        </div>
        <nav aria-label="Pie de página">
          <h2 className="eyebrow on-dark !text-[.75rem]">Explora</h2>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="link-underline text-white/80 hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow on-dark !text-[.75rem]">Contacto</h2>
          <ul className="mt-5 space-y-3.5 text-white/85">
            <li className="flex gap-3"><MapPin aria-hidden className="mt-1 shrink-0 text-gold-soft" size={18} />{address}</li>
            <li className="flex gap-3"><Phone aria-hidden className="mt-1 shrink-0 text-gold-soft" size={18} /><a href={`tel:+57${phone.replace(/\D/g, '')}`} className="link-underline">{phone}</a></li>
            <li className="flex gap-3"><Mail aria-hidden className="mt-1 shrink-0 text-gold-soft" size={18} /><a href={`mailto:${email}`} className="link-underline break-all">{email}</a></li>
            <li className="flex gap-3"><Clock aria-hidden className="mt-1 shrink-0 text-gold-soft" size={18} />Lunes a viernes · 7:15 a.m. – 12:15 p.m.</li>
          </ul>
          {s?.facebook && <a href={s.facebook} className="link-underline mt-5 inline-block font-bold text-gold-soft">Facebook</a>}
        </div>
      </div>
      <p className="border-t border-white/10 py-6 text-center text-sm text-white/55">© {new Date().getFullYear()} Exploradores del Saber · Todos los derechos reservados.</p>
    </footer>
  )
}
