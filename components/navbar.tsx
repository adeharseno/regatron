import { Sun } from 'lucide-react'

const links = [
  { label: 'About Us', href: '#', active: true },
  { label: 'Our Story', href: '#milestones' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 h-16 w-full border-b border-outline-variant/30 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-margin-desktop">
        <div className="flex items-center">
          <span className="text-xl font-extrabold uppercase tracking-[0.2em] text-primary">
            Regatron
          </span>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? 'border-b-2 border-primary pb-1 text-sm font-bold uppercase tracking-wider text-primary'
                  : 'text-sm font-medium uppercase tracking-wider text-secondary transition-colors hover:text-primary'
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center text-xs font-bold tracking-widest">
            <span className="cursor-pointer border-b border-primary font-bold text-primary">ID</span>
            <span className="mx-2 text-outline">|</span>
            <span className="cursor-pointer text-secondary transition-colors hover:text-primary">
              EN
            </span>
          </div>
          <button
            className="p-2 text-secondary transition-colors hover:text-primary"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5" />
          </button>
          <button className="hidden bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-on-primary transition-transform active:scale-95 md:block">
            Hubungi Kami
          </button>
        </div>
      </div>
    </nav>
  )
}
