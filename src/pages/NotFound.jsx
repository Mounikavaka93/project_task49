import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Not found')
  return (
    <div className="shell py-24 text-center">
      <p className="text-xs tracking-[0.22em] text-gold uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl">That screening isn’t on the board.</h1>
      <p className="mt-3 text-muted">The page may have moved, or the link is missing a reel.</p>
      <div className="mt-6">
        <Button as={Link} to="/">
          Back home
        </Button>
      </div>
    </div>
  )
}
