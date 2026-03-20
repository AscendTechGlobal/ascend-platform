'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Plus, Pencil, Trash2, Save, RefreshCw, X, Star } from 'lucide-react'
import type { Testimonial } from '@/types'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{children}</label>
}

function InputField({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55' }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
    />
  )
}

const EMPTY = { name: '', role: '', company: '', content: '', avatar: '', rating: 5, published: true }

export default function DepoimentosAdminPage() {
  const supabase = createClient()
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<typeof EMPTY | (typeof EMPTY & { id: string })>(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems((data ?? []) as Testimonial[])
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false

    async function loadInitialData() {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })

      if (cancelled) {
        return
      }

      setItems((data ?? []) as Testimonial[])
      setLoading(false)
    }

    void loadInitialData()

    return () => {
      cancelled = true
    }
  }, [supabase])

  function openNew() { setForm(EMPTY); setEditing('new'); setError('') }
  function openEdit(t: Testimonial) {
    setForm({ id: t.id, name: t.name, role: t.role ?? '', company: t.company ?? '', content: t.content, avatar: t.avatar ?? '', rating: t.rating, published: t.published })
    setEditing(t.id); setError('')
  }
  function closeForm() { setEditing(null); setError('') }

  async function save() {
    if (!form.name.trim() || !form.content.trim()) { setError('Nome e conteúdo são obrigatórios.'); return }
    setSaving(true); setError('')
    const payload = { name: form.name, role: form.role || null, company: form.company || null, content: form.content, avatar: form.avatar || null, rating: form.rating, published: form.published }
    const { data, error: err } = editing === 'new'
      ? await supabase.from('testimonials').insert(payload).select('id').single()
      : await supabase.from('testimonials').update(payload).eq('id', editing!).select('id').single()
    if (err) { setError(err.message); setSaving(false); return }
    queueAuditLog({
      action: editing === 'new' ? 'admin.testimonial.created' : 'admin.testimonial.updated',
      resource: 'testimonial',
      resourceId: data.id,
      metadata: { name: form.name, published: form.published },
    })
    await load(); setSaving(false); closeForm()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    await supabase.from('testimonials').delete().eq('id', deleteTarget.id)
    setItems((prev) => prev.filter((t) => t.id !== deleteTarget.id))
    queueAuditLog({
      action: 'admin.testimonial.deleted',
      resource: 'testimonial',
      resourceId: deleteTarget.id,
      metadata: { name: deleteTarget.name },
    })
    setDeleteTarget(null)
  }

  if (loading) return <div className="flex items-center justify-center min-h-64"><RefreshCw size={28} className="animate-spin" style={{ color: '#00d4ff' }} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Depoimentos</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{items.length} depoimento(s)</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}>
          <Plus size={15} /> Novo Depoimento
        </button>
      </div>

      {editing && (
        <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(6,13,26,0.9)', border: '1px solid rgba(0,212,255,0.2)' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{editing === 'new' ? 'Novo Depoimento' : 'Editar Depoimento'}</h3>
            <button onClick={closeForm} style={{ color: 'rgba(255,255,255,0.4)' }}><X size={16} /></button>
          </div>
          {error && <p className="text-[12px] px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel>Nome *</FieldLabel><InputField value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Carlos Mendes" /></div>
            <div><FieldLabel>Cargo</FieldLabel><InputField value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="CEO" /></div>
            <div><FieldLabel>Empresa</FieldLabel><InputField value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="TechStart Brasil" /></div>
            <div><FieldLabel>URL Avatar</FieldLabel><InputField value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} placeholder="https://..." /></div>
          </div>
          <div>
            <FieldLabel>Depoimento *</FieldLabel>
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="Escreva o depoimento..." rows={4}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <div className="flex items-center gap-6">
            <div>
              <FieldLabel>Avaliação</FieldLabel>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))}>
                    <Star size={20} fill={n <= form.rating ? '#f59e0b' : 'none'} color={n <= form.rating ? '#f59e0b' : 'rgba(255,255,255,0.2)'} />
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="sr-only peer" />
              <div className="relative w-10 h-5 rounded-full peer-checked:bg-cyan-500 transition-all" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all peer-checked:translate-x-5" />
              </div>
              <span className="text-sm text-white">Publicado</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={closeForm} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}>Cancelar</button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', opacity: saving ? 0.7 : 1 }}>
              {saving ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl" style={{ border: '1px dashed rgba(0,212,255,0.15)', background: 'rgba(6,13,26,0.5)' }}>
          <p className="text-sm text-gray-500">Nenhum depoimento cadastrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="flex items-start gap-4 rounded-xl px-5 py-4"
              style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.08)' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white">{t.name}</span>
                  {t.role && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.role}{t.company ? ` · ${t.company}` : ''}</span>}
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: t.published ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)', color: t.published ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                    {t.published ? 'Publicado' : 'Oculto'}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} fill={i < t.rating ? '#f59e0b' : 'none'} color={i < t.rating ? '#f59e0b' : 'rgba(255,255,255,0.15)'} />
                  ))}
                </div>
                <p className="text-xs line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.content}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: '#00d4ff' }}><Pencil size={13} /></button>
                <button onClick={() => setDeleteTarget(t)} className="p-1.5 rounded-lg hover:bg-red-500/10" style={{ color: '#ef4444' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 max-w-sm w-full mx-4 space-y-4" style={{ background: '#060d1a', border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 className="text-lg font-black text-white">Excluir depoimento?</h3>
            <p className="text-sm text-gray-400">O depoimento de <strong className="text-white">&quot;{deleteTarget.name}&quot;</strong> será removido.</p>
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
