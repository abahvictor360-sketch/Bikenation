import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { Basket, Close, Menu, User } from './Icons'
import { useCart } from '../cart'

const links = [
  { to: '/models', label: 'Models' },
  { to: '/services', label: 'Services' },
  { to: '/experience', label: 'Experience' },
  { to: '/gear', label: 'Gear' },
]

export default function Header() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="header">
      <Link to="/" className="brand" aria-label="Bikenation home">
        <Logo />
        <span className="brand-name">
          Bike<b>nation</b>
        </span>
      </Link>

      <nav className="nav-pills" aria-label="Main">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => 'pill' + (isActive ? ' pill-active' : '')}>
            {({ isActive }) => (
              <>
                {isActive && <motion.span layoutId="pill-bg" className="pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="pill-label">{l.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <Link to="/order" className="icon-btn" aria-label={`Basket, ${count} items`}>
          <Basket />
          <AnimatePresence>
            {count > 0 && (
              <motion.span key={count} className="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button className="icon-btn hide-sm" aria-label="Account">
          <User />
        </button>
        <Link to="/order" className="btn btn-dark hide-sm">
          Order
        </Link>
        <button className="icon-btn burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            >
              <button className="icon-btn drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                <Close />
              </button>
              <nav>
                {[{ to: '/', label: 'Home' }, ...links, { to: '/order', label: 'Order' }].map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                    <NavLink to={l.to} end className={({ isActive }) => 'drawer-link' + (isActive ? ' active' : '')}>
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
