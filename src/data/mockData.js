// Generates a deterministic-ish sparkline series
const seriesFor = (seed, points = 24, base = 100, vol = 4) => {
  const arr = []
  let v = base
  for (let i = 0; i < points; i++) {
    const r = Math.sin((seed + i) * 1.7) + Math.cos((seed + i) * 0.6)
    v += r * vol * 0.4 + (Math.random() - 0.5) * vol * 0.6
    arr.push({ x: i, value: +v.toFixed(2) })
  }
  return arr
}

export const indices = [
  { name: 'NIFTY 50', symbol: 'NIFTY', price: 22431.4, change: 124.5, changePct: 0.56, volume: '312M', region: 'India', series: seriesFor(1, 30, 22300, 60) },
  { name: 'SENSEX', symbol: 'SENSEX', price: 73852.1, change: -210.8, changePct: -0.28, volume: '198M', region: 'India', series: seriesFor(2, 30, 74000, 180) },
  { name: 'BANK NIFTY', symbol: 'BANKNIFTY', price: 47812.3, change: 312.4, changePct: 0.66, volume: '142M', region: 'India', series: seriesFor(3, 30, 47500, 120) },
  { name: 'NIFTY IT', symbol: 'NIFTYIT', price: 38421.6, change: -185.2, changePct: -0.48, volume: '88M', region: 'India', series: seriesFor(11, 30, 38500, 110) },
  { name: 'NIFTY MIDCAP', symbol: 'NIFTYMID', price: 51284.3, change: 421.6, changePct: 0.83, volume: '76M', region: 'India', series: seriesFor(12, 30, 51000, 130) },
  { name: 'NASDAQ', symbol: 'IXIC', price: 17436.2, change: 88.6, changePct: 0.51, volume: '4.2B', region: 'US', series: seriesFor(4, 30, 17300, 50) },
  { name: 'S&P 500', symbol: 'SPX', price: 5432.8, change: -12.4, changePct: -0.23, volume: '2.1B', region: 'US', series: seriesFor(5, 30, 5440, 18) },
  { name: 'DOW JONES', symbol: 'DJI', price: 39812.5, change: 152.3, changePct: 0.38, volume: '380M', region: 'US', series: seriesFor(13, 30, 39700, 140) },
]

export const globalIndices = [
  { name: 'NASDAQ', symbol: 'IXIC', price: 17436.2, changePct: 0.51, region: '🇺🇸 US' },
  { name: 'S&P 500', symbol: 'SPX', price: 5432.8, changePct: -0.23, region: '🇺🇸 US' },
  { name: 'Dow Jones', symbol: 'DJI', price: 39812.5, changePct: 0.38, region: '🇺🇸 US' },
  { name: 'FTSE 100', symbol: 'FTSE', price: 8204.3, changePct: 0.18, region: '🇬🇧 UK' },
  { name: 'DAX', symbol: 'DAX', price: 18672.1, changePct: -0.42, region: '🇩🇪 DE' },
  { name: 'Nikkei 225', symbol: 'N225', price: 38234.6, changePct: 1.21, region: '🇯🇵 JP' },
  { name: 'Hang Seng', symbol: 'HSI', price: 18512.9, changePct: -0.86, region: '🇭🇰 HK' },
  { name: 'Shanghai', symbol: 'SHCOMP', price: 3084.2, changePct: 0.34, region: '🇨🇳 CN' },
]

export const trendingStocks = [
  { name: 'Reliance Industries', symbol: 'RELIANCE', price: 2854.2, changePct: 1.42, sector: 'Energy', mcap: 1930000 },
  { name: 'Tata Consultancy', symbol: 'TCS', price: 3942.5, changePct: -0.62, sector: 'IT', mcap: 1430000 },
  { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1521.8, changePct: 0.84, sector: 'Banking', mcap: 1160000 },
  { name: 'Infosys', symbol: 'INFY', price: 1486.3, changePct: 2.11, sector: 'IT', mcap: 615000 },
  { name: 'ICICI Bank', symbol: 'ICICIBANK', price: 1142.7, changePct: -0.31, sector: 'Banking', mcap: 803000 },
  { name: 'Bharti Airtel', symbol: 'BHARTIARTL', price: 1357.9, changePct: 1.93, sector: 'Telecom', mcap: 763000 },
  { name: 'ITC Ltd', symbol: 'ITC', price: 432.1, changePct: 0.22, sector: 'FMCG', mcap: 540000 },
  { name: 'Larsen & Toubro', symbol: 'LT', price: 3621.4, changePct: -1.05, sector: 'Infra', mcap: 498000 },
]

