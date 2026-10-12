export function todayISO() {
  return toISODate(new Date())
}

export function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function upcomingDates(count = 6) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    date.setDate(date.getDate() + index)
    return date
  })
}

function parseISODate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function dateParts(iso) {
  const date = parseISODate(iso)
  return {
    weekday: date.toLocaleDateString('en-IN', { weekday: 'short' }),
    day: date.getDate(),
    month: date.toLocaleDateString('en-IN', { month: 'short' }),
  }
}

export function formatLongDate(iso) {
  return parseISODate(iso).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function isSameDay(iso, date = new Date()) {
  return iso === toISODate(date)
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins ? `${hours}h ${mins}m` : `${hours}h`
}

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function sortSeats(seats) {
  return [...seats].sort((a, b) => {
    if (a[0] === b[0]) return Number(a.slice(1)) - Number(b.slice(1))
    return a[0].localeCompare(b[0])
  })
}

export function groupSeatLines(lines) {
  const groups = []
  for (const line of lines) {
    const last = groups[groups.length - 1]
    if (last && last.tier === line.tier && last.unit === line.price) {
      last.count += 1
      last.seats.push(line.id)
    } else {
      groups.push({ tier: line.tier, unit: line.price, count: 1, seats: [line.id] })
    }
  }
  return groups
}

export function formatBookedAt(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
