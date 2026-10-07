import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'

export default function AuthLayout({ title, accent, subtitle, image, children }: { title: string; accent: string; subtitle: string; image: string; children: ReactNode }) {
  return (
    <section className="section page-top">
      <div className="auth">
        <motion.aside
          className="auth-art"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="auth-art-copy">
            <Logo size={46} />
            <h2>
              Ride with <span className="red">Bikenation.</span>
            </h2>
            <p>Track orders, save your details and check out in seconds.</p>
          </div>
          <motion.img
            src={image}
            alt=""
            className="auth-bike"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.aside>
        <motion.div className="auth-form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <h1 className="display-3">
            {title} <span className="red">{accent}</span>
          </h1>
          <p className="muted auth-sub">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
