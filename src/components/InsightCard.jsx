import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import clsx from '../utils/clsx'

const tones = {
  positive: {
    chip: 'bg-profit/10 text-profit border-profit/20',
    bar: 'bg-profit',
    glow: 'shadow-[0_0_30px_-12px_rgba(34,197,94,0.6)]',
  },
  negative: {
    chip: 'bg-loss/10 text-loss border-loss/20',
    bar: 'bg-loss',
    glow: 'shadow-[0_0_30px_-12px_rgba(239,68,68,0.6)]',
  },
  accent: {
    chip: 'bg-accent/10 text-accent border-accent/20',
    bar: 'bg-accent',
    glow: 'shadow-glow',
  },
  purple: {
    chip: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
    bar: 'bg-accent-purple',
    glow: 'shadow-glow-purple',
  },
}

export default function InsightCard({ insight, index = 0 }) {
  const tone = tones[insight.tone] || tones.accent
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className={clsx(
        'card p-4 relative overflow-hidden cursor-pointer hover:border-accent/40 transition',
        'hover:' + tone.glow,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className={clsx('badge border', tone.chip)}>
            <Sparkles size={11} /> {insight.signal}
          </div>
          <div className="mt-2 text-base font-semibold">{insight.symbol}</div>
          <div className="text-[11px] text-slate-500 truncate">{insight.name}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500">Confidence</div>
          <div className="text-lg font-semibold tabular-nums">{insight.confidence}%</div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{insight.desc}</p>
      <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${insight.confidence}%` }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
          className={clsx('h-full', tone.bar)}
        />
      </div>
    </motion.div>
  )
}
