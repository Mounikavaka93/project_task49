import { formatLongDate, sortSeats } from '../lib/format'
import { Poster } from './MovieCard'
import { Eyebrow } from './ui'

export default function TicketCard({ movie, ticket, code, compact = false }) {
  const seats = sortSeats(ticket.seats || [])

  if (compact) {
    return (
      <div className="flex gap-4 rounded-2xl bg-panel p-3 ring-1 ring-white/10 transition group-hover:ring-gold/40">
        {movie ? (
          <Poster movie={movie} className="h-24 w-16 shrink-0 rounded-xl" />
        ) : (
          <div className="h-24 w-16 shrink-0 rounded-xl bg-white/5" />
        )}
        <div className="min-w-0 py-1">
          <h3 className="truncate font-display text-xl text-cream">{ticket.movieTitle}</h3>
          <p className="mt-1 truncate text-sm text-muted">
            {ticket.theatreName} · {ticket.theatreCity}
          </p>
          <p className="text-sm text-cream/85">
            {formatLongDate(ticket.date)} · {ticket.time}
          </p>
          <p className="mt-1 text-sm text-gold">{seats.join(', ')}</p>
        </div>
      </div>
    )
  }

  return (
    <article className="relative overflow-hidden rounded-[28px] bg-panel ring-1 ring-white/10">
      <div className="grid sm:grid-cols-[168px_minmax(0,1fr)]">
        <div className="min-h-48" style={{ background: movie?.wash || '#1a1a1f' }}>
          {movie ? <Poster movie={movie} className="min-h-48" /> : null}
        </div>
        <div className="p-5 sm:p-6">
          <Eyebrow>{ticket.format}</Eyebrow>
          <h2 className="mt-2 font-display text-3xl leading-tight text-cream">{ticket.movieTitle}</h2>
          <p className="mt-3 text-sm text-muted">
            {ticket.theatreName}
            {ticket.theatreArea ? ` · ${ticket.theatreArea}` : ''} · {ticket.theatreCity}
          </p>
          <p className="mt-1 text-sm text-cream/90">
            {formatLongDate(ticket.date)} · {ticket.time}
          </p>
          <p className="mt-3 text-sm text-muted">
            {ticket.language} · {ticket.certificate}
          </p>
        </div>
      </div>
      <div className="relative border-t border-dashed border-white/15 px-5 py-4 sm:px-6">
        <span className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-ink" />
        <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-ink" />
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">Seats</p>
            <p className="mt-1 text-sm text-cream">{seats.join(', ')}</p>
          </div>
          {code ? (
            <p className="font-mono text-sm tracking-[0.18em] text-gold">{code}</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
