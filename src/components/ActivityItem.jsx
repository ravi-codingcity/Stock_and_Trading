import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, Bell, Coins } from 'lucide-react'
import clsx from '../utils/clsx'
import { formatNumber } from '../utils/format'

const config = {
  buy: { icon: ArrowUpRight, label: 'Buy', tone: 'text-profit bg-profit/10 border-profit/20' },
  sell: { icon: ArrowDownLeft, label: 'Sell', tone: 'text-loss bg-loss/10 border-loss/20' },
  alert: { icon: Bell, label: 'Alert', tone: 'text-accent bg-accent/10 border-accent/20' },
  dividend: { icon: Coins, label: 'Dividend', tone: 'text-accent-purple bg-accent-purple/10 border-accent-purple/20' },
}

export default function ActivityItem({ item, index = 0 }) {
  const c = config[item.type] || config.alert
  const Icon = c.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition"
    >
      <div className={clsx('size-9 rounded-xl grid place-items-center border', c.tone)}>
        <Icon size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{c.label}</span>
          <span className="text-slate-300 truncate">{item.symbol}</span>
        </div>
        <div className="text-[11px] text-slate-500 truncate">
          {item.qty != null ? `${item.qty} shares · ₹${formatNumber(item.price)}` : item.desc}
        </div>
      </div>
      <span className="text-[11px] text-slate-500 shrink-0">{item.time}</span>
    </motion.div>
  )
}
