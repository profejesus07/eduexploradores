import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categoryLabel } from '@/components/PostCard'
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
      <header className="bg-primary-dark text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Link href={`/entradas?categoria=${post.category}`} className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-on-secondary">{categoryLabel[post.category ?? 'noticias']}</Link>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{post.title}</h1>
          {post.publishedAt && <p className="mt-3 text-white/75">{new Date(post.publishedAt).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>}
        </div>
        <div className="h-2 bg-gradient-to-r from-secondary via-sky to-science" />
      </header>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {cover?.url && <img src={cover.sizes?.hero?.url || cover.url} alt={cover.alt} className="mb-10 w-full rounded-3xl object-cover shadow-card" />}
        <p className="mb-8 text-xl font-semibold text-primary-dark">{post.excerpt}</p>
        <RichText data={post.content as any} />
        <Link href="/entradas" className="mt-12 inline-block font-display font-bold text-primary underline">← Volver a las noticias</Link>
      </article>
    </>
  )
}
