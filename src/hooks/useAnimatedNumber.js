import { useEffect, useRef, useState } from 'react'

// Animated counter that smoothly tweens to the target value
export default function useAnimatedNumber(target, duration = 800) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const startRef = useRef(performance.now())

  useEffect(() => {
    fromRef.current = value
    startRef.current = performance.now()
    let raf
    const tick = (t) => {
      const elapsed = t - startRef.current
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = fromRef.current + (target - fromRef.current) * eased
      setValue(next)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return value
}
