import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/PageHeader'
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
      <PageHeader title={page.title} subtitle={page.subtitle} eyebrow="Exploradores del Saber" />
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {hero?.url && <img src={hero.sizes?.hero?.url || hero.url} alt={hero.alt} className="mb-12 max-h-[28rem] w-full object-cover shadow-[var(--shadow-card)]" />}
        <RichText data={page.content as any} />
      </article>
    </>
  )
}
