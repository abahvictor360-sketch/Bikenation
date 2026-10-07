import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { useAuth } from '../auth'
import AuthLayout from '../components/AuthLayout'
import PasswordInput from '../components/PasswordInput'

export default function Register() {
  const { user, register } = useAuth()
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
    const password = String(f.get('password'))
    setError('')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    if (password !== f.get('confirm')) return setError('Passwords do not match.')
    setBusy(true)
    try {
      await register({ name: String(f.get('name')), email: String(f.get('email')), phone: String(f.get('phone')), password })
      nav(next, { replace: true })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout title="Create your" accent="account." subtitle="Join Bikenation to order bikes and gear and track your deliveries." image="/images/panigale-red.webp">
      <form className="form" onSubmit={submit}>
        <label className="span-2">
          Full name
          <input required name="name" autoComplete="name" placeholder="Jane Rider" />
        </label>
        <label>
          Email
          <input required type="email" name="email" autoComplete="email" placeholder="jane@email.com" />
        </label>
        <label>
          Phone
          <input required type="tel" name="phone" autoComplete="tel" placeholder="+234 800 000 0000" />
        </label>
        <label>
          Password
          <PasswordInput required name="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} />
        </label>
        <label>
          Confirm password
          <PasswordInput required name="confirm" autoComplete="new-password" placeholder="Repeat password" />
        </label>
        <AnimatePresence>
          {error && (
            <motion.p className="form-error span-2" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <button className="btn btn-red span-2" disabled={busy}>
          {busy ? 'Creating account…' : 'Create account'}
        </button>
        <p className="muted auth-switch span-2">
          Already have an account?{' '}
          <Link to={`/login?next=${encodeURIComponent(next)}`} className="red">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
