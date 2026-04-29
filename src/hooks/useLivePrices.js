import { useEffect, useState } from 'react'

// Simulate live ticking prices for a list of stocks
export default function useLivePrices(initial, intervalMs = 2200) {
  const [list, setList] = useState(initial)

  useEffect(() => {
    setList(initial)
  }, [initial])

  useEffect(() => {
    const id = setInterval(() => {
      setList((prev) =>
        prev.map((s) => {
          const drift = (Math.random() - 0.5) * (s.price * 0.004)
          const newPrice = +(s.price + drift).toFixed(2)
          const newPct = +(s.changePct + drift / s.price * 50).toFixed(2)
          return { ...s, price: newPrice, changePct: newPct }
        }),
      )
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return list
}
