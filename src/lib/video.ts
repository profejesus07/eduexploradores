export type VideoSource =
  | { kind: 'iframe'; src: string }
  | { kind: 'file'; src: string }
  | null

/** Convierte una URL de YouTube / Vimeo / archivo de video en algo incrustable. */
export function parseVideoUrl(raw?: string | null): VideoSource {
  if (!raw) return null
  try {
    const u = new URL(raw.trim())
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}` }
    if (host.endsWith('youtube.com')) {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').filter(Boolean).pop()
      return id ? { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}` } : null
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? { kind: 'iframe', src: `https://player.vimeo.com/video/${id}` } : null
    }
    if (/\.(mp4|webm|ogg)$/i.test(u.pathname)) return { kind: 'file', src: u.toString() }
    return null
  } catch {
    return null
  }
}
