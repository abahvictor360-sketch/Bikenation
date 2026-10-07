import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { useAuth } from '../auth'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'

export default function Login() {
  const { user, login } = useAuth()
  const [params] = useSearchParams()
  const next = params.get('next') || '/account'
  const nav = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const isPresent = useIsPresent()

  // Already signed in (and not just animating out after submitting): skip the form.
  if (user && isPresent) return <Navigate to={next} replace />

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true)
    setError('')
    try {
      await login(String(f.get('email')), String(f.get('password')))
      nav(next, { replace: true })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout title="Welcome" accent="back." subtitle="Log in to your Bikenation account." image="/images/stealth-x.webp">
      <form className="form form-1" onSubmit={submit}>
        <label>
          Email
          <input required type="email" name="email" autoComplete="email" placeholder="jane@email.com" />
        </label>
        <label>
          Password
          <PasswordInput required name="password" autoComplete="current-password" placeholder="Your password" />
        </label>
        <AnimatePresence>
          {error && (
            <motion.p className="form-error" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <button className="btn btn-dark btn-block" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
        <p className="muted auth-switch">
          New to Bikenation?{' '}
          <Link to={`/register?next=${encodeURIComponent(next)}`} className="red">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
