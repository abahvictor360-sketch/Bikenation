import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { bikes, gear, heroBikes, money } from '../data'
import { useCart } from '../cart'
import { ArrowLeft, ArrowRight, Calendar, Check, Engine, Fuel, Gauge, Rider, Wheel } from '../components/Icons'
import BikeImage from '../components/BikeImage'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'

const PAINTS = [
  { name: 'Rosso', hex: '#d71920' },
  { name: 'Giallo', hex: '#f2c418' },
  { name: 'Blu', hex: '#0b3d9c' },
  { name: 'Argento', hex: '#d9d9d9' },
  { name: 'Nero', hex: '#161616' },
]
const PAINT_PRICE = 140.5

const wrap = (i: number, n: number) => ((i % n) + n) % n

export default function Home() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const [paint, setPaint] = useState(0)
  const { add } = useCart()
  const bike = heroBikes[index]
  const prev = heroBikes[wrap(index - 1, heroBikes.length)]
  const next = heroBikes[wrap(index + 1, heroBikes.length)]
  const go = (d: number) => setState(([i]) => [wrap(i + d, heroBikes.length), d])

  // Paint swatch that matches one of the bike's factory images swaps the hero photo.
  const factory = bike.colors.find((c) => c.hex.toLowerCase() === PAINTS[paint].hex.toLowerCase() && c.image)
  const heroSrc = factory?.image ?? bike.image
  const paintExtra = factory || bike.colors[0]?.hex.toLowerCase() === PAINTS[paint].hex ? 0 : PAINT_PRICE

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bikeY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const bikeScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const helmet = gear[0]

  return (
    <>
      <section ref={heroRef} className="hero">
        <motion.div className="hero-top" style={{ y: titleY, opacity: fade }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="display-1">
                {bike.name} <span className="red">{bike.brand}</span>
              </h1>
              <p className="muted lead">{bike.tagline}</p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={bike.id + paintExtra}
              className="hero-price"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <div className="price-big">
                <span className="dollar">$</span>
                {(bike.price + paintExtra).toLocaleString('de-DE')}
              </div>
              <Link to="/models" className="muted lead link-under">
                Explore bikes by price.
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="stage">
          <div className="stage-floor" />
          <AnimatePresence initial={false}>
            <motion.button
              key={'p' + prev.id}
              className="side-bike side-left"
              onClick={() => go(-1)}
              aria-label={`Previous: ${prev.name}`}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BikeImage src={prev.image} alt="" />
            </motion.button>
            <motion.button
              key={'n' + next.id}
              className="side-bike side-right"
              onClick={() => go(1)}
              aria-label={`Next: ${next.name}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BikeImage src={next.image} alt="" />
            </motion.button>
          </AnimatePresence>

          <motion.div className="main-bike-wrap" style={{ y: bikeY, scale: bikeScale }}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <BikeImage
                key={heroSrc}
                src={heroSrc}
                alt={`${bike.brand} ${bike.name}`}
                className="main-bike"
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d >= 0 ? '45%' : '-45%', opacity: 0, scale: 0.8 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (d: number) => ({ x: d >= 0 ? '-45%' : '45%', opacity: 0, scale: 0.8 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1)
                  else if (info.offset.x > 80) go(-1)
                }}
              />
            </AnimatePresence>
          </motion.div>

          <div className="carousel-ctrl">
            <button aria-label="Previous bike" onClick={() => go(-1)}>
              <ArrowLeft />
            </button>
            <button aria-label="Next bike" onClick={() => go(1)}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="dash">
          <Reveal className="tile tile-promo" y={30}>
            <div>
              <p className="muted">Full-face riding helmet, track certified.</p>
              <div className="price-md">{money(helmet.price)}</div>
              <button className="btn btn-dark" onClick={() => add({ id: helmet.id, name: helmet.name, price: helmet.price, image: helmet.image })}>
                Buy Now
              </button>
            </div>
            <motion.img
              src={helmet.image}
              alt={helmet.name}
              className="img-blend promo-img"
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          </Reveal>

          <div className="spec-grid">
            {[
              { icon: <Fuel />, v: bike.specs.fuel, l: 'Fuel type' },
              { icon: <Calendar />, v: bike.specs.year, l: 'Year' },
              { icon: <Gauge />, v: bike.specs.accel, l: '0-100 km/h' },
              { icon: <Rider />, v: bike.specs.body, l: 'Body style' },
              { icon: <Engine />, v: bike.specs.engine, l: 'Moto engine' },
              { icon: <Wheel />, v: bike.specs.mileage, l: 'Mileage' },
            ].map((s, i) => (
              <Reveal key={s.l} className="tile tile-spec" y={30} delay={0.05 * i}>
                {s.icon}
                <AnimatePresence mode="wait">
                  <motion.strong key={String(s.v)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    {s.v}
                  </motion.strong>
                </AnimatePresence>
                <span className="muted small">{s.l}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="tile tile-paint" y={30} delay={0.15}>
            <div className="paint-copy">
              <p>
                <b>Your bike, your style</b> — choose the colors that define your ride and make it stand out from the crowd.
              </p>
              <div className="price-md">{paintExtra ? '+' + money(paintExtra) : 'Included'}</div>
              <button
                className="btn btn-dark btn-sm"
                onClick={() =>
                  add({ id: bike.id, name: `${bike.brand} ${bike.name}`, price: bike.price + paintExtra, image: heroSrc, variant: PAINTS[paint].name })
                }
              >
                Add to order
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={heroSrc}
                src={heroSrc}
                alt=""
                className="img-blend paint-img"
                initial={{ opacity: 0, rotate: -6 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
              />
            </AnimatePresence>
            <div className="swatches" role="radiogroup" aria-label="Paint colour">
              {PAINTS.map((p, i) => (
                <button
                  key={p.name}
                  role="radio"
                  aria-checked={paint === i}
                  aria-label={p.name}
                  className={'swatch' + (paint === i ? ' on' : '')}
                  style={{ background: p.hex }}
                  onClick={() => setPaint(i)}
                >
                  {paint === i && <Check width={16} height={16} />}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Lineup />
      <Showcase />
      <Stats />
      <GearStrip />
      <Cta />
    </>
  )
}

/** Pinned section: vertical scroll drives a horizontal track of bikes. */
function Lineup() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%'])
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 })
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} className="lineup">
      <div className="lineup-sticky">
        <div className="lineup-head">
          <SectionHead eyebrow="The lineup" title="Pick your" accent="weapon." />
          <div className="lineup-bar">
            <motion.span style={{ width: bar }} />
          </div>
        </div>
        <motion.div className="lineup-track" style={{ x: smoothX }}>
          {bikes.map((b) => (
            <Link key={b.id} to={`/models/${b.id}`} className="lineup-card">
              <div className="lineup-img">
                <BikeImage src={b.image} alt={b.name} backdrop={b.backdrop} whileHover={{ scale: 1.06 }} />
              </div>
              <div className="lineup-meta">
                <div>
                  <span className="muted small">{b.brand}</span>
                  <h3>{b.name}</h3>
                </div>
                <strong>{money(b.price)}</strong>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/** Big bike that drives in from the right as you scroll, with words sliding the opposite way. */
function Showcase() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bikeX = useTransform(scrollYProgress, [0, 0.5, 1], ['60%', '0%', '-30%'])
  const textX = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])
  const rot = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -4])

  return (
    <section ref={ref} className="showcase">
      <motion.div className="showcase-word" style={{ x: textX }} aria-hidden>
        BUILT FOR THE BOLD · BUILT FOR THE BOLD ·
      </motion.div>
      <motion.img src="/images/yamaha-r1.webp" alt="Yamaha YZF-R1" className="img-blend showcase-bike" style={{ x: bikeX, rotate: rot }} />
      <Reveal className="showcase-copy">
        <h2 className="display-2">
          Engineered to <span className="red">thrill.</span>
        </h2>
        <p className="muted lead">Every bike on Bikenation is inspected across 150 points, serviced in-house and delivered ready to ride.</p>
        <Link to="/services" className="btn btn-red">
          Our services
        </Link>
      </Reveal>
    </section>
  )
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0)
  return (
    <motion.span
      onViewportEnter={() => {
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1400)
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }}
      viewport={{ once: true }}
    >
      {n.toLocaleString('en-US')}
      {suffix}
    </motion.span>
  )
}

function Stats() {
  const stats = [
    { n: 12, s: '+', l: 'Iconic models' },
    { n: 4800, s: '+', l: 'Happy riders' },
    { n: 150, s: '', l: 'Point inspection' },
    { n: 24, s: '/7', l: 'Roadside support' },
  ]
  return (
    <section className="stats">
      {stats.map((s, i) => (
        <Reveal key={s.l} className="stat" delay={i * 0.08}>
          <strong>
            <Counter to={s.n} suffix={s.s} />
          </strong>
          <span className="muted">{s.l}</span>
        </Reveal>
      ))}
    </section>
  )
}

function GearStrip() {
  const { add } = useCart()
  return (
    <section className="section">
      <SectionHead eyebrow="Riding gear" title="Protect the" accent="legend.">
        Helmets engineered for speed, comfort and style.
      </SectionHead>
      <div className="gear-grid">
        {gear.map((g, i) => (
          <Reveal key={g.id} className="gear-card" delay={i * 0.1}>
            <div className={'gear-img' + (g.backdrop ? ' dark' : '')}>
              <motion.img src={g.image} alt={g.name} className={g.backdrop ? 'img-backdrop' : 'img-blend'} whileHover={{ scale: 1.08, rotate: -4 }} />
            </div>
            <div className="gear-meta">
              <div>
                <span className="muted small">{g.kind}</span>
                <h3>{g.name}</h3>
              </div>
              <strong>{money(g.price)}</strong>
            </div>
            <button className="btn btn-dark btn-block" onClick={() => add({ id: g.id, name: g.name, price: g.price, image: g.image })}>
              Add to basket
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="section">
      <Reveal className="cta">
        <div>
          <h2 className="display-2">Ready to ride?</h2>
          <p className="lead">Book a test ride today — we&apos;ll have your bike fuelled and waiting.</p>
          <div className="cta-actions">
            <Link to="/experience" className="btn btn-light">
              Book a test ride
            </Link>
            <Link to="/models" className="btn btn-ghost">
              Browse models
            </Link>
          </div>
        </div>
        <motion.img
          src="/images/kawasaki-ninja-green.webp"
          alt=""
          className="img-blend cta-bike"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </Reveal>
    </section>
  )
}
