import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, Search } from 'lucide-react'
import NewsCard from '../components/NewsCard'
import { newsCategories, newsItems } from '../data/mockData'
import clsx from '../utils/clsx'

export default function News() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return newsItems.filter((n) => {
      if (category !== 'All' && n.category !== category) return false
      if (query) {
        const q = query.toLowerCase()
        if (!n.title.toLowerCase().includes(q) && !n.desc.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [category, query])

  const featured = filtered.find((n) => n.featured) || filtered[0]
  const rest = filtered.filter((n) => n !== featured)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Newspaper className="text-accent" /> Market News
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Latest updates curated for traders · {filtered.length} stories
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input w-full pl-9"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {newsCategories.map((c) => (
          <motion.button
            key={c}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory(c)}
            className={clsx(
              'px-3 py-1.5 rounded-xl text-xs font-medium border transition',
              category === c
                ? 'bg-accent-gradient text-white border-transparent shadow-glow'
                : 'bg-white/5 border-white/5 text-slate-300 hover:border-accent/40 hover:text-white',
            )}
          >
            {c}
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-sm text-slate-500">No stories match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr gap-4">
          {featured && <NewsCard item={featured} featured index={0} />}
          {rest.map((n, i) => (
            <NewsCard key={n.id} item={n} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
