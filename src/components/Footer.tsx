import { Link } from 'react-router-dom'
import Logo from './Logo'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="footer-grid">
        <div>
          <Link to="/" className="brand">
            <Logo size={38} />
            <span className="brand-name">
              Bike<b>nation</b>
            </span>
          </Link>
          <p className="muted footer-blurb">Premium motorcycles, riding gear and workshop services — all under one roof.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/models">Models</Link>
          <Link to="/gear">Gear</Link>
          <Link to="/order">Basket</Link>
          <Link to="/account">My account</Link>
        </div>
        <div>
          <h4>Ride</h4>
          <Link to="/services">Services</Link>
          <Link to="/experience">Experience</Link>
        </div>
        <div>
          <h4>Visit</h4>
          <span className="muted">Mon–Sat, 9am–7pm</span>
          <span className="muted">hello@bikenation.app</span>
        </div>
      </Reveal>
      <div className="footer-bottom muted">
        <p>© {new Date().getFullYear()} Bikenation. All rights reserved.</p>
        <p className="footer-note">
          Concept project — not affiliated with Ducati, Yamaha, Kawasaki, Honda or HJC. Brand names and product photos belong to their respective owners.
        </p>
      </div>
    </footer>
  )
}
