import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CartItem } from './cart'

/*
 * Browser-only accounts: users, the session and orders live in this visitor's
 * localStorage. Passwords are salted + SHA-256 hashed so they are never stored
 * in plain text, but this is a demo store — there is no server behind it.
 */

export type User = { id: string; name: string; email: string; phone: string; address: string; createdAt: number }
type StoredUser = User & { salt: string; hash: string }

export type Order = {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  delivery: number
  tax: number
  total: number
  address: string
  phone: string
  payment: 'card' | 'transfer' | 'delivery'
  createdAt: number
}

type AuthCtx = {
  user: User | null
  ready: boolean
  register: (d: { name: string; email: string; phone: string; password: string }) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (d: Partial<Pick<User, 'name' | 'phone' | 'address'>>) => void
  changePassword: (current: string, next: string) => Promise<void>
  orders: Order[]
  placeOrder: (o: Omit<Order, 'id' | 'userId' | 'createdAt'>) => Order
}

const USERS = 'bikenation-users'
const SESSION = 'bikenation-session'
const ORDERS = 'bikenation-orders'

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage blocked (private mode) — state stays in memory for this visit */
  }
}

const rid = (prefix: string) => prefix + crypto.getRandomValues(new Uint32Array(2)).reduce((s, n) => s + n.toString(36), '').slice(0, 10).toUpperCase()

async function hashPassword(password: string, salt: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + password))
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('')
}

const strip = ({ salt: _s, hash: _h, ...u }: StoredUser): User => u
const norm = (email: string) => email.trim().toLowerCase()

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<StoredUser[]>(() => read(USERS, []))
  const [sessionId, setSessionId] = useState<string | null>(() => read(SESSION, null))
  const [allOrders, setAllOrders] = useState<Order[]>(() => read(ORDERS, []))

  useEffect(() => write(USERS, users), [users])
  useEffect(() => write(SESSION, sessionId), [sessionId])
  useEffect(() => write(ORDERS, allOrders), [allOrders])

  const stored = users.find((u) => u.id === sessionId) ?? null
  const user = stored ? strip(stored) : null
  const orders = user ? allOrders.filter((o) => o.userId === user.id).sort((a, b) => b.createdAt - a.createdAt) : []

  const register: AuthCtx['register'] = async ({ name, email, phone, password }) => {
    const e = norm(email)
    if (users.some((u) => u.email === e)) throw new Error('An account with this email already exists.')
    const salt = rid('')
    const u: StoredUser = { id: rid('U'), name: name.trim(), email: e, phone: phone.trim(), address: '', createdAt: Date.now(), salt, hash: await hashPassword(password, salt) }
    setUsers((prev) => [...prev, u])
    setSessionId(u.id)
  }

  const login: AuthCtx['login'] = async (email, password) => {
    const u = users.find((x) => x.email === norm(email))
    if (!u || (await hashPassword(password, u.salt)) !== u.hash) throw new Error('Incorrect email or password.')
    setSessionId(u.id)
  }

  const logout = () => setSessionId(null)

  const updateProfile: AuthCtx['updateProfile'] = (d) => setUsers((prev) => prev.map((u) => (u.id === sessionId ? { ...u, ...d } : u)))

  const changePassword: AuthCtx['changePassword'] = async (current, next) => {
    if (!stored || (await hashPassword(current, stored.salt)) !== stored.hash) throw new Error('Current password is incorrect.')
    const salt = rid('')
    const hash = await hashPassword(next, salt)
    setUsers((prev) => prev.map((u) => (u.id === stored.id ? { ...u, salt, hash } : u)))
  }

  const placeOrder: AuthCtx['placeOrder'] = (o) => {
    if (!user) throw new Error('Please log in to place an order.')
    const order: Order = { ...o, id: rid('BN-').slice(0, 9), userId: user.id, createdAt: Date.now() }
    setAllOrders((prev) => [...prev, order])
    return order
  }

  return (
    <Ctx.Provider value={{ user, ready: true, register, login, logout, updateProfile, changePassword, orders, placeOrder }}>{children}</Ctx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth must be used inside AuthProvider')
  return c
}

/** Simulated fulfilment progress based on how long ago the order was placed. */
// eslint-disable-next-line react-refresh/only-export-components
export const ORDER_STEPS = ['Placed', 'Processing', 'Shipped', 'Delivered'] as const
// eslint-disable-next-line react-refresh/only-export-components
export function orderStep(createdAt: number, now = Date.now()) {
  const mins = (now - createdAt) / 60000
  if (mins < 2) return 0
  if (mins < 60 * 24) return 1
  if (mins < 60 * 24 * 3) return 2
  return 3
}

// eslint-disable-next-line react-refresh/only-export-components
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')
