import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BookingAside, CheckoutBar } from '../components/BookingChrome'
import PaymentForm from '../components/PaymentForm'
import Stepper from '../components/Stepper'
import TicketCard from '../components/TicketCard'
import { BackLink, Button } from '../components/ui'
import { bookedSeatIds, getMovie, getTheatre, quote } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { useBooking } from '../context/useBooking'
import { formatINR, groupSeatLines } from '../lib/format'
import { emptyPayment, paymentSnapshot, validatePayment } from '../lib/payment'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const DRAFT_KEY = 'vespera-payment-draft'

function readDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? { ...emptyPayment, ...JSON.parse(raw), cvv: '' } : emptyPayment
  } catch {
    return emptyPayment
  }
}

export default function Summary() {
  useDocumentTitle('Review and pay')
  const navigate = useNavigate()
  const { user } = useAuth()
  const { selection, bookings, confirmBooking } = useBooking()
  const movie = getMovie(selection.movieId)
  const theatre = getTheatre(selection.theatreId)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [payment, setPayment] = useState(readDraft)
  const [busy, setBusy] = useState(false)
  const [pendingId, setPendingId] = useState(null)
  const lock = useRef(false)

  useEffect(() => {
    const draft = { ...payment, cvv: '' }
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [payment])

  useEffect(() => {
    if (pendingId) navigate(`/confirmation/${pendingId}`)
  }, [pendingId, navigate])

  const pricing = useMemo(
    () => quote(selection.format, selection.seats),
    [selection.format, selection.seats],
  )
  const groups = useMemo(() => groupSeatLines(pricing.lines), [pricing.lines])

  if (pendingId) return null
  if (!movie || !theatre || !selection.date || !selection.time) {
    return <Navigate to="/movies" replace />
  }
  if (!selection.seats.length) {
    return <Navigate to={`/book/${movie.id}/seats`} replace />
  }

  const preview = {
    movieTitle: movie.title,
    language: movie.language,
    certificate: movie.certificate,
    theatreName: theatre.name,
    theatreArea: theatre.area,
    theatreCity: theatre.city,
    date: selection.date,
    time: selection.time,
    format: selection.format,
    seats: selection.seats,
  }

  function confirm() {
    if (lock.current) return
    const taken = bookedSeatIds(selection, bookings)
    const clash = selection.seats.filter((seat) => taken.has(seat))
    if (clash.length) {
      setError(`${clash.join(', ')} just got booked. Pick different seats.`)
      return
    }
    const nextErrors = validatePayment(payment)
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setError('Check the payment details and try again.')
      return
    }
    if (!user) {
      navigate('/login', { state: { from: `/book/${movie.id}/summary` } })
      return
    }
    lock.current = true
    setBusy(true)
    setError('')
    const paid = paymentSnapshot(payment)
    window.setTimeout(() => {
      const booking = confirmBooking(user, paid)
      sessionStorage.removeItem(DRAFT_KEY)
      setPendingId(booking.id)
    }, 600)
  }

  const breakdown = (
    <div>
      <p className="text-xs tracking-[0.16em] text-muted uppercase">To pay</p>
      <div className="mt-4 grid gap-3">
        {groups.map((group) => (
          <div key={group.tier} className="flex items-start justify-between gap-4 text-sm">
            <div>
              <p>{group.tier}</p>
              <p className="text-xs text-muted">
                {group.seats.join(', ')} · {group.count} × {formatINR(group.unit)}
              </p>
            </div>
            <p>{formatINR(group.unit * group.count)}</p>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 text-sm text-muted">
          <span>Convenience fee</span>
          <span>{formatINR(pricing.fee)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-base">
          <span>Total</span>
          <span className="text-gold">{formatINR(pricing.total)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted">
        Ticket prices include taxes. This demo does not charge the card or UPI ID.
      </p>
      {error ? <p className="mt-3 text-sm text-ember">{error}</p> : null}
      <div className="mt-5 hidden lg:block">
        <Button className="w-full" onClick={confirm} disabled={busy}>
          {busy ? 'Processing payment…' : user ? `Pay ${formatINR(pricing.total)}` : 'Sign in to pay'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="shell pt-8 pb-28 lg:pb-12">
      <BackLink to={`/book/${movie.id}/seats`}>Edit seats</BackLink>
      <div className="mt-4">
        <Stepper current="summary" />
      </div>
      <h1 className="mt-6 font-display text-3xl sm:text-4xl">Review and pay</h1>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4">
          <TicketCard movie={movie} ticket={preview} />
          <PaymentForm
            value={payment}
            errors={fieldErrors}
            onChange={(next) => {
              setPayment(next)
              setFieldErrors({})
              setError('')
            }}
          />
          <div className="rounded-3xl bg-panel p-5 ring-1 ring-white/10 lg:hidden">{breakdown}</div>
        </div>
        <BookingAside>{breakdown}</BookingAside>
      </div>
      <CheckoutBar
        kicker={user ? 'Amount due' : 'Sign in required'}
        title={formatINR(pricing.total)}
        action={busy ? 'Paying…' : 'Pay'}
        disabled={busy}
        onClick={confirm}
      />
    </div>
  )
}
