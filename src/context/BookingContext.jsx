import { useEffect, useState } from 'react'
import { BookingContext } from './booking-context'
import { MAX_SEATS, getMovie, getTheatre, quote } from '../data/catalog'
import { sortSeats } from '../lib/format'

const SELECTION_KEY = 'vespera-selection'
const BOOKINGS_KEY = 'vespera-bookings'

const emptySelection = {
  movieId: null,
  date: null,
  theatreId: null,
  format: null,
  time: null,
  seats: [],
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function readSession(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function BookingProvider({ children }) {
  const [selection, setSelection] = useState(() => readSession(SELECTION_KEY, emptySelection))
  const [bookings, setBookings] = useState(() => read(BOOKINGS_KEY, []))

  useEffect(() => {
    sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selection))
  }, [selection])

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
  }, [bookings])

  function setShow(next) {
    setSelection((current) => {
      const same =
        current.movieId === next.movieId &&
        current.date === next.date &&
        current.theatreId === next.theatreId &&
        current.format === next.format &&
        current.time === next.time
      return {
        movieId: next.movieId,
        date: next.date,
        theatreId: next.theatreId,
        format: next.format,
        time: next.time,
        seats: same ? current.seats : [],
      }
    })
  }

  function toggleSeat(seatId) {
    setSelection((current) => {
      if (current.seats.includes(seatId)) {
        return { ...current, seats: current.seats.filter((seat) => seat !== seatId) }
      }
      if (current.seats.length >= MAX_SEATS) return current
      return { ...current, seats: sortSeats([...current.seats, seatId]) }
    })
  }

  function confirmBooking(account, payment) {
    const movie = getMovie(selection.movieId)
    const theatre = getTheatre(selection.theatreId)
    const pricing = quote(selection.format, selection.seats)
    const booking = {
      id: `MQ${Date.now().toString(36).toUpperCase()}`,
      movieId: selection.movieId,
      movieTitle: movie.title,
      language: movie.language,
      certificate: movie.certificate,
      theatreId: selection.theatreId,
      theatreName: theatre.name,
      theatreArea: theatre.area,
      theatreCity: theatre.city,
      date: selection.date,
      format: selection.format,
      time: selection.time,
      seats: sortSeats(selection.seats),
      pricing,
      email: account.email,
      name: account.name,
      payment,
      createdAt: new Date().toISOString(),
    }
    setBookings((current) => [booking, ...current])
    setSelection(emptySelection)
    return booking
  }

  return (
    <BookingContext.Provider
      value={{ selection, bookings, setShow, toggleSeat, confirmBooking }}
    >
      {children}
    </BookingContext.Provider>
  )
}
