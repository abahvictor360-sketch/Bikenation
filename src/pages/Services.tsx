import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { Card, Shield, Truck, Wrench, Bolt, Map } from '../components/Icons'

const services = [
  { icon: <Wrench />, title: 'Workshop & servicing', text: 'Factory-trained technicians, genuine parts and a 150-point inspection on every visit.', from: 'from $89' },
  { icon: <Shield />, title: 'Extended warranty', text: 'Up to 4 years of cover on engine, electrics and chassis — transferable when you sell.', from: 'from $19/mo' },
  { icon: <Card />, title: 'Flexible finance', text: '0% APR on selected models and tailored plans from 12 to 60 months.', from: '0% APR' },
  { icon: <Truck />, title: 'Home delivery', text: 'Your new bike delivered to your door, fuelled, registered and ready to ride.', from: 'Free over $10k' },
  { icon: <Bolt />, title: 'Performance tuning', text: 'ECU remaps, exhaust upgrades and dyno sessions to unlock every horsepower.', from: 'from $249' },
  { icon: <Map />, title: 'Roadside assistance', text: '24/7 recovery anywhere in the country, with a replacement bike if needed.', from: '24/7' },
]

const steps = [
  { n: '01', t: 'Book online', d: 'Pick a service and a time slot in under a minute.' },
  { n: '02', t: 'Drop off or pickup', d: 'Bring it in, or we collect it from your door.' },
  { n: '03', t: 'Live updates', d: 'Photos and progress updates straight to your phone.' },
  { n: '04', t: 'Ride away', d: 'Washed, checked and returned ready to go.' },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 50%'] })
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      <section className="section page-top">
        <SectionHead eyebrow="Services" title="Everything your bike" accent="needs.">
          From the first test ride to the hundredth service, Bikenation keeps you on the road.
        </SectionHead>
        <div className="service-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} className="service-card" delay={(i % 3) * 0.08}>
              <motion.div className="service-icon" whileHover={{ rotate: 12, scale: 1.1 }}>
                {s.icon}
              </motion.div>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
              <span className="chip chip-red">{s.from}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="How it works" title="Service in" accent="four steps." />
        <div className="steps" ref={ref}>
          <div className="steps-line">
            <motion.span style={{ height: line }} />
          </div>
          {steps.map((s, i) => (
            <Reveal key={s.n} className="step" x={i % 2 ? 40 : -40} y={0}>
              <span className="step-n">{s.n}</span>
              <div>
                <h3>{s.t}</h3>
                <p className="muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="cta">
          <div>
            <h2 className="display-2">Book your service</h2>
            <p className="lead">Slots available this week. Free pickup within 20 km.</p>
            <div className="cta-actions">
              <Link to="/experience#book" className="btn btn-light">
                Book now
              </Link>
            </div>
          </div>
          <img src="/images/honda-cbr250rr.webp" alt="" className="img-blend cta-bike" />
        </Reveal>
      </section>
    </>
  )
}
