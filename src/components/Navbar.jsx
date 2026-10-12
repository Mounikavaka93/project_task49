import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { cn } from '../lib/cn'
import { IconClose, IconMenu, IconSearch } from './icons'
import { Button, Logo } from './ui'

function navClass(isActive) {
  return cn('text-sm transition', isActive ? 'text-cream' : 'text-muted hover:text-cream')
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const urlQuery = params.get('q') || ''
  const routeKey = `${location.pathname}${location.hash}`
  const [query, setQuery] = useState(urlQuery)
  const [syncedQuery, setSyncedQuery] = useState(urlQuery)
  const [open, setOpen] = useState(false)
  const [openRoute, setOpenRoute] = useState(routeKey)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12)
  const home = location.pathname === '/'
  const solid = scrolled || !home || open

  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery)
    setQuery(urlQuery)
  }

  if (routeKey !== openRoute) {
    setOpenRoute(routeKey)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function onSearch(event) {
    event.preventDefault()
    const next = query.trim()
    navigate(next ? `/movies?q=${encodeURIComponent(next)}` : '/movies')
    setOpen(false)
  }

  const links = (
    <>
      <NavLink to="/movies" end className={({ isActive }) => navClass(isActive)}>
        Movies
      </NavLink>
      <Link
        to="/#cinemas"
        className={cn(
          'text-sm transition',
          location.pathname === '/' && location.hash === '#cinemas'
            ? 'text-cream'
            : 'text-muted hover:text-cream',
        )}
      >
        Cinemas
      </Link>
      <NavLink to="/tickets" end className={({ isActive }) => navClass(isActive)}>
        Tickets
      </NavLink>
    </>
  )

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 border-b transition duration-300',
        solid ? 'border-white/10 bg-ink/90 backdrop-blur-xl' : 'border-transparent',
      )}
    >
      <div className="shell flex h-full items-center gap-3 md:gap-5">
        <Link to="/" aria-label="MOVIQ home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 md:flex">{links}</nav>
        <form onSubmit={onSearch} className="hidden min-w-0 flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Search movies</span>
            <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search films, cast, genres"
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 pr-3 pl-9 text-sm text-cream outline-none transition placeholder:text-muted/70 focus:border-gold/50"
            />
          </label>
        </form>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="flex items-center gap-2 text-sm text-cream">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-xs font-semibold text-ink">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-24 truncate">{user.name.split(' ')[0]}</span>
              </span>
              <button type="button" onClick={logout} className="text-sm text-muted transition hover:text-cream">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-sm text-muted transition hover:text-cream">
                Sign up
              </Link>
              <Button as={Link} to="/login">
                Sign in
              </Button>
            </>
          )}
        </div>
        <button
          type="button"
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
      {open ? (
        <div className="menu-in fixed inset-0 top-16 z-40 overflow-y-auto bg-ink md:hidden">
          <div className="shell py-6">
            <form onSubmit={onSearch}>
              <label className="relative block">
                <span className="sr-only">Search movies</span>
                <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search films"
                  className="w-full rounded-full border border-white/10 bg-white/5 py-3 pr-3 pl-10 text-sm outline-none focus:border-gold/50"
                />
              </label>
            </form>
            <nav className="mt-8 grid gap-4 text-lg">{links}</nav>
            <div className="mt-8 grid gap-3">
              {user ? (
                <>
                  <p className="text-sm text-muted">Signed in as {user.name}</p>
                  <Button onClick={logout}>Log out</Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login">
                    Sign in
                  </Button>
                  <Button as={Link} to="/signup" variant="ghost">
                    Create an account
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
