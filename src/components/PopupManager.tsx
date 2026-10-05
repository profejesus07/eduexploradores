'use client'

import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import VideoEmbed from '@/components/VideoEmbed'

export type PopupData = {
  id: number | string
  title: string
  imageUrl?: string | null
  imageAlt?: string | null
  body?: any
  videoUrl?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  showOn: 'home' | 'all'
  frequency: 'session' | 'day' | 'always'
  delaySeconds: number
}

const seenKey = (p: PopupData) => `popup-${p.id}`

function alreadySeen(p: PopupData) {
  try {
    if (p.frequency === 'always') return false
    if (p.frequency === 'session') return sessionStorage.getItem(seenKey(p)) === '1'
    const t = Number(localStorage.getItem(seenKey(p)) || 0)
    return Date.now() - t < 24 * 3600 * 1000
  } catch {
    return false
  }
}

function markSeen(p: PopupData) {
  try {
    if (p.frequency === 'session') sessionStorage.setItem(seenKey(p), '1')
    else if (p.frequency === 'day') localStorage.setItem(seenKey(p), String(Date.now()))
  } catch {}
}

export default function PopupManager({ popups }: { popups: PopupData[] }) {
  const pathname = usePathname()
  const [current, setCurrent] = useState<PopupData | null>(null)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    const next = popups.find((p) => (p.showOn === 'all' || pathname === '/') && !alreadySeen(p))
    if (!next) return
    const t = setTimeout(() => setCurrent(next), Math.max(0, next.delaySeconds) * 1000)
    return () => clearTimeout(t)
  }, [pathname, popups])

  useEffect(() => {
    if (current && ref.current && !ref.current.open) ref.current.showModal()
  }, [current])

  if (!current) return null
  const close = () => {
    markSeen(current)
    ref.current?.close()
    setCurrent(null)
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="popup-title"
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      className="m-auto w-[min(92vw,34rem)] max-h-[90vh] overflow-y-auto rounded-3xl border-4 border-secondary bg-white p-0 text-foreground shadow-2xl backdrop:bg-primary-dark/70"
    >
      <button onClick={close} aria-label="Cerrar" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-primary shadow">
        <X aria-hidden />
      </button>
      {current.imageUrl && <img src={current.imageUrl} alt={current.imageAlt || ''} className="max-h-72 w-full object-cover" />}
      <div className="space-y-4 p-6">
        <h2 id="popup-title" className="font-display text-3xl font-bold text-primary">{current.title}</h2>
        {current.body && <RichText data={current.body} />}
        {current.videoUrl && <VideoEmbed url={current.videoUrl} />}
        {current.ctaUrl && (
          <a href={current.ctaUrl} onClick={close} className="inline-block rounded-full bg-secondary px-6 py-3 font-display font-bold text-on-secondary">
            {current.ctaLabel || 'Conocer más'}
          </a>
        )}
      </div>
    </dialog>
  )
}
