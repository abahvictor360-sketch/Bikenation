import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { bikes, getBike, money } from '../data'
import { useCart } from '../cart'
import BikeImage from '../components/BikeImage'
import Reveal from '../components/Reveal'
import { ArrowLeft, Bolt, Calendar, Engine, Fuel, Gauge, Rider, Wheel } from '../components/Icons'

export default function ModelDetail() {
  const { id = '' } = useParams()
  const bike = getBike(id)
  const { add } = useCart()
  const [color, setColor] = useState(0)
  const [added, setAdded] = useState(false)

  if (!bike)
    return (
      <section className="section page-top">
        <h1 className="display-2">Bike not found</h1>
        <Link to="/models" className="btn btn-dark">
          Back to models
        </Link>
      </section>
    )

  const c = bike.colors[color] ?? bike.colors[0]
  const src = c.image ?? bike.image
  const related = bikes.filter((b) => b.id !== bike.id && b.category === bike.category).slice(0, 3)
  const specs = [
    { icon: <Fuel />, v: bike.specs.fuel, l: 'Fuel type' },
    { icon: <Calendar />, v: bike.specs.year, l: 'Year' },
    { icon: <Gauge />, v: bike.specs.accel, l: '0-100 km/h' },
    { icon: <Rider />, v: bike.specs.body, l: 'Body style' },
    { icon: <Engine />, v: bike.specs.engine, l: 'Engine' },
    { icon: <Bolt />, v: bike.specs.power, l: 'Power' },
    { icon: <Wheel />, v: bike.specs.mileage, l: 'Mileage' },
    { icon: <Gauge />, v: bike.specs.topSpeed, l: 'Top speed' },
  ]

  return (
    <section className="section page-top">
      <Link to="/models" className="back-link muted">
        <ArrowLeft width={18} /> All models
      </Link>
      <div className="detail">
        <motion.div
          key={src}
          className={'detail-img' + (bike.backdrop ? ' fill' : '')}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <BikeImage src={src} alt={`${bike.brand} ${bike.name}`} backdrop={bike.backdrop} />
        </motion.div>
        <div className="detail-info">
          <Reveal>
            <span className="eyebrow">{bike.brand}</span>
            <h1 className="display-1">{bike.name}</h1>
            <p className="muted lead">{bike.tagline}</p>
            <div className="price-big detail-price">
              <span className="dollar">$</span>
              {bike.price.toLocaleString('de-DE')}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="small muted">Colour — {c.name}</p>
            <div className="swatches row">
              {bike.colors.map((col, i) => (
                <button
                  key={col.name}
                  aria-label={col.name}
                  className={'swatch' + (i === color ? ' on' : '')}
                  style={{ background: col.hex }}
                  onClick={() => setColor(i)}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="detail-actions">
            <button
              className="btn btn-dark"
              onClick={() => {
                add({ id: bike.id, name: `${bike.brand} ${bike.name}`, price: bike.price, image: src, variant: c.name })
                setAdded(true)
              }}
            >
              {added ? 'Added ✓' : 'Add to order'}
            </button>
            <Link to="/experience" className="btn btn-outline">
              Book test ride
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="spec-grid detail-specs">
        {specs.map((s, i) => (
          <Reveal key={s.l} className="tile tile-spec" delay={i * 0.04}>
            {s.icon}
            <strong>{s.v}</strong>
            <span className="muted small">{s.l}</span>
          </Reveal>
        ))}
      </div>

      {related.length > 0 && (
        <>
          <Reveal>
            <h2 className="display-3">You might also like</h2>
          </Reveal>
          <div className="model-grid">
            {related.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <Link to={`/models/${b.id}`} className="model-card">
                  <div className={'model-img' + (b.backdrop ? ' fill' : '')}>
                    <BikeImage src={b.image} alt={b.name} backdrop={b.backdrop} />
                  </div>
                  <div className="model-meta">
                    <div>
                      <span className="muted small">{b.brand}</span>
                      <h3>{b.name}</h3>
                    </div>
                    <strong>{money(b.price)}</strong>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
