const ENTERED_KEY = 'vespera-entered'

export function hasEntered() {
  try {
    return sessionStorage.getItem(ENTERED_KEY) === '1'
  } catch {
    return false
  }
}

export function markEntered() {
  try {
    sessionStorage.setItem(ENTERED_KEY, '1')
  } catch {
    // The entrance can still close if storage is blocked.
  }
}
