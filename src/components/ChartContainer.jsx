import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Cell,
} from 'recharts'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CandlestickChart, LineChart as LineIcon } from 'lucide-react'
import clsx from '../utils/clsx'
import Card from './Card'
import { PctBadge } from './Badge'
import AnimatedNumber from './AnimatedNumber'
import { chartData } from '../data/mockData'

const ranges = ['1D', '1W', '1M', '1Y']

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-xl border border-white/10 bg-bg-soft/90 backdrop-blur px-3 py-2 text-xs shadow-glow">
      <div className="text-slate-400 mb-1">{label}</div>
      {p.open !== undefined ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-slate-200">
          <span className="text-slate-500">O</span><span className="text-right">{p.open}</span>
          <span className="text-slate-500">H</span><span className="text-right text-profit">{p.high}</span>
          <span className="text-slate-500">L</span><span className="text-right text-loss">{p.low}</span>
          <span className="text-slate-500">C</span><span className="text-right">{p.close}</span>
        </div>
      ) : (
        <div className="text-slate-200 font-medium">{p.price}</div>
      )}
    </div>
  )
}

export default function ChartContainer() {
  const [range, setRange] = useState('1M')
  const [mode, setMode] = useState('line') // 'line' | 'candle'

  const data = chartData[range]
  const last = data[data.length - 1]
  const first = data[0]
  const change = last.close - first.open
  const changePct = (change / first.open) * 100

  // Derived candle bars: we use the high-low body as bar; color by open vs close
  const candles = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        body: Math.abs(d.close - d.open),
        wickTop: d.high - Math.max(d.open, d.close),
        wickBottom: Math.min(d.open, d.close) - d.low,
        up: d.close >= d.open,
      })),
    [data],
  )

  return (
    <Card className="p-5 lg:p-6 col-span-full xl:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent-gradient grid place-items-center font-bold">N</div>
            <div>
              <div className="text-slate-400 text-xs">NIFTY 50 · NSE</div>
              <div className="text-2xl font-semibold flex items-baseline gap-3">
                <AnimatedNumber value={last.close} />
                <PctBadge value={+changePct.toFixed(2)} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
            <button
              onClick={() => setMode('line')}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition',
                mode === 'line' ? 'bg-accent-gradient text-white shadow-glow' : 'text-slate-400 hover:text-white',
              )}
            >
              <LineIcon size={14} /> Line
            </button>
            <button
              onClick={() => setMode('candle')}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition',
                mode === 'candle' ? 'bg-accent-gradient text-white shadow-glow' : 'text-slate-400 hover:text-white',
              )}
            >
              <CandlestickChart size={14} /> Candles
            </button>
          </div>
          <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                  range === r ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={range + mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {mode === 'line' ? (
                <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.45} />
                      <stop offset="60%" stopColor="#8B5CF6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} width={60} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3B82F6', strokeOpacity: 0.4 }} />
                  <Area type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2.2} fill="url(#chartFill)" />
                </AreaChart>
              ) : (
                <BarChart data={candles} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} width={60} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.06)' }} />
                  {/* lower wick */}
                  <Bar dataKey="low" stackId="a" fill="transparent" />
                  <Bar dataKey="wickBottom" stackId="a" fill="#475569" barSize={2} />
                  <Bar dataKey="body" stackId="a" barSize={6}>
                    {candles.map((c, i) => (
                      <Cell key={i} fill={c.up ? '#22C55E' : '#EF4444'} />
                    ))}
                  </Bar>
                  <Bar dataKey="wickTop" stackId="a" fill="#475569" barSize={2} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  )
}
