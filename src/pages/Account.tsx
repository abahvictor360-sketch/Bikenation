import { useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { ORDER_STEPS, initials, orderStep, useAuth } from '../auth'
import { money } from '../data'
import Reveal from '../components/Reveal'
import OrderProgress from '../components/OrderProgress'
import PasswordInput from '../components/PasswordInput'

const tabs = ['Orders', 'Profile', 'Security'] as const
const date = (t: number) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Account() {
  const { user, logout, orders } = useAuth()
  const [tab, setTab] = useState<(typeof tabs)[number]>('Orders')
  const nav = useNavigate()
  // While this page animates out (e.g. right after logging out) it must not redirect.
  const isPresent = useIsPresent()
  // Router navigations run as transitions, so logout() re-renders this page before nav('/') lands.
  const loggingOut = useRef(false)

  if (!user) return isPresent && !loggingOut.current ? <Navigate to="/login?next=/account" replace /> : null

  const spent = orders.reduce((s, o) => s + o.total, 0)

  return (
    <section className="section page-top">
      <Reveal className="acct-head">
        <div className="avatar">{initials(user.name)}</div>
        <div className="acct-who">
          <span className="eyebrow">My account</span>
          <h1 className="display-3">Hi, {user.name.split(' ')[0]}</h1>
          <p className="muted">
            {user.email} · Member since {date(user.createdAt)}
          </p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => {
            loggingOut.current = true
            logout()
            nav('/')
          }}
        >
          Log out
        </button>
      </Reveal>

      <div className="acct-stats">
        {[
          { v: orders.length, l: 'Orders' },
          { v: money(Math.round(spent * 100) / 100), l: 'Total spent' },
          { v: orders.filter((o) => orderStep(o.createdAt) < 3).length, l: 'In progress' },
        ].map((s, i) => (
          <Reveal key={s.l} className="stat" delay={i * 0.06}>
            <strong>{s.v}</strong>
            <span className="muted">{s.l}</span>
          </Reveal>
        ))}
      </div>

      <div className="seg acct-tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={'seg-btn' + (tab === t ? ' on' : '')} onClick={() => setTab(t)}>
            {tab === t && <motion.span layoutId="acct-tab" className="seg-bg" />}
            <span>{t}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          {tab === 'Orders' && <Orders />}
          {tab === 'Profile' && <Profile />}
          {tab === 'Security' && <Security />}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function Orders() {
  const { orders } = useAuth()
  if (!orders.length)
    return (
      <div className="form-card form-done">
        <h3>No orders yet</h3>
        <p className="muted">When you place an order it will show up here so you can track it.</p>
        <Link to="/models" className="btn btn-dark">
          Browse models
        </Link>
      </div>
    )
  return (
    <div className="order-list">
      {orders.map((o, i) => (
        <motion.div key={o.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link to={`/account/orders/${o.id}`} className="order-card">
            <div className="order-thumbs">
              {o.items.slice(0, 3).map((it) => (
                <img key={it.id + it.variant} src={it.image} alt="" />
              ))}
            </div>
            <div className="order-main">
              <div className="order-top">
                <strong>{o.id}</strong>
                <span className="chip chip-red">{ORDER_STEPS[orderStep(o.createdAt)]}</span>
              </div>
              <span className="muted small">
                {date(o.createdAt)} · {o.items.reduce((s, it) => s + it.qty, 0)} item(s)
              </span>
              <OrderProgress createdAt={o.createdAt} compact />
            </div>
            <strong className="order-total">{money(o.total)}</strong>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function Profile() {
  const { user, updateProfile } = useAuth()
  const [saved, setSaved] = useState(false)
  if (!user) return null
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    updateProfile({ name: String(f.get('name')).trim(), phone: String(f.get('phone')).trim(), address: String(f.get('address')).trim() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }
  return (
    <form className="form form-card" onSubmit={submit}>
      <label>
        Full name
        <input required name="name" defaultValue={user.name} />
      </label>
      <label>
        Email
        <input value={user.email} disabled />
      </label>
      <label>
        Phone
        <input required type="tel" name="phone" defaultValue={user.phone} />
      </label>
      <label>
        Delivery address
        <input name="address" defaultValue={user.address} placeholder="12 Throttle Lane, Lagos" />
      </label>
      <button className="btn btn-dark span-2">{saved ? 'Saved ✓' : 'Save changes'}</button>
    </form>
  )
}

function Security() {
  const { changePassword } = useAuth()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const next = String(f.get('next'))
    if (next.length < 8) return setMsg({ ok: false, text: 'New password must be at least 8 characters.' })
    if (next !== f.get('confirm')) return setMsg({ ok: false, text: 'New passwords do not match.' })
    try {
      await changePassword(String(f.get('current')), next)
      form.reset()
      setMsg({ ok: true, text: 'Password updated.' })
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message })
    }
  }
  return (
    <form className="form form-card" onSubmit={submit}>
      <label className="span-2">
        Current password
        <PasswordInput required name="current" autoComplete="current-password" />
      </label>
      <label>
        New password
        <PasswordInput required name="next" autoComplete="new-password" minLength={8} />
      </label>
      <label>
        Confirm new password
        <PasswordInput required name="confirm" autoComplete="new-password" />
      </label>
      {msg && (
        <p className={(msg.ok ? 'form-ok' : 'form-error') + ' span-2'} role="status">
          {msg.text}
        </p>
      )}
      <button className="btn btn-dark span-2">Update password</button>
    </form>
  )
}
