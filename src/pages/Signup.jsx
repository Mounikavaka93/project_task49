import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthShell, { AuthFooterLink } from '../components/AuthShell'
import { Button, Field } from '../components/ui'
import { useAuth } from '../context/useAuth'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const empty = { name: '', email: '', password: '', confirm: '' }

export default function Signup() {
  useDocumentTitle('Create account')
  const { user, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [form, setForm] = useState(empty)
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
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (form.password.length < 6) next.password = 'Use at least 6 characters.'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    const result = signup(form)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <AuthShell
      title="Create an account"
      subtitle="Your profile stays in this browser. Use it to hold tickets after checkout."
      footer={<AuthFooterLink to="/login" state={{ from }} prompt="Already registered?" action="Sign in" />}
    >
      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={(event) => update('name', event.target.value)}
        />
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
          autoComplete="new-password"
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
        <Field
          label="Confirm password"
          type={show ? 'text' : 'password'}
          name="confirm"
          autoComplete="new-password"
          value={form.confirm}
          error={errors.confirm}
          onChange={(event) => update('confirm', event.target.value)}
        />
        {formError ? <p className="text-sm text-ember">{formError}</p> : null}
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
    </AuthShell>
  )
}
