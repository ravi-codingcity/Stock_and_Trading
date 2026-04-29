// Tiny clsx-like helper to avoid an extra dep
export default function clsx(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .filter((x) => typeof x === 'string')
    .join(' ')
}
