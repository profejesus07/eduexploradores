import { parseVideoUrl } from '@/lib/video'

export default function VideoEmbed({ url, caption }: { url?: string | null; caption?: string | null }) {
  const v = parseVideoUrl(url)
  if (!v) return url ? <a href={url} className="font-semibold underline" target="_blank" rel="noreferrer">Ver video</a> : null
  return (
    <figure className="not-prose">
      <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-card">
        {v.kind === 'iframe' ? (
          <iframe src={v.src} title={caption || 'Video'} className="h-full w-full" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <video src={v.src} controls preload="metadata" className="h-full w-full" />
        )}
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}
