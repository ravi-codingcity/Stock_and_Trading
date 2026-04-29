import { motion } from 'framer-motion'
import clsx from '../utils/clsx'

export default function Card({ as: Tag = 'div', className = '', glass = false, hover = true, children, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(
        glass ? 'glass rounded-2xl' : 'card',
        hover && 'card-hover',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
