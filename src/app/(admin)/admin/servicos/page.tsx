'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Plus, Pencil, Trash2, Save, RefreshCw, X, GripVertical } from 'lucide-react'
import type { Service } from '@/types'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{children}</label>
}

function InputField({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div>
      <input {...props} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`, color: 'white' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
      />
      {error && <p className="mt-1 text-[11px]" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  )
}

const ICON_OPTIONS = ['Lightbulb', 'Code2', 'Shield', 'Cloud', 'Zap', 'Globe', 'Database', 'Server', 'Cpu', 'Lock']

const EMPTY = { title: '', description: '', icon: 'Code2', order_index: 0, published: true }

export default function ServicosAdminPage() {
  const supabase = createClient()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)
  const [form, setForm] = useState<typeof EMPTY | (typeof EMPTY & { id: string })>(EMPTY)
  const [editing, setEditing] = useState<string | null>(null) // id or 'new'
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('services').select('*').order('order_index')
    setServices((data ?? []) as Service[])
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false

    async function loadInitialData() {
      const { data } = await supabase.from('services').select('*').order('order_index')

      if (cancelled) {
        return
      }

      setServices((data ?? []) as Service[])
      setLoading(false)
    }

    void loadInitialData()

    return () => {
      cancelled = true
    }
  }, [supabase])

  function openNew() {
    setForm({ ...EMPTY, order_index: services.length + 1 })
    setEditing('new')
    setError('')
  }

  function openEdit(s: Service) {
    setForm({ id: s.id, title: s.title, description: s.description, icon: s.icon ?? 'Code2', order_index: s.order_index, published: s.published })
    setEditing(s.id)
    setError('')
  }

  function closeForm() { setEditing(null); setError('') }

  async function save() {
    if (!form.title.trim() || !form.description.trim()) { setError('Título e descrição são obrigatórios.'); return }
    setSaving(true)
    setError('')
    if (editing === 'new') {
      const { data: createdService, error: err } = await supabase
        .from('services')
        .insert({ title: form.title, description: form.description, icon: form.icon, order_index: form.order_index, published: form.published })
        .select('id')
        .single()
      if (err) { setError(err.message); setSaving(false); return }
      queueAuditLog({
        action: 'admin.service.created',
        resource: 'service',
        resourceId: createdService.id,
        metadata: { title: form.title, published: form.published },
      })
    } else {
      const { error: err } = await supabase.from('services').update({ title: form.title, description: form.description, icon: form.icon, order_index: form.order_index, published: form.published }).eq('id', editing!)
      if (err) { setError(err.message); setSaving(false); return }
      queueAuditLog({
        action: 'admin.service.updated',
        resource: 'service',
        resourceId: editing!,
        metadata: { title: form.title, published: form.published },
      })
    }
    await load()
    setSaving(false)
    closeForm()
  }

  async function togglePublish(s: Service) {
    await supabase.from('services').update({ published: !s.published }).eq('id', s.id)
    setServices((prev) => prev.map((x) => x.id === s.id ? { ...x, published: !x.published } : x))
    queueAuditLog({
      action: 'admin.service.publish_toggled',
      resource: 'service',
      resourceId: s.id,
      metadata: { published: !s.published, title: s.title },
    })
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    await supabase.from('services').delete().eq('id', deleteTarget.id)
    setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    queueAuditLog({
      action: 'admin.service.deleted',
      resource: 'service',
      resourceId: deleteTarget.id,
      metadata: { title: deleteTarget.title },
    })
    setDeleteTarget(null)
  }

  if (loading) return <div className="flex items-center justify-center min-h-64"><RefreshCw size={28} className="animate-spin" style={{ color: '#00d4ff' }} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Serviços</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{services.length} serviço(s) cadastrado(s)</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #2563eb)', color: 'white', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}>
          <Plus size={15} /> Novo Serviço
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(6,13,26,0.9)', border: '1px solid rgba(0,212,255,0.2)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">{editing === 'new' ? 'Novo Serviço' : 'Editar Serviço'}</h3>
            <button onClick={closeForm} style={{ color: 'rgba(255,255,255,0.4)' }}><X size={16} /></button>
          </div>
          {error && <p className="text-[12px] px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
          <div><FieldLabel>Título *</FieldLabel><InputField value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Ex: Cloud Solutions" /></div>
          <div>
            <FieldLabel>Descrição *</FieldLabel>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Descrição do serviço..." rows={3}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <FieldLabel>Ícone</FieldLabel>
              <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <FieldLabel>Ordem</FieldLabel>
              <InputField type="number" value={form.order_index} onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) }))} />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="sr-only peer" />
                <div className="relative w-10 h-5 rounded-full peer-checked:bg-cyan-500 transition-all" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all peer-checked:translate-x-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </div>
                <span className="text-sm text-white">Publicado</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={closeForm} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}>Cancelar</button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #2563eb)', color: 'white', opacity: saving ? 0.7 : 1 }}>
              {saving ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl"
          style={{ border: '1px dashed rgba(0,212,255,0.15)', background: 'rgba(6,13,26,0.5)' }}>
          <p className="text-sm text-gray-500">Nenhum serviço cadastrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-4 rounded-xl px-5 py-4"
              style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.08)' }}>
              <GripVertical size={14} style={{ color: 'rgba(255,255,255,0.2)' }} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{s.title}</span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: s.published ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)', color: s.published ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                    {s.published ? 'Publicado' : 'Oculto'}
                  </span>
                  {s.icon && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>{s.icon}</span>}
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.description}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => togglePublish(s)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                  {s.published ? 'Ocultar' : 'Publicar'}
                </button>
                <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg transition-all hover:bg-white/10" style={{ color: '#00d4ff' }}><Pencil size={13} /></button>
                <button onClick={() => setDeleteTarget(s)} className="p-1.5 rounded-lg transition-all hover:bg-red-500/10" style={{ color: '#ef4444' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 max-w-sm w-full mx-4 space-y-4" style={{ background: '#060d1a', border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 className="text-lg font-black text-white">Excluir serviço?</h3>
            <p className="text-sm text-gray-400">O serviço <strong className="text-white">&quot;{deleteTarget.title}&quot;</strong> será removido permanentemente.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}>Cancelar</button>
              <button onClick={confirmDelete} className="px-4 py-2 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
