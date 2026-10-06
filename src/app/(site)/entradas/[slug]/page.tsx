import { mediaSrc } from '@/lib/media'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categoryLabel } from '@/components/PostCard'
import PageHeader from '@/components/PageHeader'
import RichText from '@/components/RichText'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', limit: 200, depth: 0, pagination: false, overrideAccess: false })
  return docs.flatMap((d) => (d.slug ? [{ slug: d.slug }] : []))
}
type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 2, overrideAccess: false })
  return docs[0]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  return (
    <>
      <PageHeader title={post.title} trail={{ href: `/entradas?categoria=${post.category}`, label: categoryLabel[post.category ?? 'noticias'] }} subtitle={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-CO', { dateStyle: 'long' }) : undefined} />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {cover?.url && <img src={mediaSrc(cover, 'hero')} alt={cover.alt ?? ''} className="mb-12 w-full object-cover shadow-[var(--shadow-card)]" />}
        <p className="mb-10 max-w-2xl font-display text-3xl italic leading-snug text-primary">{post.excerpt}</p>
        <RichText data={post.content as any} />
        <Link href="/entradas" className="link-underline mt-14 inline-block font-bold tracking-wide text-primary">← Volver a las noticias</Link>
      </article>
    </>
  )
}
