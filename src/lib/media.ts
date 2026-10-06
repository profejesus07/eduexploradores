import type { Media } from '@/payload-types'

const WIDTH = { card: 828, hero: 1920 } as const

const optimize = (url: string, w: number) =>
  /^https?:\/\//.test(url) ? `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=75` : url

/**
 * URL para mostrar una imagen de la biblioteca de medios.
 * Usa el tamaño generado por el servidor si existe; si no (subidas directas a Vercel Blob),
 * pide a Next una versión optimizada del original.
 */
export function mediaSrc(img: Media | null | undefined, size: 'card' | 'hero'): string | undefined {
  if (!img?.url) return undefined
  return img.sizes?.[size]?.url || optimize(img.url, WIDTH[size])
}
