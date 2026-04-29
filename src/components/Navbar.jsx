import { Bell, ChevronDown, LogOut, Menu, Moon, Search, Settings as SettingsIcon, Sun, User as UserIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onMenu }) {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const handleLogout = () => {
    logout()
    setShowProfile(false)
    navigate('/login', { replace: true })
  }

  const initials = (user?.name || 'Trader')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="sticky top-0 z-20 h-16 bg-bg/70 backdrop-blur-xl border-b border-white/5">
      <div className="h-full px-3 sm:px-4 lg:px-6 flex items-center gap-2 sm:gap-3">
        <button
          onClick={onMenu}
          className="lg:hidden size-9 grid place-items-center rounded-xl bg-white/5 border border-white/5 text-slate-300 shrink-0"
          aria-label="menu"
        >
          <Menu size={18} />
        </button>

        <div className="relative flex-1 max-w-xl">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search stocks, indices, news..."
            className="input w-full pl-9"
          />
          <kbd className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 border border-white/10 rounded px-1.5 py-0.5 bg-white/5">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggle}
            className="relative size-9 grid place-items-center rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-accent/40 transition overflow-hidden"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="moon"
                  initial={{ y: 14, rotate: -30, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -14, rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid place-items-center"
                >
                  <Moon size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ y: 14, rotate: -30, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -14, rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid place-items-center text-amber-500"
                >
                  <Sun size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotif((v) => !v); setShowProfile(false) }}
              className="relative size-9 grid place-items-center rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-accent/40 transition"
              aria-label="notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-loss shadow-glow animate-pulseGlow" />
            </button>
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-1rem)] card p-3 z-30"
                >
                  <div className="text-sm font-medium mb-2 px-1">Notifications</div>
                  {[
                    { t: 'RELIANCE crossed ₹2850', s: 'Price alert · 2m ago', tone: 'profit' },
                    { t: 'IT sector down 1.2%', s: 'Sector update · 18m ago', tone: 'loss' },
                    { t: 'Earnings · INFY today', s: 'Calendar · 1h ago', tone: 'accent' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer">
                      <span
                        className={
                          'mt-1 size-2 rounded-full ' +
                          (n.tone === 'profit' ? 'bg-profit' : n.tone === 'loss' ? 'bg-loss' : 'bg-accent')
                        }
                      />
                      <div>
                        <div className="text-sm text-slate-200">{n.t}</div>
                        <div className="text-xs text-slate-500">{n.s}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile((v) => !v); setShowNotif(false) }}
              className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 sm:ml-1 sm:border-l sm:border-white/5 transition"
            >
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium leading-tight max-w-[110px] truncate">
                  {user?.name || 'Trader'}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">Premium · Active</div>
              </div>
              <div className="size-9 rounded-xl bg-accent-gradient text-white text-sm font-semibold grid place-items-center shadow-glow hover:shadow-glow-purple transition">
                {initials}
              </div>
              <ChevronDown size={14} className="hidden sm:block text-slate-400" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-64 card p-2 z-30"
                >
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <div className="text-sm font-medium truncate">{user?.name || 'Trader'}</div>
                    <div className="text-xs text-slate-500 truncate">{user?.email || ''}</div>
                  </div>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition">
                    <UserIcon size={15} /> My Profile
                  </button>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition"
                  >
                    <SettingsIcon size={15} /> Settings
                  </Link>
                  <div className="my-1 h-px bg-white/5" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-loss hover:bg-loss/10 transition"
                  >
                    <LogOut size={15} /> Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
