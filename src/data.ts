export type Bike = {
  id: string
  brand: string
  name: string
  tagline: string
  price: number
  image: string
  /** photo faces left — mirrored in the hero so every bike faces the same way */
  flip?: boolean
  /** photo has its own studio backdrop, so show it full-bleed */
  backdrop?: boolean
  category: 'Superbike' | 'Sport' | 'Naked' | 'ATV'
  specs: {
    fuel: string
    year: number
    accel: string
    body: string
    engine: string
    power: string
    mileage: string
    topSpeed: string
  }
  colors: { name: string; hex: string; image?: string }[]
}

export type Gear = {
  id: string
  name: string
  kind: string
  price: number
  image: string
  backdrop?: boolean
}

const img = (n: string) => `/images/${n}.webp`

export const bikes: Bike[] = [
  {
    id: 'panigale-v2',
    brand: 'Ducati',
    name: 'Panigale V2',
    tagline: 'Twin-cylinder track precision.',
    price: 32000,
    image: img('panigale-red'),
    category: 'Superbike',
    specs: { fuel: 'Petrol', year: 2024, accel: '3.1s', body: 'Superbike', engine: 'V2 90°', power: '155 hp', mileage: '1,112 mi', topSpeed: '285 km/h' },
    colors: [
      { name: 'Ducati Red', hex: '#d71920', image: img('panigale-red') },
      { name: 'Giallo', hex: '#f2c418', image: img('panigale-yellow') },
    ],
  },
  {
    id: 'panigale-v2-giallo',
    brand: 'Ducati',
    name: 'Panigale V2 Giallo',
    tagline: 'Italian sunshine, 155 horses.',
    price: 33400,
    image: img('panigale-yellow'),
    category: 'Superbike',
    specs: { fuel: 'Petrol', year: 2025, accel: '3.0s', body: 'Superbike', engine: 'V2 90°', power: '155 hp', mileage: '0 mi', topSpeed: '285 km/h' },
    colors: [
      { name: 'Giallo', hex: '#f2c418', image: img('panigale-yellow') },
      { name: 'Ducati Red', hex: '#d71920', image: img('panigale-red') },
    ],
  },
  {
    id: 'yamaha-r1',
    brand: 'Yamaha',
    name: 'YZF-R1',
    tagline: 'MotoGP DNA for the road.',
    price: 28500,
    image: img('yamaha-r1'),
    category: 'Superbike',
    specs: { fuel: 'Petrol', year: 2024, accel: '2.9s', body: 'Superbike', engine: 'CP4 998cc', power: '200 hp', mileage: '640 mi', topSpeed: '299 km/h' },
    colors: [{ name: 'Racing Red', hex: '#d71920' }],
  },
  {
    id: 'kawasaki-ninja-300',
    brand: 'Kawasaki',
    name: 'Ninja 300',
    tagline: 'The everyday ninja.',
    price: 6200,
    image: img('kawasaki-ninja-green'),
    category: 'Sport',
    specs: { fuel: 'Petrol', year: 2023, accel: '5.4s', body: 'Sport', engine: 'Parallel 296cc', power: '39 hp', mileage: '2,300 mi', topSpeed: '180 km/h' },
    colors: [{ name: 'Lime Green', hex: '#3fb21b' }],
  },
  {
    id: 'yamaha-r3',
    brand: 'Yamaha',
    name: 'YZF-R3',
    tagline: 'Racing blue, everyday rider.',
    price: 5800,
    image: img('yamaha-r3'),
    category: 'Sport',
    specs: { fuel: 'Petrol', year: 2024, accel: '5.6s', body: 'Sport', engine: 'Parallel 321cc', power: '41 hp', mileage: '0 mi', topSpeed: '188 km/h' },
    colors: [{ name: 'Team Blue', hex: '#1446c8' }],
  },
  {
    id: 'honda-cbr250rr',
    brand: 'Honda',
    name: 'CBR250RR',
    tagline: 'Small engine, big attitude.',
    price: 7400,
    image: img('honda-cbr250rr'),
    category: 'Sport',
    specs: { fuel: 'Petrol', year: 2024, accel: '5.9s', body: 'Sport', engine: 'Parallel 250cc', power: '41 hp', mileage: '0 mi', topSpeed: '186 km/h' },
    colors: [{ name: 'Grand Prix Red', hex: '#c8102e' }],
  },
  {
    id: 'yamaha-r6',
    brand: 'Yamaha',
    name: 'YZF-R6',
    tagline: 'Screaming supersport.',
    price: 13200,
    image: img('yamaha-r6'),
    category: 'Superbike',
    specs: { fuel: 'Petrol', year: 2023, accel: '3.4s', body: 'Supersport', engine: 'Inline-4 599cc', power: '117 hp', mileage: '3,040 mi', topSpeed: '262 km/h' },
    colors: [{ name: 'Midnight Blue', hex: '#1b2fa8' }],
  },
  {
    id: 'stealth-x',
    brand: 'Bikenation',
    name: 'Stealth X',
    tagline: 'Matte black. Zero compromise.',
    price: 24900,
    image: img('stealth-x'),
    category: 'Superbike',
    specs: { fuel: 'Petrol', year: 2025, accel: '2.8s', body: 'Hyper sport', engine: 'Inline-4 998cc', power: '210 hp', mileage: '0 mi', topSpeed: '305 km/h' },
    colors: [{ name: 'Matte Black', hex: '#1d1d1f' }],
  },
  {
    id: 'kawasaki-ninja-red',
    brand: 'Kawasaki',
    name: 'Ninja 400 Red',
    tagline: 'Sharp lines, sharper response.',
    price: 7100,
    image: img('kawasaki-ninja-red'),
    category: 'Sport',
    specs: { fuel: 'Petrol', year: 2024, accel: '4.9s', body: 'Sport', engine: 'Parallel 399cc', power: '48 hp', mileage: '120 mi', topSpeed: '190 km/h' },
    colors: [{ name: 'Candy Red', hex: '#d71920' }],
  },
  {
    id: 'kawasaki-ninja-white',
    brand: 'Kawasaki',
    name: 'Ninja 650 Pearl',
    tagline: 'Pearl white middleweight.',
    price: 8900,
    image: img('kawasaki-ninja-white'),
    category: 'Sport',
    specs: { fuel: 'Petrol', year: 2024, accel: '4.2s', body: 'Sport', engine: 'Parallel 649cc', power: '67 hp', mileage: '0 mi', topSpeed: '210 km/h' },
    colors: [{ name: 'Pearl White', hex: '#e9e9ea' }],
  },
  {
    id: 'kawasaki-zx-lime',
    brand: 'Kawasaki',
    name: 'ZX Lime Edition',
    tagline: 'Loud colours, louder exhaust.',
    price: 11500,
    image: img('kawasaki-zx-lime'),
    category: 'Superbike',
    specs: { fuel: 'Petrol', year: 2025, accel: '3.6s', body: 'Supersport', engine: 'Inline-4 636cc', power: '128 hp', mileage: '0 mi', topSpeed: '255 km/h' },
    colors: [{ name: 'Lime / White', hex: '#b6d82c' }],
  },
  {
    id: 'kawasaki-brute',
    brand: 'Kawasaki',
    name: 'Brute Force ATV',
    tagline: 'Four wheels, no roads required.',
    price: 9800,
    image: img('kawasaki-atv'),
    flip: true,
    category: 'ATV',
    specs: { fuel: 'Petrol', year: 2024, accel: '7.5s', body: 'Quad / ATV', engine: 'V-Twin 749cc', power: '47 hp', mileage: '80 mi', topSpeed: '110 km/h' },
    colors: [{ name: 'Lime Green', hex: '#5cc41e' }],
  },
]

export const gear: Gear[] = [
  { id: 'helmet-i11', name: 'HJC i11 Full-face', kind: 'Helmet', price: 350.5, image: img('helmet-hjc-i11') },
  { id: 'helmet-venom', name: 'Venom Edition Helmet', kind: 'Helmet', price: 489, image: img('helmet-venom') },
  { id: 'helmet-rpha', name: 'HJC Modular Carbon', kind: 'Helmet', price: 420, image: img('helmet-hjc-rpha') },
]

export const heroBikes = bikes
export const getBike = (id: string) => bikes.find((b) => b.id === id)
export const money = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })
/** Number only, for the big hero/detail price where the $ is styled separately. */
export const amount = (n: number) => money(n).slice(1)
