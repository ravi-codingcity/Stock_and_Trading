import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Clock,
  Flame,
  Globe2,
  LayoutGrid,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import Card from '../components/Card'
import { PctBadge } from '../components/Badge'
import Sparkline from '../components/Sparkline'
import ChartContainer from '../components/ChartContainer'
import StockTable, { pctCell } from '../components/StockTable'
import AnimatedNumber from '../components/AnimatedNumber'
import { SkeletonCard, SkeletonLine } from '../components/Skeleton'
import SectorCard from '../components/SectorCard'
import InsightCard from '../components/InsightCard'
import ActivityItem from '../components/ActivityItem'
import {
  aiInsights,
  gainers,
  globalIndices,
  indices,
  losers,
  recentActivity,
  sectorPerformance,
  trendingStocks,
} from '../data/mockData'
import useLivePrices from '../hooks/useLivePrices'
import { useAuth } from '../context/AuthContext'
import { formatNumber, signed } from '../utils/format'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const liveTrending = useLivePrices(trendingStocks, 2500)
  const { user } = useAuth()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const firstName = (user?.name || 'Trader').split(' ')[0]
  const indianIndices = indices.filter((i) => i.region === 'India')

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            Good morning, <span className="bg-accent-gradient bg-clip-text text-transparent">{firstName}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Here's what's moving in the markets today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="size-2 rounded-full bg-profit animate-pulseGlow" /> Live · NSE/BSE
        </div>
      </div>

      {/* Advanced Market Overview — Indian indices */}
      <section>
        <SectionTitle icon={LayoutGrid} title="Market Overview" subtitle="Indian indices · live" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : indianIndices.map((idx) => (
                <Card key={idx.symbol} className="p-5 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 size-28 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-slate-400">{idx.symbol}</div>
                      <div className="text-sm font-medium">{idx.name}</div>
                    </div>
                    <PctBadge value={+idx.changePct.toFixed(2)} />
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight">
                    <AnimatedNumber value={idx.price} />
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className={'text-xs ' + (idx.change >= 0 ? 'text-profit' : 'text-loss')}>
                      {signed(idx.change)} today
                    </span>
                    <span className="text-[11px] text-slate-500">Vol {idx.volume}</span>
                  </div>
                  <div className="mt-3 -mx-2">
                    <Sparkline data={idx.series} positive={idx.change >= 0} />
                  </div>
                </Card>
              ))}
        </div>
      </section>

      {/* Chart + Trending */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ChartContainer />

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-accent-purple" />
              <h3 className="font-semibold">Trending</h3>
            </div>
            <span className="text-xs text-slate-400">Top movers</span>
          </div>
          <div className="space-y-2">
            {liveTrending.slice(0, 6).map((s, i) => (
              <motion.div
                key={s.symbol}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded-xl bg-white/5 border border-white/5 grid place-items-center text-[11px] font-semibold text-slate-300 group-hover:border-accent/40 transition">
                    {s.symbol.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{s.name}</div>
                    <div className="text-[11px] text-slate-500">{s.sector}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    <AnimatedNumber value={s.price} />
                  </div>
                  <div
                    className={
                      'text-[11px] inline-flex items-center gap-0.5 ' +
                      (s.changePct >= 0 ? 'text-profit' : 'text-loss')
                    }
                  >
                    {s.changePct >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                    {signed(s.changePct)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sector performance + Recent activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <h3 className="font-semibold">Sector Performance</h3>
            </div>
            <span className="text-xs text-slate-400">Today</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3">
            {sectorPerformance.map((s, i) => (
              <SectorCard key={s.short} {...s} index={i} />
            ))}
          </div>
        </Card>

        <Card className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent-purple" />
              <h3 className="font-semibold">Recent Activity</h3>
            </div>
            <button className="text-xs text-accent hover:underline">View all</button>
          </div>
          <div className="space-y-1.5 flex-1">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5">
                    <div className="skeleton size-9 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLine className="w-24" />
                      <SkeletonLine className="w-32 h-2" />
                    </div>
                  </div>
                ))
              : recentActivity.map((it, i) => <ActivityItem key={it.id} item={it} index={i} />)}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <section>
        <SectionTitle icon={Brain} title="AI Insights" subtitle="Signals refreshed every 15 min · UI demo" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiInsights.map((it, i) => (
            <InsightCard key={it.id} insight={it} index={i} />
          ))}
        </div>
      </section>

      {/* Global market snapshot */}
      <section>
        <SectionTitle icon={Globe2} title="Global Markets" subtitle="A quick world snapshot" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3">
          {globalIndices.map((g, i) => (
            <motion.div
              key={g.symbol}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card p-3 hover:border-accent/40 transition"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">{g.region}</span>
                <PctBadge value={+g.changePct.toFixed(2)} />
              </div>
              <div className="mt-1 text-sm font-semibold truncate">{g.name}</div>
              <div className="text-base font-semibold tabular-nums mt-0.5">
                {formatNumber(g.price)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gainers / Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-profit/15 grid place-items-center text-profit">
                <TrendingUp size={14} />
              </div>
              <h3 className="font-semibold">Top Gainers</h3>
            </div>
            <span className="text-xs text-slate-400">Today</span>
          </div>
          <StockTable
            dense
            rows={gainers}
            columns={[
              { key: 'name', label: 'Stock', render: (r) => (
                <div>
                  <div className="text-sm font-medium">{r.symbol}</div>
                  <div className="text-[11px] text-slate-500">{r.name}</div>
                </div>
              )},
              { key: 'price', label: 'Price', align: 'right', render: (r) => formatNumber(r.price) },
              { key: 'changePct', label: '% Chg', align: 'right', render: (r) => pctCell(r.changePct) },
            ]}
          />
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-loss/15 grid place-items-center text-loss">
                <TrendingDown size={14} />
              </div>
              <h3 className="font-semibold">Top Losers</h3>
            </div>
            <span className="text-xs text-slate-400">Today</span>
          </div>
          <StockTable
            dense
            rows={losers}
            columns={[
              { key: 'name', label: 'Stock', render: (r) => (
                <div>
                  <div className="text-sm font-medium">{r.symbol}</div>
                  <div className="text-[11px] text-slate-500">{r.name}</div>
                </div>
              )},
              { key: 'price', label: 'Price', align: 'right', render: (r) => formatNumber(r.price) },
              { key: 'changePct', label: '% Chg', align: 'right', render: (r) => pctCell(r.changePct) },
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-xl bg-white/5 border border-white/5 grid place-items-center text-accent">
          <Icon size={16} />
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
