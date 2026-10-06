import Gallery, { type GalleryItem } from '@/components/Gallery'
import Reveal from '@/components/Reveal'
import { demoImages } from '@/lib/galleryDemo'
import { getPayloadClient } from '@/lib/payload'

/** Sección de galería del inicio. Se activa/desactiva desde el admin (Galería de inicio → Mostrar). */
export default async function HomeGallery() {
  const g = await (await getPayloadClient()).findGlobal({ slug: 'gallery', depth: 1 }).catch(() => null)
  if (!g || !g.show || !g.items?.length) return null

  const items: GalleryItem[] = g.items.map((it, i) => {
    const img = typeof it.image === 'object' && it.image ? it.image : null
    const demo = demoImages[i % demoImages.length]
    return {
      id: it.id ?? i,
      caption: it.caption,
      detail: it.detail,
      src: img?.url ? (img.sizes?.card?.url || img.url) : demo,
      full: img?.url ? (img.sizes?.hero?.url || img.url) : demo,
      alt: img ? (img.alt ?? it.caption) : `Imagen de demostración: ${it.caption}`,
      isDemo: !img,
    }
  })

  return (
    <section className="bg-paper py-24" aria-labelledby="galeria">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {g.eyebrow && <p className="eyebrow">{g.eyebrow}</p>}
            <h2 id="galeria" className="mt-4 max-w-2xl text-4xl text-primary sm:text-6xl">{g.title}</h2>
          </div>
          {g.intro && <p className="max-w-md text-lg text-muted-foreground">{g.intro}</p>}
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <Gallery items={items} layout={g.layout === 'grid' ? 'grid' : 'mosaic'} />
        </Reveal>
      </div>
    </section>
  )
}
