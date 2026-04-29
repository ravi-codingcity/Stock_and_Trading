import { useMemo, useState } from 'react'
import { Filter as FilterIcon, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import { PctBadge } from '../components/Badge'
import { screenerStocks, sectors } from '../data/mockData'
import { formatCompact, formatNumber } from '../utils/format'

const initial = { sector: 'All', minPrice: 0, maxPrice: 20000, minMcap: 0 }

export default function Screener() {
  const [filters, setFilters] = useState(initial)

  const filtered = useMemo(() => {
    return screenerStocks.filter((s) => {
      if (filters.sector !== 'All' && s.sector !== filters.sector) return false
      if (s.price < filters.minPrice) return false
      if (s.price > filters.maxPrice) return false
      if ((s.mcap || 0) < filters.minMcap) return false
      return true
    })
  }, [filters])

  const set = (k, v) => setFilters((p) => ({ ...p, [k]: v }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight flex items-center gap-2">
          <FilterIcon className="text-accent" /> Screener
        </h1>
        <p className="text-slate-400 text-sm mt-1">Find stocks that match your criteria.</p>
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field label="Sector">
            <select
              value={filters.sector}
              onChange={(e) => set('sector', e.target.value)}
              className="input w-full"
            >
              {sectors.map((s) => (
                <option key={s} value={s} className="bg-bg-soft">
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label={`Min Price · ₹${filters.minPrice}`}>
            <input
              type="range"
              min="0"
              max="20000"
              step="50"
              value={filters.minPrice}
              onChange={(e) => set('minPrice', +e.target.value)}
              className="w-full accent-accent"
            />
          </Field>
          <Field label={`Max Price · ₹${filters.maxPrice}`}>
            <input
              type="range"
              min="0"
              max="20000"
              step="50"
              value={filters.maxPrice}
              onChange={(e) => set('maxPrice', +e.target.value)}
              className="w-full accent-accent"
            />
          </Field>
          <Field label={`Min Mcap · ${formatCompact(filters.minMcap)}`}>
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={filters.minMcap}
              onChange={(e) => set('minMcap', +e.target.value)}
              className="w-full accent-accent"
            />
          </Field>
        </div>
        <div className="flex items-center justify-between mt-5">
          <span className="text-xs text-slate-400">
            {filtered.length} match{filtered.length === 1 ? '' : 'es'}
          </span>
          <Button variant="ghost" onClick={() => setFilters(initial)}>
            <RotateCcw size={14} /> Reset
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s, i) => (
          <motion.div
            key={s.symbol + i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <Card className="p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs text-slate-400">{s.sector}</div>
                  <div className="text-sm font-semibold truncate">{s.symbol}</div>
                  <div className="text-[11px] text-slate-500 truncate">{s.name}</div>
                </div>
                <PctBadge value={+s.changePct.toFixed(2)} />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="text-xl font-semibold">{formatNumber(s.price)}</div>
                <div className="text-[11px] text-slate-500">Mcap {formatCompact(s.mcap || 0)}</div>
              </div>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <Card className="p-10 col-span-full text-center text-slate-500 text-sm">
            No stocks match the current filters.
          </Card>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}
