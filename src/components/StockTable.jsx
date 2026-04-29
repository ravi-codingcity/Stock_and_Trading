import { motion } from 'framer-motion'
import { PctBadge } from './Badge'
import { formatNumber } from '../utils/format'
import clsx from '../utils/clsx'

export default function StockTable({ rows, columns, dense = false, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            {columns.map((c) => (
              <th
                key={c.key}
                className={clsx('font-medium py-3 px-4 border-b border-white/5', c.align === 'right' && 'text-right')}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <motion.tr
              key={r.symbol || r.name || i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              onClick={() => onRowClick?.(r)}
              className={clsx(
                'border-b border-white/5 hover:bg-white/[0.03] transition-colors',
                onRowClick && 'cursor-pointer',
                dense ? '[&>td]:py-2' : '[&>td]:py-3',
              )}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={clsx('px-4', c.align === 'right' && 'text-right', c.className)}
                >
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const numberCell = (val, d = 2) => formatNumber(val, d)
export const pctCell = (val) => <PctBadge value={val} />
