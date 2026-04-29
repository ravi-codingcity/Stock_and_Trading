import Card from '../components/Card'
import Sparkline from '../components/Sparkline'
import { PctBadge } from '../components/Badge'
import AnimatedNumber from '../components/AnimatedNumber'
import { indices, trendingStocks } from '../data/mockData'
import { formatCompact, formatNumber, signed } from '../utils/format'

export default function Markets() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">Markets</h1>
        <p className="text-slate-400 text-sm mt-1">Global indices and most-active stocks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indices.map((idx) => (
          <Card key={idx.symbol} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">{idx.symbol}</div>
                <div className="text-base font-semibold">{idx.name}</div>
              </div>
              <PctBadge value={+idx.changePct.toFixed(2)} />
            </div>
            <div className="text-2xl font-semibold mt-3"><AnimatedNumber value={idx.price} /></div>
            <div className={'text-xs ' + (idx.change >= 0 ? 'text-profit' : 'text-loss')}>
              {signed(idx.change)} today
            </div>
            <div className="mt-3 -mx-2">
              <Sparkline data={idx.series} positive={idx.change >= 0} height={56} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Most Active</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {trendingStocks.map((s) => (
            <div
              key={s.symbol}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent/40 hover:bg-white/[0.06] transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{s.symbol}</span>
                <PctBadge value={+s.changePct.toFixed(2)} />
              </div>
              <div className="text-[11px] text-slate-500 truncate">{s.name}</div>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-semibold">{formatNumber(s.price)}</span>
                <span className="text-[11px] text-slate-500">{formatCompact(s.mcap)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
