import type { Metadata } from 'next'
import { Baloo_2, Nunito } from 'next/font/google'
import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PopupLoader from '@/components/PopupLoader'
import './globals.css'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-baloo', display: 'swap' })
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-nunito', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Exploradores del Saber — Crecer, Explorar y Aprender', template: '%s · Exploradores del Saber' },
  description:
    'Proyecto educativo en Valledupar: educación inicial constructivista, refuerzo escolar y formación integral para niños curiosos, autónomos y comprometidos con su entorno.',
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable}`}>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-secondary focus:px-4 focus:py-2 focus:text-on-secondary">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <PopupLoader />
      </body>
    </html>
  )
}
