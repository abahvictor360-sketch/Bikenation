import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { motion, useIsPresent } from 'framer-motion'
import { useAuth } from '../auth'
import { money } from '../data'
import Reveal from '../components/Reveal'
import OrderProgress from '../components/OrderProgress'
import { ArrowLeft, Check } from '../components/Icons'

const PAY = { card: 'Card', transfer: 'Bank transfer', delivery: 'Pay on delivery' }

export default function OrderDetail() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { user, orders } = useAuth()
  const isPresent = useIsPresent()
  if (!user) return isPresent ? <Navigate to={`/login?next=/account/orders/${id}`} replace /> : null
  const o = orders.find((x) => x.id === id)
  if (!o)
    return (
      <section className="section page-top">
        <h1 className="display-3">Order not found</h1>
        <Link to="/account" className="btn btn-dark">
          Back to account
        </Link>
      </section>
    )

  return (
    <section className="section page-top">
      <Link to="/account" className="back-link muted">
        <ArrowLeft width={18} /> My orders
      </Link>

      {params.get('new') && (
        <motion.div className="success-banner" initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
          <span className="done-icon sm">
            <Check width={22} height={22} />
          </span>
          <div>
            <strong>Order placed — thank you, {user.name.split(' ')[0]}!</strong>
            <p className="muted small">We&apos;ve saved it to your account. You can track it here anytime.</p>
          </div>
        </motion.div>
      )}

      <Reveal className="od-head">
        <div>
          <span className="eyebrow">Order</span>
          <h1 className="display-3">{o.id}</h1>
          <p className="muted">Placed {new Date(o.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
        </div>
      </Reveal>

      <Reveal className="form-card od-progress">
        <OrderProgress createdAt={o.createdAt} />
      </Reveal>

      <div className="checkout">
        <div className="cart-list">
          {o.items.map((i, k) => (
            <Reveal key={i.id + i.variant} className="cart-item od-item" delay={k * 0.05}>
              <img src={i.image} alt="" className="img-blend" />
              <div className="cart-info">
                <h3>{i.name}</h3>
                {i.variant && <span className="muted small">{i.variant}</span>}
                <span className="muted small">
                  {i.qty} × {money(i.price)}
                </span>
              </div>
              <strong>{money(Math.round(i.qty * i.price * 100) / 100)}</strong>
            </Reveal>
          ))}
        </div>
        <Reveal className="summary">
          <h3>Summary</h3>
          <div className="sum-row">
            <span className="muted">Subtotal</span>
            <span>{money(o.subtotal)}</span>
          </div>
          <div className="sum-row">
            <span className="muted">Delivery</span>
            <span>{o.delivery ? money(o.delivery) : 'Free'}</span>
          </div>
          <div className="sum-row">
            <span className="muted">Tax</span>
            <span>{money(o.tax)}</span>
          </div>
          <div className="sum-row sum-total">
            <span>Total</span>
            <span>{money(o.total)}</span>
          </div>
          <div className="od-meta">
            <p>
              <span className="muted small">Deliver to</span>
              <br />
              {o.address}
            </p>
            <p>
              <span className="muted small">Phone</span>
              <br />
              {o.phone}
            </p>
            <p>
              <span className="muted small">Payment</span>
              <br />
              {PAY[o.payment]}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
