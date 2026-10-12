import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { Button, Chip, Eyebrow } from '../components/ui'
import { genres, languages, movies } from '../data/catalog'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'rating', label: 'Top rated' },
  { id: 'title', label: 'A – Z' },
  { id: 'latest', label: 'Newest' },
]

function compareMovies(sort) {
  return (a, b) => {
    if (sort === 'rating') return (b.rating ?? -1) - (a.rating ?? -1)
    if (sort === 'title') return a.title.localeCompare(b.title)
    if (sort === 'latest') return b.release.localeCompare(a.release)
    return (
      Number(b.featured) - Number(a.featured) ||
      b.release.localeCompare(a.release) ||
      (b.rating ?? -1) - (a.rating ?? -1)
    )
  }
}

export default function Movies() {
  useDocumentTitle('Movies')
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const genre = params.get('genre') || 'All'
  const language = params.get('language') || 'All'
  const sort = params.get('sort') || 'featured'

  function setFilter(key, value) {
    const next = new URLSearchParams(params)
    const isDefault = value === '' || value === 'All' || (key === 'sort' && value === 'featured')
    if (isDefault) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const list = movies
    .filter((movie) => {
      const names = movie.cast.map((person) => (typeof person === 'string' ? person : person.name))
      const haystack = [movie.title, movie.director, movie.language, ...names, ...movie.genres]
        .join(' ')
        .toLowerCase()
      const matchesQuery = !q || haystack.includes(q.toLowerCase())
      const matchesGenre = genre === 'All' || movie.genres.includes(genre)
      const matchesLanguage = language === 'All' || movie.language === language
      return matchesQuery && matchesGenre && matchesLanguage
    })
    .slice()
    .sort(compareMovies(sort))

  const filtering = Boolean(q || genre !== 'All' || language !== 'All' || sort !== 'featured')

  return (
    <div className="pb-16">
      <div className="shell pt-10">
        <Eyebrow>Now showing</Eyebrow>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="font-display text-4xl md:text-5xl">Find a film</h1>
          <p className="text-sm text-muted">
            {list.length} {list.length === 1 ? 'film' : 'films'}
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-30 mt-6 border-y border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="shell grid gap-3 py-3">
          <label className="block">
            <span className="sr-only">Search movies</span>
            <input
              value={q}
              onChange={(event) => setFilter('q', event.target.value)}
              placeholder="Search titles, cast, or genres"
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-gold/50"
            />
          </label>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {['All', ...genres].map((item) => (
              <Chip key={item} active={genre === item} onClick={() => setFilter('genre', item)} aria-pressed={genre === item}>
                {item === 'All' ? 'All categories' : item}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="text-sm text-muted">
              <span className="sr-only">Language</span>
              <select
                aria-label="Filter by language"
                value={language}
                onChange={(event) => setFilter('language', event.target.value)}
                className="h-10 rounded-full border border-white/10 bg-ink px-3 text-sm text-cream outline-none focus:border-gold/50"
              >
                <option value="All">All languages</option>
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-muted">
              <span className="sr-only">Sort</span>
              <select
                aria-label="Sort movies"
                value={sort}
                onChange={(event) => setFilter('sort', event.target.value)}
                className="h-10 rounded-full border border-white/10 bg-ink px-3 text-sm text-cream outline-none focus:border-gold/50"
              >
                {sorts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            {filtering ? (
              <button
                type="button"
                onClick={() => setParams({})}
                className="rounded-full px-3 py-2 text-sm text-gold transition hover:text-cream"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="shell pt-8">
        {list.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
            <h2 className="font-display text-3xl">No films found</h2>
            <p className="mt-2 text-muted">Try another title, category, or language.</p>
            <Button className="mt-6" onClick={() => setParams({})}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {list.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} delay={Math.min(index, 8) * 40} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
