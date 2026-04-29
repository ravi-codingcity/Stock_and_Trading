export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(n)

export const formatNumber = (n, d = 2) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: d,
    minimumFractionDigits: d,
  }).format(n)

export const formatCompact = (n) =>
  new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 2 }).format(n)

export const pctClass = (v) => (v >= 0 ? 'text-profit' : 'text-loss')
export const pctBg = (v) =>
  v >= 0 ? 'bg-profit/10 text-profit border-profit/20' : 'bg-loss/10 text-loss border-loss/20'
export const signed = (v, d = 2) => `${v >= 0 ? '+' : ''}${formatNumber(v, d)}`
