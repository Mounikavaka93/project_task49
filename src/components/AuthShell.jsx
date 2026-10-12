import { Link } from 'react-router-dom'
import { Logo } from './ui'

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100svh-4rem)] lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <div className="relative flex h-full flex-col justify-between py-10 pr-10 pl-[max(1.5rem,calc((100vw-1120px)/2))]">
          <Link to="/" aria-label="MOVIQ home">
            <Logo />
          </Link>
          <div>
            <p className="font-display text-4xl leading-tight text-balance">
              Find a seat. We’ll dim the lights.
            </p>
            <p className="mt-3 max-w-sm text-sm text-cream/75">
              Sign in to keep your bookings with you on this browser.
            </p>
          </div>
        </div>
      </aside>
      <div className="flex items-center justify-center px-4 py-12 md:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/" aria-label="MOVIQ home">
              <Logo />
            </Link>
          </div>
          <h1 className="font-display text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-muted">{footer}</div>
        </div>
      </div>
    </div>
  )
}

export function AuthFooterLink({ to, state, prompt, action }) {
  return (
    <p>
      {prompt}{' '}
      <Link to={to} state={state} className="text-gold transition hover:text-cream">
        {action}
      </Link>
    </p>
  )
}
