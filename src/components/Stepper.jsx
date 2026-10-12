import { cn } from '../lib/cn'

const STEPS = [
  { id: 'show', label: 'Show' },
  { id: 'seats', label: 'Seats' },
  { id: 'summary', label: 'Pay' },
]

export default function Stepper({ current }) {
  const active = STEPS.findIndex((step) => step.id === current)

  return (
    <ol className="flex flex-wrap items-center gap-2 text-sm">
      {STEPS.map((step, index) => {
        const done = index <= active
        return (
          <li key={step.id} className="flex items-center gap-2">
            <span
              className={cn(
                'grid h-7 w-7 place-items-center rounded-full text-xs font-medium transition duration-300',
                done ? 'bg-gold text-ink' : 'bg-white/10 text-muted',
                index === active && 'step-on',
              )}
            >
              {index + 1}
            </span>
            <span className={done ? 'text-cream' : 'text-muted'}>{step.label}</span>
            {index < STEPS.length - 1 ? (
              <span className="mx-1 hidden h-px w-8 bg-white/15 sm:block" />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
