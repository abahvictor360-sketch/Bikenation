import type { SVGProps } from 'react'

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
})

export const Basket = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M3 10h18l-1.6 9.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8z" /><path d="m7 10 3-6M17 10l-3-6M9 14v3M12 14v3M15 14v3" /></svg>
)
export const User = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
)
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M20 12H4M10 6l-6 6 6 6" /></svg>
)
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
)
export const Fuel = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16zM5 21h11M8 8l5 5M13 8l-5 5" /><path d="M16 9h2a1 1 0 0 1 1 1v6a1.5 1.5 0 0 0 3 0V8l-3-3" /></svg>
)
export const Calendar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></svg>
)
export const Gauge = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M3.5 17a9 9 0 1 1 17 0z" /><path d="m12 13 4-4" /><circle cx="12" cy="13" r="1" /></svg>
)
export const Rider = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="4" r="2" /><path d="M9 21v-6l-2-1 2-6h6l2 6-2 1v6M9 11h6" /></svg>
)
export const Engine = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M7 7h6M10 7v3M4 13v-3h3l2-2h6l2 3h2v-2h2v8h-2v-2h-2l-2 3H8l-2-2H4v-3zM2 12v4" /></svg>
)
export const Wheel = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></svg>
)
export const Bolt = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
)
export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
)
export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m5 12 5 5 9-10" /></svg>
)
export const Wrench = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></svg>
)
export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const Truck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
)
export const Card = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg>
)
export const Flag = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 21V4M5 4h12l-2 4 2 4H5" /></svg>
)
export const Map = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></svg>
)
