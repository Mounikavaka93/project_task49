import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'
import { IconChevron, IconStar } from './icons'

const variants = {
  primary:
    'bg-gold text-ink shadow-[0_10px_30px_rgba(226,177,92,0.18)] hover:bg-[#f0c878]',
  ghost: 'border border-white/15 bg-white/5 text-cream hover:border-gold/50 hover:bg-white/10',
}

export function Button({
  as: Comp = 'button',
  variant = 'primary',
  className,
  type,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-200 enabled:hover:-translate-y-0.5 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        className,
      )}
      type={Comp === 'button' ? type || 'button' : type}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function Chip({ active, className, children, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        'shrink-0 rounded-full px-3.5 py-1.5 text-sm transition',
        active
          ? 'bg-gold text-ink'
          : 'bg-white/5 text-cream ring-1 ring-white/10 hover:ring-gold/40',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Field({ label, error, end, className, ...props }) {
  return (
    <label className={cn('block text-left', className)}>
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <span className="relative block">
        <input
          className={cn(
            'w-full rounded-xl border bg-white/5 px-3.5 py-2.5 text-sm text-cream outline-none transition placeholder:text-muted/70 focus:border-gold/70 focus:bg-white/[0.07]',
            end && 'pr-16',
            error ? 'border-ember/80' : 'border-white/10',
          )}
          {...props}
        />
        {end ? (
          <span className="absolute inset-y-0 right-2 flex items-center">{end}</span>
        ) : null}
      </span>
      {error ? <span className="mt-1.5 block text-xs text-ember">{error}</span> : null}
    </label>
  )
}

export function Eyebrow({ children, className }) {
  return (
    <p className={cn('text-xs font-medium uppercase tracking-[0.22em] text-gold', className)}>
      {children}
    </p>
  )
}

export function Rating({ value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ink/80 px-2 py-1 text-xs font-medium text-cream backdrop-blur">
      <IconStar className="h-3.5 w-3.5 text-gold" />
      {Number(value).toFixed(1)}
    </span>
  )
}

export function BackLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-cream"
    >
      <IconChevron className="h-4 w-4" />
      {children}
    </Link>
  )
}

export function Logo({ className }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/80">
        <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_12px_rgba(226,177,92,0.85)]" />
      </span>
      <span className="font-display text-xl tracking-wide text-cream">MOVIQ</span>
    </span>
  )
}
