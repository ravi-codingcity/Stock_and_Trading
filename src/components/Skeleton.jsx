import clsx from '../utils/clsx'

export function SkeletonLine({ className = '' }) {
  return <div className={clsx('skeleton h-3 w-full', className)} />
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={clsx('card p-5 space-y-3', className)}>
      <SkeletonLine className="w-24" />
      <SkeletonLine className="h-6 w-32" />
      <SkeletonLine className="w-16" />
      <div className="skeleton h-12 w-full" />
    </div>
  )
}
