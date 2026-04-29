import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import clsx from '../utils/clsx'

const gradients = [
  'from-blue-500/30 via-indigo-500/20 to-purple-500/30',
  'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
  'from-rose-500/30 via-pink-500/20 to-fuchsia-500/30',
  'from-amber-500/30 via-orange-500/20 to-red-500/30',
  'from-violet-500/30 via-purple-500/20 to-indigo-500/30',
  'from-sky-500/30 via-blue-500/20 to-indigo-500/30',
]

const sentimentTone = {
  positive: 'bg-profit/15 text-profit border-profit/20',
  negative: 'bg-loss/15 text-loss border-loss/20',
  neutral: 'bg-white/10 text-slate-300 border-white/10',
}

export default function NewsCard({ item, featured = false, index = 0 }) {
  const gradient = gradients[item.id % gradients.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className={clsx(
        'card overflow-hidden flex flex-col group cursor-pointer hover:border-accent/40 transition',
        featured && 'md:col-span-2 lg:col-span-2 xl:col-span-2 md:row-span-2',
      )}
    >
      <div
        className={clsx(
          'relative bg-gradient-to-br',
          gradient,
          featured ? 'h-48 md:h-56 lg:h-64' : 'h-28',
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/40 backdrop-blur-md text-white border border-white/10">
            {item.category}
          </span>
          {featured && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-accent-gradient text-white shadow-glow">
              Featured
            </span>
          )}
        </div>
        <span
          className={clsx(
            'absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md',
            sentimentTone[item.sentiment] || sentimentTone.neutral,
          )}
        >
          {item.sentiment}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>{item.source}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {item.time}
          </span>
        </div>
        <h3
          className={clsx(
            'mt-2 font-semibold leading-snug group-hover:text-accent transition',
            featured ? 'text-lg lg:text-xl' : 'text-sm',
          )}
        >
          {item.title}
        </h3>
        <p
          className={clsx(
            'mt-2 text-slate-400 leading-relaxed',
            featured ? 'text-sm line-clamp-4' : 'text-xs line-clamp-2',
          )}
        >
          {item.desc}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <button className="text-xs font-medium text-accent inline-flex items-center gap-1 hover:gap-1.5 transition-all">
            Read more <ArrowUpRight size={13} />
          </button>
          {item.tickers?.length > 0 && (
            <div className="flex gap-1">
              {item.tickers.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/5 border border-white/5 text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
