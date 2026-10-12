import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthShell, { AuthFooterLink } from '../components/AuthShell'
import { Button, Field } from '../components/ui'
import { useAuth } from '../context/useAuth'
import { DEMO_ACCOUNT } from '../lib/demoAccount'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Login() {
  useDocumentTitle('Sign in')
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [show, setShow] = useState(false)

  if (user) return <Navigate to={from} replace />

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors({})
    setFormError('')
  }

  function onSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Enter your password.'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    const result = login(form)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    navigate(from, { replace: true })
  }

  function useDemo() {
    const result = login(DEMO_ACCOUNT)
    if (result.ok) navigate(from, { replace: true })
    else setFormError(result.error)
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to confirm a booking or open the tickets saved on this browser."
      footer={<AuthFooterLink to="/signup" state={{ from }} prompt="New here?" action="Create an account" />}
    >
      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <Field
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(event) => update('email', event.target.value)}
        />
        <Field
          label="Password"
          type={show ? 'text' : 'password'}
          name="password"
          autoComplete="current-password"
          value={form.password}
          error={errors.password}
          onChange={(event) => update('password', event.target.value)}
          end={
            <button
              type="button"
              className="px-2 text-xs text-muted"
              onClick={() => setShow((value) => !value)}
            >
              {show ? 'Hide' : 'Show'}
            </button>
          }
        />
        {formError ? <p className="text-sm text-ember">{formError}</p> : null}
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <button
        type="button"
        onClick={useDemo}
        className="mt-4 w-full rounded-2xl border border-dashed border-white/15 px-4 py-3 text-left transition hover:border-gold/40"
      >
        <span className="block text-sm text-cream">Use the demo account</span>
        <span className="text-xs text-muted">
          {DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}
        </span>
      </button>
    </AuthShell>
  )
}
