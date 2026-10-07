import { motion } from 'framer-motion'
import { ORDER_STEPS, orderStep } from '../auth'

export default function OrderProgress({ createdAt, compact }: { createdAt: number; compact?: boolean }) {
  const step = orderStep(createdAt)
  return (
    <div className={'progress' + (compact ? ' compact' : '')}>
      <div className="progress-track">
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: `${(step / (ORDER_STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol>
        {ORDER_STEPS.map((s, i) => (
          <li key={s} className={i <= step ? 'done' : ''}>
            <i />
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
