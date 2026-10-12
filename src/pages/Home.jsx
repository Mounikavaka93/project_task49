import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrow, IconChevron } from '../components/icons'
import MovieCard, { MovieMeta, Poster } from '../components/MovieCard'
import { Button, Eyebrow } from '../components/ui'
import { genres, movies, theatres } from '../data/catalog'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const banners = movies.filter((movie) => movie.banner)
const featured = movies.filter((movie) => movie.featured)
const topRated = [...movies].filter((movie) => movie.rating != null).sort((a, b) => b.rating - a.rating)

export default function Home() {
  useDocumentTitle('')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const movie = banners[index]

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [paused])

  function go(step) {
    setIndex((current) => (current + step + banners.length) % banners.length)
  }

  function onTouchStart(event) {
    event.currentTarget.dataset.x = String(event.changedTouches[0].clientX)
  }

  function onTouchEnd(event) {
    const start = Number(event.currentTarget.dataset.x || 0)
    const delta = event.changedTouches[0].clientX - start
    if (delta > 48) go(-1)
    if (delta < -48) go(1)
  }

  return (
    <div>
      <section
        className="relative min-h-[100svh] overflow-hidden"
        onMouseEnter={() => {
          if (window.matchMedia('(hover: hover)').matches) setPaused(true)
        }}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {banners.map((item, itemIndex) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              itemIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt=""
              className={`h-full w-full object-cover ${itemIndex === index ? 'ken' : ''}`}
              style={{ background: item.wash }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/88 to-ink/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 flex min-h-[100svh] items-end">
          <div className="shell w-full pt-28 pb-16">
            <div key={movie.id} className="rise max-w-3xl">
              <Eyebrow>Now showing</Eyebrow>
              <h1 className="mt-3 font-display text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
                {movie.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-cream/80">{movie.tagline}</p>
              <MovieMeta movie={movie} className="mt-5" />
              <div className="mt-7 flex flex-wrap gap-3">
                <Button as={Link} to={`/book/${movie.id}`}>
                  Book tickets
                </Button>
                <Button as={Link} to={`/movies/${movie.id}`} variant="ghost">
                  View details
                </Button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous film"
                  onClick={() => go(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-gold/50"
                >
                  <IconChevron />
                </button>
                <button
                  type="button"
                  aria-label="Next film"
                  onClick={() => go(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-gold/50"
                >
                  <IconArrow />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {banners.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={itemIndex === index}
                    onClick={() => setIndex(itemIndex)}
                    className={`h-1.5 rounded-full transition-all ${
                      itemIndex === index ? 'w-8 bg-gold' : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs tracking-[0.18em] text-cream/70">
                {String(index + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-white/10">
          <div
            key={index}
            className="loadbar h-full w-full bg-gold"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          />
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>In cinemas</Eyebrow>
            <h2 className="mt-2 font-display text-4xl">Featured films</h2>
          </div>
          <Link to="/movies" className="text-sm text-gold transition hover:text-cream">
            Browse all films
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {featured.map((item, itemIndex) => (
            <MovieCard key={item.id} movie={item} delay={itemIndex * 50} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] py-16 md:py-20">
        <div className="shell">
          <Eyebrow>Categories</Eyebrow>
          <h2 className="mt-2 font-display text-4xl">Browse by mood</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {genres.map((genre, index) => {
              const count = movies.filter((item) => item.genres.includes(genre)).length
              return (
                <Link
                  key={genre}
                  to={`/movies?genre=${encodeURIComponent(genre)}`}
                  className="rise rounded-2xl border border-white/10 bg-ink/40 px-4 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-gold/40"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <span className="text-[11px] tracking-[0.18em] text-gold uppercase">
                    {count} {count === 1 ? 'film' : 'films'}
                  </span>
                  <p className="mt-2 font-display text-2xl">{genre}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Eyebrow>Audiences</Eyebrow>
        <h2 className="mt-2 font-display text-4xl">Top rated</h2>
        <div className="no-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
          {topRated.map((item) => (
            <div key={item.id} className="w-40 shrink-0 snap-start sm:w-48">
              <MovieCard movie={item} />
            </div>
          ))}
        </div>
      </section>

      <section id="cinemas" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
        <div className="shell">
          <Eyebrow>Houses</Eyebrow>
          <h2 className="mt-2 max-w-xl font-display text-4xl">Four screens, tuned differently</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Pick a city when you choose a show. IMAX, Dolby Atmos, and classic 2D play across the circuit.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {theatres.map((theatre, index) => (
              <article
                key={theatre.id}
                className="rise rounded-3xl bg-panel p-5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-gold/40 sm:p-6"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <p className="text-xs tracking-[0.18em] text-gold uppercase">{theatre.city}</p>
                <h3 className="mt-2 font-display text-2xl">{theatre.name}</h3>
                <p className="mt-1 text-sm text-muted">{theatre.area}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {theatre.formats.map((format) => (
                    <li
                      key={format}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-cream/80 ring-1 ring-white/10"
                    >
                      {format}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="overflow-hidden rounded-[28px] bg-panel ring-1 ring-white/10 md:grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <Eyebrow>This week</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-balance">Hold the seats before the lights drop.</h2>
            <p className="mt-3 max-w-md text-muted">
              Choose a theatre, a time, and the exact chairs you want. Your confirmation stays on this device.
            </p>
            <Button as={Link} to="/movies" className="mt-6">
              See showtimes
            </Button>
          </div>
          <Poster movie={banners[0]} className="hidden h-full min-h-64 md:block" />
        </div>
      </section>
    </div>
  )
}
