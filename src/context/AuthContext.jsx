import { useEffect, useState } from 'react'
import { DEMO_ACCOUNT } from '../lib/demoAccount'
import { AuthContext } from './auth-context'
const USERS_KEY = 'vespera-users'
const SESSION_KEY = 'vespera-session'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function loadUsers() {
  const stored = read(USERS_KEY, null)
  if (!Array.isArray(stored) || stored.length === 0) return [DEMO_ACCOUNT]
  if (stored.some((account) => account.email === DEMO_ACCOUNT.email)) return stored
  return [DEMO_ACCOUNT, ...stored]
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(() => read(SESSION_KEY, null))

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  function signup({ name, email, password }) {
    const normalized = email.trim().toLowerCase()
    if (users.some((account) => account.email === normalized)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const next = { name: name.trim(), email: normalized, password }
    setUsers((current) => [...current, next])
    setUser({ name: next.name, email: next.email })
    return { ok: true }
  }

  function login({ email, password }) {
    const normalized = email.trim().toLowerCase()
    const found = users.find((account) => account.email === normalized)
    if (!found || found.password !== password) {
      return { ok: false, error: 'Email or password does not match our records.' }
    }
    setUser({ name: found.name, email: found.email })
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
