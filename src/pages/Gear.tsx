import { motion } from 'framer-motion'
import { gear, money } from '../data'
import { useCart } from '../cart'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'

export default function GearPage() {
  const { add } = useCart()
  return (
    <section className="section page-top">
      <SectionHead eyebrow="Gear" title="Ride" accent="protected.">
        Certified helmets built for speed, comfort and serious style.
      </SectionHead>
      <div className="gear-feature">
        {gear.map((g, i) => (
          <Reveal key={g.id} className={'gear-row' + (i % 2 ? ' flip' : '')} x={i % 2 ? 60 : -60} y={0}>
            <div className={'gear-row-img' + (g.backdrop ? ' dark' : '')}>
              <motion.img
                src={g.image}
                alt={g.name}
                className={g.backdrop ? 'img-backdrop' : 'img-blend'}
                initial={{ rotate: i % 2 ? 10 : -10, scale: 0.9 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              />
            </div>
            <div className="gear-row-copy">
              <span className="eyebrow">{g.kind}</span>
              <h2 className="display-3">{g.name}</h2>
              <p className="muted lead">DOT & ECE 22.06 certified shell, anti-fog visor, removable washable liner and aero-tuned ventilation.</p>
              <div className="price-md">{money(g.price)}</div>
              <button className="btn btn-dark" onClick={() => add({ id: g.id, name: g.name, price: g.price, image: g.image })}>
                Add to basket
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