export const gainers = [
  { name: 'Adani Enterprises', symbol: 'ADANIENT', price: 3214.5, changePct: 6.84 },
  { name: 'Tata Motors', symbol: 'TATAMOTORS', price: 985.2, changePct: 5.12 },
  { name: 'Zomato', symbol: 'ZOMATO', price: 192.4, changePct: 4.78 },
  { name: 'Wipro', symbol: 'WIPRO', price: 482.6, changePct: 3.91 },
  { name: 'Maruti Suzuki', symbol: 'MARUTI', price: 12540.0, changePct: 3.42 },
]

export const losers = [
  { name: 'Bajaj Finance', symbol: 'BAJFINANCE', price: 6824.7, changePct: -4.21 },
  { name: 'Asian Paints', symbol: 'ASIANPAINT', price: 2845.3, changePct: -3.74 },
  { name: 'Hindustan Unilever', symbol: 'HINDUNILVR', price: 2312.9, changePct: -2.85 },
  { name: 'Sun Pharma', symbol: 'SUNPHARMA', price: 1542.3, changePct: -2.12 },
  { name: 'Nestle India', symbol: 'NESTLEIND', price: 2421.6, changePct: -1.94 },
]

export const sectorPerformance = [
  { name: 'Information Technology', short: 'IT', changePct: 2.14 },
  { name: 'Banking & Finance', short: 'Banking', changePct: 1.32 },
  { name: 'Pharmaceuticals', short: 'Pharma', changePct: -0.84 },
  { name: 'Automobile', short: 'Auto', changePct: 3.05 },
  { name: 'Energy & Oil', short: 'Energy', changePct: 0.62 },
  { name: 'FMCG', short: 'FMCG', changePct: -0.41 },
  { name: 'Telecom', short: 'Telecom', changePct: 1.78 },
  { name: 'Realty', short: 'Realty', changePct: -1.92 },
  { name: 'Metals', short: 'Metals', changePct: 2.41 },
  { name: 'Infra', short: 'Infra', changePct: -0.65 },
]

export const aiInsights = [
  {
    id: 1,
    signal: 'Strong Buy',
    tone: 'positive',
    symbol: 'INFY',
    name: 'Infosys',
    confidence: 87,
    desc: 'Bullish momentum with breakout above 50-DMA. Volume surge supports the trend.',
  },
  {
    id: 2,
    signal: 'Watch',
    tone: 'accent',
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    confidence: 64,
    desc: 'Consolidating near resistance. Watch for a decisive breakout above ₹2,870.',
  },
  {
    id: 3,
    signal: 'High Volatility',
    tone: 'purple',
    symbol: 'ADANIENT',
    name: 'Adani Enterprises',
    confidence: 72,
    desc: 'Implied volatility expanded 38% this week. Use tight stops.',
  },
  {
    id: 4,
    signal: 'Sell',
    tone: 'negative',
    symbol: 'ASIANPAINT',
    name: 'Asian Paints',
    confidence: 78,
    desc: 'Weak earnings outlook, breaks below key support of ₹2,900.',
  },
]

export const recentActivity = [
  { id: 1, type: 'buy', symbol: 'RELIANCE', qty: 5, price: 2848.3, time: '2m ago' },
  { id: 2, type: 'alert', symbol: 'INFY', desc: 'Crossed above ₹1,480', time: '14m ago' },
  { id: 3, type: 'sell', symbol: 'ITC', qty: 30, price: 432.1, time: '1h ago' },
  { id: 4, type: 'alert', symbol: 'BANKNIFTY', desc: 'Sector breakout', time: '2h ago' },
  { id: 5, type: 'buy', symbol: 'TATAMOTORS', qty: 12, price: 980.5, time: '3h ago' },
  { id: 6, type: 'dividend', symbol: 'TCS', desc: 'Dividend ₹27/share', time: '5h ago' },
]

