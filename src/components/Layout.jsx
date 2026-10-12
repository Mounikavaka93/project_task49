import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '../lib/cn'
import Entrance from './Entrance'
import { hasEntered, markEntered } from '../lib/entrance'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const { pathname } = useLocation()
  const home = pathname === '/'
  const booking = pathname.startsWith('/book')
  const [entered, setEntered] = useState(hasEntered)

  function closeEntrance() {
    markEntered()
    setEntered(true)
  }

  return (
    <div className="flex min-h-svh flex-col">
      {home && !entered ? <Entrance onDone={closeEntrance} /> : null}
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="content" tabIndex={-1} className={cn('flex-1 outline-none', home ? '' : 'pt-16')}>
        <div key={pathname} className={booking ? undefined : 'page-in'}>
          <Outlet />
        </div>
      </main>
      {booking ? null : <Footer />}
    </div>
  )
}
