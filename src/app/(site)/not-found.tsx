import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <p className="font-display text-9xl font-medium text-secondary/70">404</p>
      <h1 className="mt-2 text-5xl text-primary">Esta página se fue de exploración</h1>
      <hr className="rule mx-auto mt-6" />
      <p className="mt-6 text-xl text-muted-foreground">No encontramos lo que buscabas, pero hay mucho por descubrir.</p>
      <Link href="/" className="btn btn-primary mt-10">Volver al inicio</Link>
    </section>
  )
}
