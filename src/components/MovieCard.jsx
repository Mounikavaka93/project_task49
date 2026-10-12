import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDuration } from '../lib/format'
import { cn } from '../lib/cn'
import { IconStar } from './icons'
import { Rating } from './ui'

export function Poster({ movie, className }) {
  const [visible, setVisible] = useState(true)

  return (
    <div className={cn('relative overflow-hidden', className)} style={{ background: movie.wash }}>
      {visible ? (
        <img
          src={movie.poster || movie.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={() => setVisible(false)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-end p-4">
          <p className="font-display text-2xl leading-tight text-cream">{movie.title}</p>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-black/10" />
    </div>
  )
}

export function MovieMeta({ movie, className }) {
  return (
    <p className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cream/80', className)}>
      {movie.rating != null ? (
        <span className="inline-flex items-center gap-1 text-gold">
          <IconStar className="h-4 w-4" />
          {movie.rating.toFixed(1)}
        </span>
      ) : (
        <span className="text-gold">In theatres</span>
      )}
      {movie.duration ? <span>{formatDuration(movie.duration)}</span> : null}
      <span>{movie.language}</span>
      <span className="rounded border border-white/25 px-1.5 py-0.5 text-[11px] tracking-wide text-cream">
        {movie.certificate}
      </span>
      <span>{movie.genres.join(' / ')}</span>
    </p>
  )
}

export default function MovieCard({ movie, delay = 0, className }) {
  return (
    <article
      className={cn('rise group transition duration-300 hover:-translate-y-1.5', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link
        to={`/movies/${movie.id}`}
        className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-panel shadow-lg shadow-black/30 ring-1 ring-white/10 transition duration-300 group-hover:ring-gold/50">
          <Poster movie={movie} className="h-full w-full" />
          {movie.rating != null ? (
            <div className="absolute top-3 left-3">
              <Rating value={movie.rating} />
            </div>
          ) : (
            <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-2 py-1 text-xs font-medium text-gold backdrop-blur">
              Now showing
            </span>
          )}
          <span className="absolute right-3 bottom-3 translate-y-2 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Book
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg leading-tight text-cream transition group-hover:text-gold">
          {movie.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{movie.genres.join(' · ')}</p>
        <p className="text-sm text-muted">
          {movie.language}
          {movie.duration ? ` · ${formatDuration(movie.duration)}` : ''}
        </p>
      </Link>
    </article>
  )
}
