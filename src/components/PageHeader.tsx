import Link from 'next/link'

export default function PageHeader({ title, subtitle, eyebrow, trail }: { title: string; subtitle?: string | null; eyebrow?: string; trail?: { href: string; label: string } }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-paper">
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-secondary/30" />
      <div aria-hidden className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-secondary/20" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {trail && <Link href={trail.href} className="link-underline mb-4 inline-block text-sm font-bold uppercase tracking-[.16em] text-gold-text">{trail.label}</Link>}
        {eyebrow && !trail && <p className="eyebrow rise rise-1">{eyebrow}</p>}
        <h1 className="rise rise-2 mt-3 max-w-3xl text-5xl text-primary sm:text-6xl lg:text-7xl">{title}</h1>
        <hr className="rule rise rise-3 mt-6" />
        {subtitle && <p className="rise rise-4 mt-6 max-w-2xl text-xl text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  )
}
