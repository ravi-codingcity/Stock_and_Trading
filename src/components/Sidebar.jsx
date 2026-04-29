import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  LineChart,
  Briefcase,
  Star,
  Filter,
  Newspaper,
  Settings,
  Activity,
} from 'lucide-react'
import clsx from '../utils/clsx'

const items = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/markets', label: 'Markets', icon: LineChart },
  { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { to: '/watchlist', label: 'Watchlist', icon: Star },
  { to: '/screener', label: 'Screener', icon: Filter },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={clsx(
          'fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      />
      <aside
        className={clsx(
          'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 transition-transform duration-300',
          'bg-bg-soft/80 backdrop-blur-xl border-r border-white/5',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center gap-2 px-5 h-16 border-b border-white/5">
          <div className="size-9 rounded-xl bg-accent-gradient grid place-items-center shadow-glow">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">Apex Trade</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Premium</div>
          </div>
        </div>

        <nav className="px-3 py-5 space-y-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                  isActive
                    ? 'text-white bg-white/5 border border-white/10 shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 -z-0 rounded-xl bg-accent/10 border border-accent/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <span className="ml-auto relative z-10 size-1.5 rounded-full bg-accent shadow-glow animate-pulseGlow" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-4">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-accent/15 to-accent-purple/15 border border-white/10 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 size-24 rounded-full bg-accent/30 blur-2xl" />
            <div className="text-xs text-slate-300">Pro Plan</div>
            <div className="text-sm font-semibold mt-1">Unlock real-time data</div>
            <button className="mt-3 w-full btn-primary text-xs py-2">Upgrade</button>
          </div>
        </div>
      </aside>
    </>
  )
}
