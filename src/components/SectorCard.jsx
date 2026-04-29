import { motion } from 'framer-motion'
import clsx from '../utils/clsx'
import { signed } from '../utils/format'

export default function SectorCard({ name, short, changePct, index = 0 }) {
  const positive = changePct >= 0
  const width = Math.min(100, Math.abs(changePct) * 25 + 10)

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent/40 hover:bg-white/[0.06] transition cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2 gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{short}</div>
          <div className="text-[10px] text-slate-500 truncate">{name}</div>
        </div>
        <div className={clsx('text-sm font-semibold tabular-nums', positive ? 'text-profit' : 'text-loss')}>
          {signed(changePct)}%
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.04 }}
          className={clsx('h-full rounded-full', positive ? 'bg-profit' : 'bg-loss')}
        />
      </div>
    </motion.div>
  )
}
