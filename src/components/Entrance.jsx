import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './ui'

const BEATS = [
  { hold: 1900, kicker: 'Role', line: 'Tonight you are not in the seats.' },
  { hold: 2100, kicker: 'Ext. Lane — night', line: 'Rain. Footsteps that are not yours.' },
  { hold: 1700, kicker: 'Action', line: 'Don’t look back. Run.' },
  { hold: 2000, kicker: 'Int. MOVIQ', line: 'The doors take the hit.' },
]

export default function Entrance({ onDone }) {
  const [beat, setBeat] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const closed = useRef(false)
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])
  const finish = useCallback(() => {
    if (closed.current) return
    closed.current = true
    setLeaving(true)
    window.setTimeout(() => onDoneRef.current(), 480)
  }, [])
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const title = reduced || beat >= BEATS.length

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    if (reduced || title) return undefined
    const timer = window.setTimeout(() => setBeat((current) => current + 1), BEATS[beat].hold)
    return () => window.clearTimeout(timer)
  }, [beat, reduced, title])

  useEffect(() => {
    if (!title || reduced) return undefined
    const timer = window.setTimeout(finish, 4200)
    return () => window.clearTimeout(timer)
  }, [title, reduced, finish])

  const scene = title ? null : BEATS[beat]

  return (
    <div className={`entrance${leaving ? ' entrance-out' : ''}`} role="dialog" aria-label="Opening">
      <div className="entrance-grain" />
      <div className="entrance-letterbox" />
      {beat === 1 || beat === 2 ? <div className="entrance-rain" /> : null}
      {beat === 2 ? <div className="entrance-shake" /> : null}
      {beat === 2 ? <div className="runner" aria-hidden="true" /> : null}
      {beat === 2 ? <div className="slash" aria-hidden="true" /> : null}
      {beat === 3 ? (
        <div className="doors" aria-hidden="true">
          <span className="door door-left" />
          <span className="door door-right" />
          <span className="door-glow" />
        </div>
      ) : null}

      <button type="button" className="entrance-skip" onClick={finish}>
        Skip
      </button>

      <div className="entrance-stage">
        {scene ? (
          <div key={beat} className="entrance-card">
            <p className="entrance-kicker">{scene.kicker}</p>
            <p className="entrance-line">{scene.line}</p>
          </div>
        ) : (
          <div className="entrance-card entrance-title">
            <p className="entrance-kicker">Now showing</p>
            <h1 className="font-display text-6xl text-cream sm:text-7xl">MOVIQ</h1>
            <p className="entrance-line">The seat with your name on it is still warm.</p>
            <Button className="mt-8" onClick={finish}>
              Take your seat
            </Button>
          </div>
        )}
      </div>

      <ol className="entrance-ticks" aria-hidden="true">
        {BEATS.map((item, index) => (
          <li key={item.kicker} className={index <= beat ? 'is-on' : undefined} />
        ))}
      </ol>
    </div>
  )
}
