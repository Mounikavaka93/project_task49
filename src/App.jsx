import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import Confirmation from './pages/Confirmation'
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound'
import Seats from './pages/Seats'
import SelectShow from './pages/SelectShow'
import Signup from './pages/Signup'
import Summary from './pages/Summary'
import Tickets from './pages/Tickets'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="movies" element={<Movies />} />
              <Route path="movies/:id" element={<MovieDetails />} />
              <Route path="book/:id" element={<SelectShow />} />
              <Route path="book/:id/seats" element={<Seats />} />
              <Route path="book/:id/summary" element={<Summary />} />
              <Route path="confirmation/:bookingId" element={<Confirmation />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
