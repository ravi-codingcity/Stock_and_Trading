import useAnimatedNumber from '../hooks/useAnimatedNumber'
import { formatNumber } from '../utils/format'

export default function AnimatedNumber({ value, decimals = 2, prefix = '', suffix = '', className = '' }) {
  const v = useAnimatedNumber(value)
  return (
    <span className={className}>
      {prefix}
      {formatNumber(v, decimals)}
      {suffix}
    </span>
  )
}
