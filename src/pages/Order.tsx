import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { itemKey, useCart } from '../cart'
import { useAuth, type Order as OrderT } from '../auth'
import { money } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { Card, Close, Truck, User as UserIcon } from '../components/Icons'

const round = (n: number) => Math.round(n * 100) / 100
const PAYMENTS: { id: OrderT['payment']; label: string; note: string }[] = [
  { id: 'card', label: 'Card', note: 'Visa, Mastercard, Verve' },
  { id: 'transfer', label: 'Bank transfer', note: 'Details sent by email' },
  { id: 'delivery', label: 'Pay on delivery', note: 'Gear orders only' },
]

export default function Order() {
  const { items, setQty, remove, total, clear } = useCart()
  const { user, placeOrder, updateProfile } = useAuth()
  const nav = useNavigate()
  const [payment, setPayment] = useState<OrderT['payment']>('card')
  const [error, setError] = useState('')

  const delivery = total > 10000 || total === 0 ? 0 : 25
  const tax = round(total * 0.075)
  const grand = round(total + delivery + tax)
  const hasBike = items.some((i) => !i.id.startsWith('helmet'))

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (payment === 'delivery' && hasBike) return setError('Pay on delivery is only available for gear. Choose card or bank transfer for bikes.')
    const address = String(f.get('address')).trim()
    const phone = String(f.get('phone')).trim()
    if (f.get('save')) updateProfile({ address, phone })
    const order = placeOrder({ items, subtotal: round(total), delivery, tax, total: grand, address, phone, payment })
    clear()
    nav(`/account/orders/${order.id}?new=1`)
  }

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
            {user ? (
              <Link to="/account" className="btn btn-outline">
                My orders
              </Link>
            ) : (
              <Link to="/gear" className="btn btn-outline">
                Shop gear
              </Link>
            )}
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
              <span>{money(round(total))}</span>
            </div>
            <div className="sum-row">
              <span className="muted">
                <Truck width={16} height={16} /> Delivery
              </span>
              <span>{delivery ? money(delivery) : 'Free'}</span>
            </div>
            <div className="sum-row">
              <span className="muted">Tax (7.5%)</span>
              <span>{money(tax)}</span>
            </div>
            <div className="sum-row sum-total">
              <span>Total</span>
              <span>{money(grand)}</span>
            </div>

            {user ? (
              <form className="form form-1" onSubmit={submit}>
                <div className="checkout-user">
                  <span className="avatar sm">
                    <UserIcon width={18} />
                  </span>
                  <div>
                    <strong>{user.name}</strong>
                    <span className="muted small">{user.email}</span>
                  </div>
                </div>
                <label>
                  Phone
                  <input required type="tel" name="phone" defaultValue={user.phone} />
                </label>
                <label>
                  Delivery address
                  <input required name="address" defaultValue={user.address} placeholder="12 Throttle Lane, Lagos" />
                </label>
                <label className="check">
                  <input type="checkbox" name="save" defaultChecked={!user.address} /> Save to my account
                </label>
                <fieldset className="pay">
                  <legend>
                    <Card width={16} height={16} /> Payment
                  </legend>
                  {PAYMENTS.map((p) => (
                    <label key={p.id} className={'pay-opt' + (payment === p.id ? ' on' : '')}>
                      <input type="radio" name="payment" checked={payment === p.id} onChange={() => {
                          setPayment(p.id)
                          setError('')
                        }} />
                      <span>
                        <b>{p.label}</b>
                        <span className="muted small">{p.note}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button className="btn btn-red btn-block" type="submit">
                  Place order · {money(grand)}
                </button>
              </form>
            ) : (
              <div className="checkout-auth">
                <p className="muted">Log in or create an account to check out. Your basket will be kept.</p>
                <Link to="/login?next=/order" className="btn btn-dark btn-block">
                  Log in to checkout
                </Link>
                <Link to="/register?next=/order" className="btn btn-outline btn-block">
                  Create account
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      )}
    </section>
  )
}
