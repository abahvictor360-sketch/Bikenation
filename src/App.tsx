import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { CartProvider } from './cart'
import { AuthProvider } from './auth'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Models from './pages/Models'
import ModelDetail from './pages/ModelDetail'
import Services from './pages/Services'
import Experience from './pages/Experience'
import GearPage from './pages/Gear'
import Order from './pages/Order'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import OrderDetail from './pages/OrderDetail'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function AnimatedRoutes() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:id" element={<ModelDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/gear" element={<GearPage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders/:id" element={<OrderDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <ScrollProgress />
        <div className="shell">
          <Header />
          <AnimatedRoutes />
          <Footer />
        </div>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
