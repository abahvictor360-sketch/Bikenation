import { useRef, useState, type FormEvent } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { bikes } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { Check } from '../components/Icons'

const events = [
  { date: 'Oct 18', title: 'Track Day — Silverstone Circuit', tag: 'Track', image: '/images/yamaha-r6.webp' },
  { date: 'Nov 02', title: 'Sunrise Coastal Group Ride', tag: 'Tour', image: '/images/kawasaki-ninja-white.webp' },
  { date: 'Nov 16', title: 'Off-road ATV Adventure', tag: 'Off-road', image: '/images/kawasaki-atv.webp' },
]

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section ref={ref} className="exp-hero">
        <motion.img src="/images/stealth-x.webp" alt="" className="img-blend exp-hero-img" style={{ scale, y }} />
        <motion.div className="exp-hero-copy" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="eyebrow">Experience</span>
          <h1 className="display-1">
            Feel the <span className="red">ride</span> before you buy.
          </h1>
          <p className="muted lead">Test rides, track days and group tours for every level of rider.</p>
          <a href="#book" className="btn btn-dark">
            Book a test ride
          </a>
        </motion.div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Upcoming" title="Ride" accent="events." />
        <div className="event-list">
          {events.map((e, i) => (
            <Reveal key={e.title} className="event" delay={i * 0.08}>
              <div className="event-img">
                <img src={e.image} alt="" className="img-blend" />
              </div>
              <div className="event-body">
                <span className="chip">{e.tag}</span>
                <h3>{e.title}</h3>
                <span className="event-date red">{e.date}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="book">
        <SectionHead eyebrow="Test ride" title="Book your" accent="seat.">
          Choose a bike and a date — we&apos;ll confirm within 2 hours.
        </SectionHead>
        <Reveal className="form-card">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" className="form-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <span className="done-icon">
                  <Check width={34} height={34} />
                </span>
                <h3>Booking received!</h3>
                <p className="muted">We&apos;ll be in touch shortly to confirm your ride.</p>
                <button className="btn btn-outline" onClick={() => setSent(false)}>
                  Book another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="form" exit={{ opacity: 0 }}>
                <label>
                  Full name
                  <input required name="name" placeholder="Jane Rider" />
                </label>
                <label>
                  Email
                  <input required type="email" name="email" placeholder="jane@email.com" />
                </label>
                <label>
                  Bike
                  <select name="bike">
                    {bikes.map((b) => (
                      <option key={b.id}>
                        {b.brand} {b.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Date
                  <input required type="date" name="date" />
                </label>
                <label className="span-2">
                  Notes
                  <textarea name="notes" rows={3} placeholder="Riding experience, licence type…" />
                </label>
                <button className="btn btn-red span-2" type="submit">
                  Request test ride
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </section>
    </>
  )
}
