import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { itemKey, useCart } from '../cart'
import { money } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { Check, Close } from '../components/Icons'

export default function Order() {
  const { items, setQty, remove, total, clear } = useCart()
  const [placed, setPlaced] = useState<string | null>(null)
  const shipping = total > 10000 || total === 0 ? 0 : 25
  const tax = total * 0.075

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setPlaced('BN-' + Math.random().toString(36).slice(2, 8).toUpperCase())
    clear()
  }

  if (placed)
    return (
      <section className="section page-top">
        <motion.div className="form-card form-done" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="done-icon">
            <Check width={34} height={34} />
          </span>
          <h2 className="display-3">Order confirmed</h2>
          <p className="muted">
            Order <b>{placed}</b> — a confirmation email is on its way.
          </p>
          <Link to="/models" className="btn btn-dark">
            Keep browsing
          </Link>
        </motion.div>
      </section>
    )

  return (
    <section className="section page-top">
      <SectionHead eyebrow="Order" title="Your" accent="basket." />
      {items.length === 0 ? (
        <Reveal className="form-card form-done">
          <h3>Your basket is empty</h3>
          <p className="muted">Find a bike or some gear to get started.</p>
          <div className="cta-actions">
            <Link to="/models" className="btn btn-dark">
              Browse models
            </Link>
            <Link to="/gear" className="btn btn-outline">
              Shop gear
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="checkout">
          <div className="cart-list">
            <AnimatePresence>
              {items.map((i) => (
                <motion.div
                  layout
                  key={itemKey(i)}
                  className="cart-item"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0, padding: 0 }}
                >
                  <img src={i.image} alt="" className="img-blend" />
                  <div className="cart-info">
                    <h3>{i.name}</h3>
                    {i.variant && <span className="muted small">{i.variant}</span>}
                    <strong>{money(i.price)}</strong>
                  </div>
                  <div className="qty">
                    <button aria-label="Decrease" onClick={() => setQty(itemKey(i), i.qty - 1)}>
                      −
                    </button>
                    <span>{i.qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(itemKey(i), i.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button className="icon-btn" aria-label="Remove" onClick={() => remove(itemKey(i))}>
                    <Close width={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Reveal className="summary">
            <h3>Summary</h3>
            <div className="sum-row">
              <span className="muted">Subtotal</span>
              <span>{money(total)}</span>
            </div>
            <div className="sum-row">
              <span className="muted">Delivery</span>
              <span>{shipping ? money(shipping) : 'Free'}</span>
            </div>
            <div className="sum-row">
              <span className="muted">Tax (7.5%)</span>
              <span>{money(Math.round(tax * 100) / 100)}</span>
            </div>
            <div className="sum-row sum-total">
              <span>Total</span>
              <span>{money(Math.round((total + shipping + tax) * 100) / 100)}</span>
            </div>
            <form className="form form-1" onSubmit={submit}>
              <label>
                Full name
                <input required placeholder="Jane Rider" />
              </label>
              <label>
                Email
                <input required type="email" placeholder="jane@email.com" />
              </label>
              <label>
                Delivery address
                <input required placeholder="12 Throttle Lane" />
              </label>
              <button className="btn btn-red btn-block" type="submit">
                Place order
              </button>
            </form>
          </Reveal>
        </div>
      )}
    </section>
  )
}
