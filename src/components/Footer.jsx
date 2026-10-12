import { Link } from 'react-router-dom'
import { theatres } from '../data/catalog'
import { Logo } from './ui'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Four houses, one standard of picture and sound. Book a seat, settle in, and let the room go dark.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-gold uppercase">Explore</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            <li>
              <Link to="/movies" className="transition hover:text-cream">
                Now showing
              </Link>
            </li>
            <li>
              <Link to="/#cinemas" className="transition hover:text-cream">
                Our houses
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="transition hover:text-cream">
                My tickets
              </Link>
            </li>
            <li>
              <Link to="/signup" className="transition hover:text-cream">
                Create an account
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-gold uppercase">Houses</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {theatres.map((theatre) => (
              <li key={theatre.id}>
                {theatre.name}
                <span className="text-cream/50"> · {theatre.city}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="shell py-4 text-xs text-muted">
          © {YEAR} MOVIQ Cinemas. Demo booking — no payment is taken and no real tickets are issued.
        </p>
      </div>
    </footer>
  )
}
