import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { bikes, money } from '../data'
import BikeImage from '../components/BikeImage'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'

const cats = ['All', 'Superbike', 'Sport', 'ATV'] as const
const sorts = { featured: 'Featured', low: 'Price: low to high', high: 'Price: high to low' } as const

export default function Models() {
  const [cat, setCat] = useState<(typeof cats)[number]>('All')
  const [brand, setBrand] = useState('All')
  const [sort, setSort] = useState<keyof typeof sorts>('featured')
  const brands = ['All', ...new Set(bikes.map((b) => b.brand))]

  const list = useMemo(() => {
    const l = bikes.filter((b) => (cat === 'All' || b.category === cat) && (brand === 'All' || b.brand === brand))
    if (sort === 'low') l.sort((a, b) => a.price - b.price)
    if (sort === 'high') l.sort((a, b) => b.price - a.price)
    return l
  }, [cat, brand, sort])

  return (
    <section className="section page-top">
      <SectionHead eyebrow="Models" title="Find your next" accent="ride.">
        {bikes.length} machines from Ducati, Yamaha, Kawasaki, Honda and more — filter by style, brand or price.
      </SectionHead>

      <Reveal className="filters">
        <div className="seg" role="tablist" aria-label="Category">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={'seg-btn' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="seg-bg" className="seg-bg" />}
              <span>{c}</span>
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Brand">
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} aria-label="Sort">
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </Reveal>

      <motion.div layout className="model-grid">
        <AnimatePresence mode="popLayout">
          {list.map((b, i) => (
            <motion.div
              layout
              key={b.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            >
              <Link to={`/models/${b.id}`} className="model-card">
                <span className="chip">{b.category}</span>
                <div className={'model-img' + (b.backdrop ? ' fill' : '')}>
                  <BikeImage src={b.image} alt={`${b.brand} ${b.name}`} backdrop={b.backdrop} whileHover={{ scale: 1.06 }} />
                </div>
                <div className="model-meta">
                  <div>
                    <span className="muted small">{b.brand}</span>
                    <h3>{b.name}</h3>
                  </div>
                  <strong>{money(b.price)}</strong>
                </div>
                <div className="model-specs muted small">
                  <span>{b.specs.engine}</span>
                  <span>{b.specs.power}</span>
                  <span>{b.specs.accel} 0-100</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="muted empty">No bikes match those filters.</p>}
    </section>
  )
}
