import { useState } from 'react'
import { cn } from '../lib/cn'

function personOf(person) {
  return typeof person === 'string' ? { name: person } : person
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Portrait({ person }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = person.image && !failed

  return (
    <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
      {showPhoto ? (
        <img
          src={person.image}
          alt=""
          className="h-full w-full object-cover object-[center_20%]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="grid h-full place-items-center font-display text-2xl text-gold">{initials(person.name)}</div>
      )}
    </div>
  )
}

export default function CastList({ cast, compact = false }) {
  const people = cast.map(personOf)

  return (
    <ul className={cn(compact ? 'flex gap-3 overflow-x-auto pb-1' : 'grid grid-cols-2 gap-4 sm:grid-cols-4')}>
      {people.map((person) => (
        <li key={person.name} className={cn(compact && 'w-28 shrink-0')}>
          <Portrait person={person} />
          <p className="mt-2 text-sm leading-5 text-cream">{person.name}</p>
          {person.role ? <p className="text-xs text-muted">{person.role}</p> : null}
        </li>
      ))}
    </ul>
  )
}
