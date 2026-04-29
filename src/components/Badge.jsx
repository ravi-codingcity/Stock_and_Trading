import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import clsx from '../utils/clsx'
import { pctBg, signed } from '../utils/format'

export default function Badge({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'bg-white/5 text-slate-300 border border-white/10',
    positive: 'bg-profit/10 text-profit border border-profit/20',
    negative: 'bg-loss/10 text-loss border border-loss/20',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    purple: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20',
  }
  return <span className={clsx('badge', tones[tone], className)}>{children}</span>
}

export function PctBadge({ value, className = '' }) {
  const Icon = value > 0 ? TrendingUp : value < 0 ? TrendingDown : Minus
  return (
    <span className={clsx('badge border', pctBg(value), className)}>
      <Icon size={12} />
      {signed(value)}%
    </span>
  )
}
