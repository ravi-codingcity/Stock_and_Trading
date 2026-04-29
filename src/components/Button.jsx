import clsx from '../utils/clsx'

export default function Button({ variant = 'primary', className = '', children, ...rest }) {
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    outline: 'btn border border-white/10 hover:border-accent/50 hover:text-white text-slate-300',
  }
  return (
    <button className={clsx(variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}
