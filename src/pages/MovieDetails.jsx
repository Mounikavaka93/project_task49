import { Link, useNavigate, useParams } from 'react-router-dom'
import CastList from '../components/CastList'
import { Poster, MovieMeta } from '../components/MovieCard'
import { Button, Eyebrow } from '../components/ui'
import NotFound from './NotFound'
import { getMovie, slotsFor, theatres } from '../data/catalog'
import { useBooking } from '../context/useBooking'
import { todayISO } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function MovieDetails() {
  const { id } = useParams()
  const movie = getMovie(id)
  useDocumentTitle(movie ? movie.title : 'Film')
  const navigate = useNavigate()
  const { setShow } = useBooking()

  if (!movie) return <NotFound />

  function choose(theatre, format, time) {
    setShow({
      movieId: movie.id,
      date: todayISO(),
      theatreId: theatre.id,
      format,
      time,
    })
    navigate(`/book/${movie.id}/seats`)
  }

  return (
    <div className="pb-16">
      <div className="relative h-[42vh] min-h-64 overflow-hidden">
        <img src={movie.image} alt="" className="ken h-full w-full object-cover" style={{ background: movie.wash }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      </div>

      <div className="shell relative z-10 -mt-28 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="mx-auto w-44 md:mx-0 md:w-auto">
          <Poster
            movie={movie}
            className="aspect-[2/3] rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-white/15"
          />
        </div>
        <div className="pt-2 md:pt-16">
          <Eyebrow>{movie.genres.join(' · ')}</Eyebrow>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{movie.title}</h1>
          <p className="mt-3 max-w-xl text-lg text-cream/75">{movie.tagline}</p>
          <MovieMeta movie={movie} className="mt-4" />
          {movie.votes ? <p className="mt-2 text-sm text-muted">{movie.votes} votes</p> : null}
          <div className="mt-6">
            <Button as={Link} to={`/book/${movie.id}`}>
              Choose theatre and time
            </Button>
          </div>
        </div>
      </div>

      <div className="shell mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <h2 className="font-display text-2xl">About</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-cream/80">{movie.description}</p>
          <p className="mt-6 text-sm text-muted">
            Directed by <span className="text-cream">{movie.director}</span>
          </p>
          <h2 className="mt-10 font-display text-2xl">Cast</h2>
          <div className="mt-4">
            <CastList cast={movie.cast} />
          </div>
        </div>
        <aside className="rounded-3xl bg-panel p-5 ring-1 ring-white/10">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Language</p>
          <p className="mt-1 text-lg">{movie.language}</p>
          <p className="mt-4 text-xs tracking-[0.16em] text-muted uppercase">Certificate</p>
          <p className="mt-1 text-lg">{movie.certificate}</p>
          <p className="mt-4 text-xs tracking-[0.16em] text-muted uppercase">Rating</p>
          <p className="mt-1 text-lg text-gold">
            {movie.rating != null ? `${movie.rating.toFixed(1)} / 10` : 'In theatres'}
          </p>
        </aside>
      </div>

      <section className="shell mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Eyebrow>Today</Eyebrow>
            <h2 className="mt-2 font-display text-3xl">Show timings</h2>
          </div>
          <Link to={`/book/${movie.id}`} className="text-sm text-gold transition hover:text-cream">
            More dates and cities
          </Link>
        </div>
        <div className="mt-6 grid gap-4">
          {theatres.map((theatre) => (
            <article key={theatre.id} className="rounded-3xl bg-panel p-4 ring-1 ring-white/10 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl">{theatre.name}</h3>
                <p className="text-sm text-muted">
                  {theatre.area}, {theatre.city}
                </p>
              </div>
              <div className="mt-4 grid gap-3">
                {theatre.formats.map((format) => (
                  <div key={format} className="grid items-center gap-2 sm:grid-cols-[9rem_minmax(0,1fr)]">
                    <p className="text-sm text-gold">{format}</p>
                    <div className="flex flex-wrap gap-2">
                      {slotsFor(movie.id, theatre.id, format).map((time) => (
                        <button
                          key={`${format}-${time}`}
                          type="button"
                          onClick={() => choose(theatre, format, time)}
                          className="inline-flex min-h-10 min-w-24 items-center justify-center rounded-xl border border-white/10 px-3 text-sm text-cream transition hover:border-gold hover:bg-gold/10 hover:text-gold"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
