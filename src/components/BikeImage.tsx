import { motion, type HTMLMotionProps } from 'framer-motion'

/** Product photo — transparent cutout, or a full-bleed photo when it has its own backdrop. */
export default function BikeImage({ backdrop, className = '', ...rest }: HTMLMotionProps<'img'> & { backdrop?: boolean }) {
  return <motion.img draggable={false} className={`${backdrop ? 'img-backdrop' : 'img-blend'} ${className}`} {...rest} />
}
