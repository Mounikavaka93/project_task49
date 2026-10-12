import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BookingAside, CheckoutBar } from '../components/BookingChrome'
import SeatMap from '../components/SeatMap'
import Stepper from '../components/Stepper'
import { BackLink, Button } from '../components/ui'
import NotFound from './NotFound'
import { MAX_SEATS, bookedSeatIds, getMovie, getTheatre, quote } from '../data/catalog'
import { useBooking } from '../context/useBooking'
import { formatINR, formatLongDate } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Seats() {
  const { id } = useParams()
  const movie = getMovie(id)
  useDocumentTitle(movie ? `Seats · ${movie.title}` : 'Seats')
  const navigate = useNavigate()
  const { selection, bookings, toggleSeat } = useBooking()
  const [notice, setNotice] = useState('')
  const theatre = getTheatre(selection.theatreId)
  const ready =
    movie &&
    theatre &&
    selection.movieId === id &&
    selection.date &&
    selection.format &&
    selection.time

  const booked = useMemo(
    () => (ready ? bookedSeatIds(selection, bookings) : new Set()),
    [ready, selection, bookings],
  )
  const selected = useMemo(() => new Set(selection.seats), [selection.seats])
  const pricing = quote(selection.format, selection.seats)

  if (!movie) return <NotFound />
  if (!ready) return <Navigate to={`/book/${id}`} replace />

  function onToggle(seatId) {
    if (booked.has(seatId)) return
    if (!selection.seats.includes(seatId) && selection.seats.length >= MAX_SEATS) {
      setNotice(`You can select up to ${MAX_SEATS} seats.`)
      return
    }
    toggleSeat(seatId)
    setNotice('')
  }

  const seatCount = selection.seats.length
  const seatLabel = `${seatCount} ${seatCount === 1 ? 'seat' : 'seats'}`

  function proceed() {
    if (!selection.seats.length) return
    navigate(`/book/${id}/summary`)
  }

  return (
    <div className="shell pt-8 pb-28 lg:pb-12">
      <BackLink to={`/book/${id}`}>Change show</BackLink>
      <div className="mt-4">
        <Stepper current="seats" />
      </div>
      <header className="mt-6">
        <h1 className="font-display text-3xl sm:text-4xl">{movie.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {theatre.name}, {theatre.city} · {formatLongDate(selection.date)} · {selection.time} ·{' '}
          {selection.format}
        </p>
      </header>

      <div className="mt-8 grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="w-full min-w-0 max-w-full overflow-clip rounded-3xl bg-panel px-3 py-6 ring-1 ring-white/10 sm:px-6">
          <SeatMap format={selection.format} booked={booked} selected={selected} onToggle={onToggle} />
          <p className="mt-4 text-center text-sm text-ember" aria-live="polite">
            {notice}
          </p>
        </div>
        <BookingAside>
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Seats</p>
          <h2 className="mt-2 font-display text-2xl">
            {selection.seats.length ? selection.seats.join(', ') : 'None yet'}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {seatCount ? `${seatLabel} selected` : 'None selected'} · up to {MAX_SEATS}
          </p>
          <p className="mt-4 text-sm text-cream/80">
            Total <span className="text-gold">{formatINR(pricing.total)}</span>
          </p>
          <Button className="mt-6 w-full" disabled={!selection.seats.length} onClick={proceed}>
            Continue
          </Button>
        </BookingAside>
      </div>

      <CheckoutBar
        kicker={seatCount ? seatLabel : 'Select seats'}
        title={selection.seats.length ? formatINR(pricing.total) : 'Tap available seats'}
        action="Continue"
        disabled={!selection.seats.length}
        onClick={proceed}
      />
    </div>
  )
}
