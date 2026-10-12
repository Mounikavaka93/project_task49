import { Button } from './ui'

export function BookingAside({ children }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-3xl bg-panel p-5 ring-1 ring-white/10">{children}</div>
    </aside>
  )
}

export function CheckoutBar({ kicker, title, action, disabled, onClick }) {
  return (
    <div className="checkout-in fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-muted">{kicker}</p>
          <p className="truncate text-sm text-cream">{title}</p>
        </div>
        <Button onClick={onClick} disabled={disabled}>
          {action}
        </Button>
      </div>
    </div>
  )
}
