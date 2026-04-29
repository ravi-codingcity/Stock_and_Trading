import { useState } from 'react'
import { Plus, Star, Trash2 } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import StockTable, { pctCell } from '../components/StockTable'
import AnimatedNumber from '../components/AnimatedNumber'
import { trendingStocks, watchlistInit } from '../data/mockData'
import useLivePrices from '../hooks/useLivePrices'
import { formatNumber } from '../utils/format'

export default function Watchlist() {
  const [items, setItems] = useState(watchlistInit)
  const [adding, setAdding] = useState(false)
  const live = useLivePrices(items, 2000)

  const addable = trendingStocks.filter((t) => !items.find((i) => i.symbol === t.symbol))

  const remove = (sym) => setItems((prev) => prev.filter((i) => i.symbol !== sym))
  const add = (s) => {
    setItems((prev) => [...prev, { name: s.name, symbol: s.symbol, price: s.price, changePct: s.changePct }])
    setAdding(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Star className="text-accent-purple" /> Watchlist
          </h1>
          <p className="text-slate-400 text-sm mt-1">Stocks you're keeping an eye on, with live-like updates.</p>
        </div>
        <Button onClick={() => setAdding((v) => !v)}>
          <Plus size={16} /> Add stock
        </Button>
      </div>

      {adding && (
        <Card className="p-4">
          <div className="text-xs text-slate-400 mb-3">Pick a stock to add</div>
          <div className="flex flex-wrap gap-2">
            {addable.map((s) => (
              <button
                key={s.symbol}
                onClick={() => add(s)}
                className="px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-white/10 transition"
              >
                {s.symbol}
                <span className="text-slate-500 ml-2">{s.name}</span>
              </button>
            ))}
            {addable.length === 0 && <span className="text-xs text-slate-500">All available stocks already added.</span>}
          </div>
        </Card>
      )}

      <Card className="p-0">
        <StockTable
          rows={live}
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
            {
              key: 'price',
              label: 'Price',
              align: 'right',
              render: (r) => (
                <span className="font-medium">
                  <AnimatedNumber value={r.price} />
                </span>
              ),
            },
            { key: 'changePct', label: '% Chg', align: 'right', render: (r) => pctCell(+r.changePct.toFixed(2)) },
            {
              key: 'actions',
              label: '',
              align: 'right',
              render: (r) => (
                <button
                  onClick={() => remove(r.symbol)}
                  className="size-8 grid place-items-center rounded-lg text-slate-400 hover:text-loss hover:bg-loss/10 transition"
                  aria-label="Remove"
                >
                  <Trash2 size={14} />
                </button>
              ),
            },
          ]}
        />
        {items.length === 0 && (
          <div className="p-10 text-center text-sm text-slate-500">Your watchlist is empty. Add a stock to get started.</div>
        )}
      </Card>
    </div>
  )
}
