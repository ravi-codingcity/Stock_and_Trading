import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from '../components/Card'
import { PctBadge } from '../components/Badge'
import StockTable from '../components/StockTable'
import AnimatedNumber from '../components/AnimatedNumber'
import { allocation, portfolioHoldings } from '../data/mockData'
import { formatINR, formatNumber, pctClass, signed } from '../utils/format'

const COLORS = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4']

export default function Portfolio() {
  const stats = useMemo(() => {
    let invested = 0
    let current = 0
    portfolioHoldings.forEach((h) => {
      invested += h.qty * h.buy
      current += h.qty * h.current
    })
    const pl = current - invested
    const plPct = (pl / invested) * 100
    return { invested, current, pl, plPct }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-slate-400 text-sm mt-1">Track your investments and asset allocation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Invested" value={stats.invested} />
            <Stat label="Current Value" value={stats.current} accent />
            <Stat label="Total P/L" value={stats.pl} pl />
            <Stat label="Returns" value={stats.plPct} pct />
          </div>
          <div className="mt-6 h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-accent-gradient"
              style={{ width: `${Math.min(100, Math.max(0, stats.plPct + 50))}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Performance vs. benchmark NIFTY 50</p>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-3">Asset Allocation</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {allocation.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0F1422',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allocation.map((a, i) => (
              <div key={a.name} className="flex items-center gap-2 text-xs">
                <span className="size-2.5 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-slate-300">{a.name}</span>
                <span className="ml-auto text-slate-500">{a.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-5 flex items-center justify-between border-b border-white/5">
          <h3 className="font-semibold">Holdings</h3>
          <span className="text-xs text-slate-400">{portfolioHoldings.length} stocks</span>
        </div>
        <StockTable
          rows={portfolioHoldings.map((h) => ({
            ...h,
            invested: h.qty * h.buy,
            value: h.qty * h.current,
            pl: h.qty * (h.current - h.buy),
            plPct: ((h.current - h.buy) / h.buy) * 100,
          }))}
          columns={[
            {
              key: 'name',
              label: 'Stock',
              render: (r) => (
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-white/5 border border-white/5 grid place-items-center text-[11px] font-semibold text-slate-300">
                    {r.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.symbol}</div>
                    <div className="text-[11px] text-slate-500">{r.name}</div>
                  </div>
                </div>
              ),
            },
            { key: 'qty', label: 'Qty', align: 'right' },
            { key: 'buy', label: 'Buy ₹', align: 'right', render: (r) => formatNumber(r.buy) },
            { key: 'current', label: 'LTP', align: 'right', render: (r) => formatNumber(r.current) },
            { key: 'value', label: 'Value', align: 'right', render: (r) => formatINR(r.value) },
            {
              key: 'pl',
              label: 'P/L',
              align: 'right',
              render: (r) => (
                <span className={pctClass(r.pl)}>
                  {signed(r.pl, 0)}
                </span>
              ),
            },
            { key: 'plPct', label: '% P/L', align: 'right', render: (r) => <PctBadge value={+r.plPct.toFixed(2)} /> },
          ]}
        />
      </Card>
    </div>
  )
}

function Stat({ label, value, accent, pl, pct }) {
  const className = pl
    ? pctClass(value)
    : accent
    ? 'bg-accent-gradient bg-clip-text text-transparent'
    : 'text-white'
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className={'text-xl lg:text-2xl font-semibold mt-1 ' + className}>
        {pct ? (
          <>
            <AnimatedNumber value={value} />%
          </>
        ) : (
          <AnimatedNumber value={value} prefix="₹" />
        )}
      </div>
    </div>
  )
}
