import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookingAside, CheckoutBar } from '../components/BookingChrome'
import CastList from '../components/CastList'
import { Poster } from '../components/MovieCard'
import Stepper from '../components/Stepper'
import { BackLink, Button, Chip } from '../components/ui'
import NotFound from './NotFound'
import { cities, getMovie, getTheatre, slotsFor, theatres } from '../data/catalog'
import { useBooking } from '../context/useBooking'
import { dateParts, formatLongDate, isSameDay, toISODate, upcomingDates } from '../lib/format'
import { cn } from '../lib/cn'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function SelectShow() {
  const { id } = useParams()
  const movie = getMovie(id)
  useDocumentTitle(movie ? `Showtimes · ${movie.title}` : 'Showtimes')
  const navigate = useNavigate()
  const { selection, setShow } = useBooking()
  const dates = useMemo(() => upcomingDates(6).map((date) => toISODate(date)), [])
  const [date, setDate] = useState(() =>
    selection.movieId === id && selection.date ? selection.date : dates[0],
  )
  const [city, setCity] = useState('All')
  const [trackedId, setTrackedId] = useState(id)

  if (trackedId !== id) {
    setTrackedId(id)
    setDate(selection.movieId === id && selection.date ? selection.date : dates[0])
    setCity('All')
  }

  if (!movie) return <NotFound />

  const visible = theatres.filter((theatre) => city === 'All' || theatre.city === city)
  const active =
    selection.movieId === movie.id &&
    selection.date === date &&
    selection.theatreId &&
    selection.format &&
    selection.time
      ? selection
      : null
  const activeTheatre = active ? getTheatre(active.theatreId) : null

  function pick(theatre, format, time) {
    setShow({
      movieId: movie.id,
      date,
      theatreId: theatre.id,
      format,
      time,
    })
  }

  function proceed() {
    if (!active) return
    navigate(`/book/${movie.id}/seats`)
  }

  return (
    <div className="shell pt-8 pb-28 lg:pb-12">
      <BackLink to={`/movies/${movie.id}`}>Back to film</BackLink>
      <div className="mt-4">
        <Stepper current="show" />
      </div>
      <header className="mt-6 flex items-center gap-4">
        <Poster movie={movie} className="h-24 w-16 shrink-0 rounded-xl" />
        <div>
          <h1 className="font-display text-3xl sm:text-4xl">{movie.title}</h1>
          <p className="mt-1 text-sm text-muted">
            {movie.language} · {movie.certificate}
          </p>
        </div>
      </header>
      <section className="mt-8">
        <h2 className="font-display text-2xl">Cast</h2>
        <div className="mt-4">
          <CastList cast={movie.cast} />
        </div>
      </section>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {dates.map((iso) => {
              const parts = dateParts(iso)
              const selected = iso === date
              return (
                <button
                  key={iso}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setDate(iso)}
                  className={cn(
                    'flex w-16 shrink-0 flex-col items-center rounded-2xl py-2 text-sm transition',
                    selected ? 'bg-gold text-ink' : 'bg-white/5 text-cream ring-1 ring-white/10 hover:ring-gold/40',
                  )}
                >
                  <span className="text-[10px] tracking-wide uppercase">
                    {isSameDay(iso) ? 'Today' : parts.weekday}
                  </span>
                  <span className="font-display text-lg leading-tight">{parts.day}</span>
                  <span className="text-[10px]">{parts.month}</span>
                </button>
              )
            })}
          </div>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {['All', ...cities].map((item) => (
              <Chip key={item} active={city === item} onClick={() => setCity(item)} aria-pressed={city === item}>
                {item === 'All' ? 'All cities' : item}
              </Chip>
            ))}
          </div>

          <div className="mt-5 grid gap-4">
            {visible.map((theatre) => (
              <article key={theatre.id} className="rounded-3xl bg-panel p-4 ring-1 ring-white/10 sm:p-5">
                <h2 className="font-display text-xl">{theatre.name}</h2>
                <p className="mt-1 text-sm text-muted">
                  {theatre.area}, {theatre.city}
                </p>
                <div className="mt-4 grid gap-3">
                  {theatre.formats.map((format) => (
                    <div key={format} className="grid items-center gap-2 sm:grid-cols-[9rem_minmax(0,1fr)]">
                      <p className="text-sm text-gold">{format}</p>
                      <div className="flex flex-wrap gap-2">
                        {slotsFor(movie.id, theatre.id, format).map((time) => {
                          const selected =
                            active &&
                            active.theatreId === theatre.id &&
                            active.format === format &&
                            active.time === time
                          return (
                            <button
                              key={`${format}-${time}`}
                              type="button"
                              aria-pressed={Boolean(selected)}
                              onClick={() => pick(theatre, format, time)}
                              className={cn(
                                'inline-flex min-h-10 min-w-24 items-center justify-center rounded-xl border px-3 text-sm transition',
                                selected
                                  ? 'border-gold bg-gold text-ink'
                                  : 'border-white/10 text-cream hover:border-gold hover:bg-gold/10',
                              )}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <BookingAside>
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Your show</p>
          <h2 className="mt-2 font-display text-2xl">{movie.title}</h2>
          {active && activeTheatre ? (
            <div className="mt-4 text-sm leading-6 text-cream/85">
              <p>{activeTheatre.name}</p>
              <p className="text-muted">
                {activeTheatre.area}, {activeTheatre.city}
              </p>
              <p className="mt-2">
                {formatLongDate(active.date)} · {active.time}
              </p>
              <p className="text-gold">{active.format}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Choose a city, a theatre, and a time to continue.</p>
          )}
          <Button className="mt-6 w-full" disabled={!active} onClick={proceed}>
            Select seats
          </Button>
        </BookingAside>
      </div>

      <CheckoutBar
        kicker={active ? active.format : 'Showtime'}
        title={
          active && activeTheatre
            ? `${activeTheatre.name} · ${active.time}`
            : 'Choose a theatre and time'
        }
        action="Select seats"
        disabled={!active}
        onClick={proceed}
      />
    </div>
  )
}
