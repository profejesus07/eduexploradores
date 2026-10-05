import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'pages', limit: 200, depth: 0, pagination: false, overrideAccess: false })
  return docs.flatMap((d) => (d.slug ? [{ slug: d.slug }] : []))
}
type Props = { params: Promise<{ slug: string }> }

async function getPage(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 2, overrideAccess: false })
  return docs[0]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage((await params).slug)
  return page ? { title: page.title, description: page.metaDescription || page.subtitle || undefined } : {}
}

export default async function Page({ params }: Props) {
  const page = await getPage((await params).slug)
  if (!page) notFound()
  const hero = typeof page.heroImage === 'object' ? page.heroImage : null
  return (
    <>
      <header className="bg-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-6xl">{page.title}</h1>
          {page.subtitle && <p className="mt-3 max-w-2xl text-lg text-white/85">{page.subtitle}</p>}
        </div>
        <div className="h-2 bg-gradient-to-r from-secondary via-sky to-science" />
      </header>
      <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {hero?.url && <img src={hero.sizes?.hero?.url || hero.url} alt={hero.alt} className="mb-10 max-h-[28rem] w-full rounded-3xl object-cover shadow-card" />}
        <RichText data={page.content as any} />
      </article>
    </>
  )
}
