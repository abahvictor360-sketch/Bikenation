import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type CartItem = { id: string; name: string; price: number; image: string; qty: number; variant?: string }

type CartCtx = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>) => void
  remove: (key: string) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  count: number
  total: number
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'bikenation-cart'
export const itemKey = (i: Pick<CartItem, 'id' | 'variant'>) => `${i.id}::${i.variant ?? ''}`

function load(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [items])

  const add: CartCtx['add'] = (item) =>
    setItems((prev) => {
      const k = itemKey(item)
      const hit = prev.find((p) => itemKey(p) === k)
      return hit ? prev.map((p) => (itemKey(p) === k ? { ...p, qty: p.qty + 1 } : p)) : [...prev, { ...item, qty: 1 }]
    })
  const remove = (key: string) => setItems((prev) => prev.filter((p) => itemKey(p) !== key))
  const setQty = (key: string, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((p) => itemKey(p) !== key) : prev.map((p) => (itemKey(p) === key ? { ...p, qty } : p))))
  const clear = () => setItems([])

  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.qty * i.price, 0)

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside CartProvider')
  return c
}
