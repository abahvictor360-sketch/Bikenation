import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function SectionHead({ eyebrow, title, accent, children }: { eyebrow?: string; title: string; accent?: string; children?: ReactNode }) {
  return (
    <Reveal className="section-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="display-2">
        {title} {accent && <span className="red">{accent}</span>}
      </h2>
      {children && <p className="muted lead">{children}</p>}
    </Reveal>
  )
}
