import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

export default function AuthForm({ mode = 'login' }) {
  const isLogin = mode === 'login'
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPwd, setShowPwd] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    remember: true,
  })
  const [touched, setTouched] = useState({})

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))
  const touch = (k) => setTouched((p) => ({ ...p, [k]: true }))

  const errors = {
    name: !form.name.trim() ? 'Name is required' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Enter a valid email' : '',
    password: form.password.length < 6 ? 'Min 6 characters' : '',
    confirm: form.confirm !== form.password ? 'Passwords do not match' : '',
  }

  const fieldErr = (k) => (touched[k] ? errors[k] : '')

  const isValid = isLogin
    ? !errors.email && !errors.password
    : !errors.name && !errors.email && !errors.password && !errors.confirm

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true })
    if (!isValid) return
    setError('')
    setSubmitting(true)
    try {
      if (isLogin) await login({ email: form.email, password: form.password, remember: form.remember })
      else await signup({ name: form.name, email: form.email, password: form.password })
      const redirect = location.state?.from?.pathname || '/'
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-bg">
      {/* Brand panel */}
      <div className="hidden lg:flex relative overflow-hidden p-10 flex-col justify-between bg-gradient-to-br from-accent/20 via-bg to-accent-purple/20 border-r border-white/5">
        <div className="absolute -top-32 -left-20 size-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 size-[28rem] rounded-full bg-accent-purple/30 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="size-10 rounded-xl bg-accent-gradient grid place-items-center shadow-glow">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-wide">Apex Trade</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Premium</div>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Trade smarter with <br />
            <span className="bg-accent-gradient bg-clip-text text-transparent">real-time insights</span>
          </h1>
          <p className="text-slate-400 max-w-md">
            Track markets, manage your portfolio, and discover opportunities — all in one premium fintech-grade dashboard.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { k: 'Indices', v: '50+' },
              { k: 'Live updates', v: '24/7' },
              { k: 'Sectors', v: '12+' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-semibold bg-accent-gradient bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs text-slate-400 mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-slate-500">© {new Date().getFullYear()} Apex Trade. UI demo · No real trading.</div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md card p-6 sm:p-8 space-y-5"
          noValidate
        >
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="size-9 rounded-xl bg-accent-gradient grid place-items-center shadow-glow">
              <Activity size={16} className="text-white" />
            </div>
            <div className="text-sm font-semibold">Apex Trade</div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {isLogin
                ? 'Sign in to access your dashboard.'
                : 'Start tracking markets in seconds.'}
            </p>
          </div>

          {error && (
            <div className="text-sm rounded-xl border border-loss/30 bg-loss/10 text-loss px-3 py-2">
              {error}
            </div>
          )}

          {!isLogin && (
            <Field
              label="Full name"
              icon={User}
              error={fieldErr('name')}
            >
              <input
                type="text"
                autoComplete="name"
                className="input w-full pl-9"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                onBlur={() => touch('name')}
              />
            </Field>
          )}

          <Field label="Email" icon={Mail} error={fieldErr('email')}>
            <input
              type="email"
              autoComplete="email"
              className="input w-full pl-9"
              placeholder="you@apextrade.io"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              onBlur={() => touch('email')}
            />
          </Field>

          <Field label="Password" icon={Lock} error={fieldErr('password')}>
            <input
              type={showPwd ? 'text' : 'password'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              className="input w-full pl-9 pr-10"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              onBlur={() => touch('password')}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-7 grid place-items-center text-slate-400 hover:text-white"
              tabIndex={-1}
            >
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </Field>

          {!isLogin && (
            <Field label="Confirm password" icon={Lock} error={fieldErr('confirm')}>
              <input
                type={showPwd ? 'text' : 'password'}
                autoComplete="new-password"
                className="input w-full pl-9"
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => set('confirm', e.target.value)}
                onBlur={() => touch('confirm')}
              />
            </Field>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => set('remember', e.target.checked)}
                  className="accent-accent size-4 rounded"
                />
                Remember me
              </label>
              <button type="button" className="text-accent hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : isLogin ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </Button>

          <div className="text-center text-sm text-slate-400">
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-accent hover:underline">Sign up</Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:underline">Sign in</Link>
              </>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  )
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <label className="block">
      <div className="text-xs text-slate-400 mb-1.5">{label}</div>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        )}
        {children}
      </div>
      {error && <div className="text-[11px] text-loss mt-1">{error}</div>}
    </label>
  )
}