export const chartData = {
  '1D': Array.from({ length: 78 }, (_, i) => {
    const o = 22380 + Math.sin(i / 5) * 40 + (Math.random() - 0.5) * 20
    const c = o + (Math.random() - 0.5) * 30
    return {
      time: `${9 + Math.floor(i / 12)}:${String((i * 5) % 60).padStart(2, '0')}`,
      open: +o.toFixed(2),
      close: +c.toFixed(2),
      high: +(Math.max(o, c) + Math.random() * 10).toFixed(2),
      low: +(Math.min(o, c) - Math.random() * 10).toFixed(2),
      price: +c.toFixed(2),
    }
  }),
  '1W': Array.from({ length: 35 }, (_, i) => {
    const o = 22100 + i * 12 + Math.sin(i / 3) * 60 + (Math.random() - 0.5) * 40
    const c = o + (Math.random() - 0.5) * 60
    return {
      time: `D${Math.floor(i / 5) + 1}-${(i % 5) + 1}`,
      open: +o.toFixed(2),
      close: +c.toFixed(2),
      high: +(Math.max(o, c) + Math.random() * 30).toFixed(2),
      low: +(Math.min(o, c) - Math.random() * 30).toFixed(2),
      price: +c.toFixed(2),
    }
  }),
  '1M': Array.from({ length: 30 }, (_, i) => {
    const o = 21800 + i * 22 + Math.sin(i / 2) * 80 + (Math.random() - 0.5) * 60
    const c = o + (Math.random() - 0.5) * 100
    return {
      time: `${i + 1}`,
      open: +o.toFixed(2),
      close: +c.toFixed(2),
      high: +(Math.max(o, c) + Math.random() * 40).toFixed(2),
      low: +(Math.min(o, c) - Math.random() * 40).toFixed(2),
      price: +c.toFixed(2),
    }
  }),
  '1Y': Array.from({ length: 52 }, (_, i) => {
    const o = 19500 + i * 56 + Math.sin(i / 4) * 220 + (Math.random() - 0.5) * 160
    const c = o + (Math.random() - 0.5) * 220
    return {
      time: `W${i + 1}`,
      open: +o.toFixed(2),
      close: +c.toFixed(2),
      high: +(Math.max(o, c) + Math.random() * 80).toFixed(2),
      low: +(Math.min(o, c) - Math.random() * 80).toFixed(2),
      price: +c.toFixed(2),
    }
  }),
}

export const portfolioHoldings = [
  { name: 'Reliance Industries', symbol: 'RELIANCE', qty: 25, buy: 2500, current: 2854.2, sector: 'Energy' },
  { name: 'Infosys', symbol: 'INFY', qty: 40, buy: 1320, current: 1486.3, sector: 'IT' },
  { name: 'HDFC Bank', symbol: 'HDFCBANK', qty: 30, buy: 1610, current: 1521.8, sector: 'Banking' },
  { name: 'Tata Motors', symbol: 'TATAMOTORS', qty: 60, buy: 720, current: 985.2, sector: 'Auto' },
  { name: 'ITC Ltd', symbol: 'ITC', qty: 100, buy: 410, current: 432.1, sector: 'FMCG' },
  { name: 'Bharti Airtel', symbol: 'BHARTIARTL', qty: 35, buy: 1180, current: 1357.9, sector: 'Telecom' },
]

export const watchlistInit = [
  { name: 'Adani Enterprises', symbol: 'ADANIENT', price: 3214.5, changePct: 6.84 },
  { name: 'Zomato', symbol: 'ZOMATO', price: 192.4, changePct: 4.78 },
  { name: 'Maruti Suzuki', symbol: 'MARUTI', price: 12540.0, changePct: 3.42 },
  { name: 'Asian Paints', symbol: 'ASIANPAINT', price: 2845.3, changePct: -3.74 },
  { name: 'Sun Pharma', symbol: 'SUNPHARMA', price: 1542.3, changePct: -2.12 },
]

export const screenerStocks = [
  ...trendingStocks,
  ...gainers.map((g) => ({ ...g, sector: 'Various', mcap: 200000 + Math.random() * 600000 })),
  ...losers.map((l) => ({ ...l, sector: 'Various', mcap: 200000 + Math.random() * 600000 })),
]

export const sectors = ['All', 'IT', 'Banking', 'Energy', 'FMCG', 'Telecom', 'Infra', 'Auto', 'Various']

export const newsCategories = ['All', 'Economy', 'Stocks', 'Crypto', 'Global', 'Earnings', 'Commodities']

