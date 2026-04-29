import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Settings() {
  const [form, setForm] = useState({
    name: 'Ravi Kumar',
    email: 'ravi@apextrade.io',
    notifications: true,
    sounds: false,
    currency: 'INR',
  })

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and preferences.</p>
      </div>

      <Card className="p-6 space-y-5">
        <h3 className="font-semibold">Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full name">
            <input className="input w-full" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Email">
            <input className="input w-full" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="Currency">
            <select className="input w-full" value={form.currency} onChange={(e) => set('currency', e.target.value)}>
              {['INR', 'USD', 'EUR', 'GBP'].map((c) => (
                <option key={c} className="bg-bg-soft">{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Preferences</h3>
        <Toggle
          label="Push notifications"
          description="Get alerts for price moves and news."
          value={form.notifications}
          onChange={(v) => set('notifications', v)}
        />
        <Toggle
          label="Trade sounds"
          description="Play subtle sounds on order events."
          value={form.sounds}
          onChange={(v) => set('sounds', v)}
        />
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function Toggle({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={
          'relative w-11 h-6 rounded-full transition border ' +
          (value ? 'bg-accent-gradient border-transparent shadow-glow' : 'bg-white/5 border-white/10')
        }
      >
        <span
          className={
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition ' +
            (value ? 'translate-x-5' : '')
          }
        />
      </button>
    </div>
  )
}
