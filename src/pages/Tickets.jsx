import { Link, Navigate } from 'react-router-dom'
import TicketCard from '../components/TicketCard'
import { Button, Eyebrow } from '../components/ui'
import { getMovie } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { useBooking } from '../context/useBooking'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Tickets() {
  useDocumentTitle('My tickets')
  const { user } = useAuth()
  const { bookings } = useBooking()

  if (!user) return <Navigate to="/login" replace state={{ from: '/tickets' }} />

  const mine = bookings.filter((booking) => booking.email === user.email)

  return (
    <div className="shell py-12">
      <Eyebrow>Account</Eyebrow>
      <h1 className="mt-2 font-display text-4xl">My tickets</h1>
      <p className="mt-2 text-sm text-muted">Bookings saved in this browser for {user.email}.</p>
      {mine.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
          <h2 className="font-display text-3xl">No tickets yet</h2>
          <p className="mt-2 text-muted">When you confirm a booking, it will show up here.</p>
          <Button as={Link} to="/movies" className="mt-6">
            Browse films
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-3">
          {mine.map((booking) => (
            <Link key={booking.id} to={`/confirmation/${booking.id}`} className="group block">
              <TicketCard movie={getMovie(booking.movieId)} ticket={booking} compact />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