export const newsItems = [
  {
    id: 1,
    title: 'RBI holds repo rate steady at 6.5% amid easing inflation',
    desc: 'The central bank kept the benchmark repo rate unchanged for the seventh consecutive meeting, signaling a cautious stance as inflation cools toward the 4% target.',
    sentiment: 'neutral',
    source: 'Reuters',
    time: '2h ago',
    category: 'Economy',
    image: 'rbi',
    featured: true,
  },
  {
    id: 2,
    title: 'Reliance Industries beats Q4 estimates on retail strength',
    desc: 'Strong performance in retail and digital businesses lifted consolidated profits beyond analyst expectations, while Jio added 11M subscribers.',
    sentiment: 'positive',
    source: 'Bloomberg',
    time: '4h ago',
    category: 'Earnings',
  },
  {
    id: 3,
    title: 'IT sector under pressure as US clients delay deals',
    desc: 'Major IT firms see deal closures pushed to next quarter as enterprise budgets tighten amid an uncertain macro backdrop.',
    sentiment: 'negative',
    source: 'Mint',
    time: '6h ago',
    category: 'Stocks',
  },
  {
    id: 4,
    title: 'Tata Motors EV sales hit record monthly high',
    desc: 'EV deliveries surged 38% YoY, helping the automaker consolidate its leadership in the domestic electric segment.',
    sentiment: 'positive',
    source: 'ET Auto',
    time: '8h ago',
    category: 'Stocks',
  },
  {
    id: 5,
    title: 'Crude oil eases as supply concerns recede',
    desc: 'Brent slipped below $84 a barrel as geopolitical tensions cooled and inventories built up in the US.',
    sentiment: 'neutral',
    source: 'CNBC',
    time: '10h ago',
    category: 'Commodities',
  },
  {
    id: 6,
    title: 'FIIs turn net buyers after three weeks of outflows',
    desc: 'Foreign institutional investors poured in over ₹3,200 crore into Indian equities last session, reversing a streak of outflows.',
    sentiment: 'positive',
    source: 'Moneycontrol',
    time: '12h ago',
    category: 'Economy',
  },
  {
    id: 7,
    title: 'Bitcoin tops $72,000 as ETF inflows accelerate',
    desc: 'Spot Bitcoin ETFs saw record weekly inflows, lifting the cryptocurrency to a fresh 6-month high.',
    sentiment: 'positive',
    source: 'CoinDesk',
    time: '14h ago',
    category: 'Crypto',
  },
  {
    id: 8,
    title: 'Fed minutes hint at later rate cuts than markets expect',
    desc: 'Several officials noted that progress on inflation has stalled, suggesting policy may need to remain restrictive for longer.',
    sentiment: 'negative',
    source: 'WSJ',
    time: '16h ago',
    category: 'Global',
  },
  {
    id: 9,
    title: 'Gold tests fresh all-time highs near $2,420',
    desc: 'Safe-haven demand and central-bank buying continue to underpin the precious metal\u2019s rally.',
    sentiment: 'positive',
    source: 'Kitco',
    time: '18h ago',
    category: 'Commodities',
  },
  {
    id: 10,
    title: 'Infosys announces ₹9,300 cr buyback at ₹1,750 per share',
    desc: 'The IT major\u2019s board approved its third major buyback in five years, returning capital to shareholders.',
    sentiment: 'positive',
    source: 'Business Standard',
    time: '20h ago',
    category: 'Earnings',
  },
  {
    id: 11,
    title: 'Ethereum upgrade goes live, gas fees drop 40%',
    desc: 'The latest network upgrade improves L2 settlement efficiency and significantly reduces transaction costs.',
    sentiment: 'positive',
    source: 'The Block',
    time: '22h ago',
    category: 'Crypto',
  },
  {
    id: 12,
    title: 'China factory activity contracts for second month',
    desc: 'Official PMI fell to 49.1, missing estimates and reinforcing expectations of more stimulus from Beijing.',
    sentiment: 'negative',
    source: 'Reuters',
    time: '1d ago',
    category: 'Global',
  },
]

export const allocation = [
  { name: 'IT', value: 28 },
  { name: 'Banking', value: 22 },
  { name: 'Energy', value: 18 },
  { name: 'Auto', value: 14 },
  { name: 'FMCG', value: 10 },
  { name: 'Telecom', value: 8 },
]
