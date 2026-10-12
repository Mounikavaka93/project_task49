import { Link, useParams } from 'react-router-dom'
import TicketCard from '../components/TicketCard'
import { Button } from '../components/ui'
import { getMovie } from '../data/catalog'
import { useBooking } from '../context/useBooking'
import { formatBookedAt, formatINR, groupSeatLines } from '../lib/format'
import { paymentLabel } from '../lib/payment'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Confirmation() {
  const { bookingId } = useParams()
  const { bookings } = useBooking()
  const booking = bookings.find((item) => item.id === bookingId)
  const movie = booking ? getMovie(booking.movieId) : null
  useDocumentTitle(booking ? 'Booking confirmed' : 'Ticket')

  if (!booking) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="font-display text-4xl">We couldn’t find that ticket.</h1>
        <p className="mt-3 text-muted">It may belong to another browser on this device.</p>
        <div className="mt-6">
          <Button as={Link} to="/tickets">
            View my tickets
          </Button>
        </div>
      </div>
    )
  }

  const groups = groupSeatLines(booking.pricing.lines)

  return (
    <div className="shell py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="check-glow mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold/15 text-gold">
          <svg viewBox="0 0 52 52" className="h-12 w-12" aria-hidden="true">
            <circle className="check-circle" cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              className="check-mark"
              d="M16 27.5 23 34.5 37 18.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="rise mt-6 font-display text-4xl sm:text-5xl">You’re booked</h1>
        <p className="mt-3 text-muted">
          Saved for {booking.name} on this device · {formatBookedAt(booking.createdAt)}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <TicketCard movie={movie} ticket={booking} code={booking.id} />
        <div className="mt-4 rounded-3xl bg-panel p-5 ring-1 ring-white/10">
          {groups.map((group) => (
            <div key={group.tier} className="flex items-center justify-between gap-4 py-1 text-sm">
              <span className="text-muted">
                {group.tier} · {group.seats.join(', ')}
              </span>
              <span>{formatINR(group.unit * group.count)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 py-1 text-sm text-muted">
            <span>Convenience fee</span>
            <span>{formatINR(booking.pricing.fee)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-white/10 pt-3">
            <span>Total</span>
            <span className="text-gold">{formatINR(booking.pricing.total)}</span>
          </div>
          {booking.payment ? (
            <p className="mt-3 text-sm text-muted">Paid with {paymentLabel(booking.payment)}</p>
          ) : null}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button as={Link} to="/tickets">
            My tickets
          </Button>
          <Button as={Link} to="/movies" variant="ghost">
            Browse films
          </Button>
        </div>
      </div>
    </div>
  )
}
