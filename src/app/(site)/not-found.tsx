import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-display text-8xl font-extrabold text-secondary">404</p>
      <h1 className="mt-2 text-4xl font-extrabold text-primary">Esta página se fue de exploración</h1>
      <p className="mt-3 text-lg text-muted-foreground">No encontramos lo que buscabas, pero hay mucho por descubrir.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-display text-lg font-bold text-white">Volver al inicio</Link>
    </section>
  )
}
