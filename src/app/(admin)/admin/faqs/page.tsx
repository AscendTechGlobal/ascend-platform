'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Plus, Pencil, Trash2, Save, RefreshCw, X, GripVertical } from 'lucide-react'
import type { FAQ } from '@/types'

const EMPTY = { question: '', answer: '', order_index: 0, published: true }

export default function FaqsAdminPage() {
  const supabase = createClient()
  const [items, setItems] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null)
  const [form, setForm] = useState<typeof EMPTY | (typeof EMPTY & { id: string })>(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('faqs').select('*').order('order_index')
    setItems((data ?? []) as FAQ[])
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false

    async function loadInitialData() {
      const { data } = await supabase.from('faqs').select('*').order('order_index')

      if (cancelled) {
        return
      }

      setItems((data ?? []) as FAQ[])
      setLoading(false)
    }

    void loadInitialData()

    return () => {
      cancelled = true
    }
  }, [supabase])

  function openNew() { setForm({ ...EMPTY, order_index: items.length + 1 }); setEditing('new'); setError('') }
  function openEdit(f: FAQ) {
    setForm({ id: f.id, question: f.question, answer: f.answer, order_index: f.order_index, published: f.published })
    setEditing(f.id); setError('')
  }
  function closeForm() { setEditing(null); setError('') }

  async function save() {
    if (!form.question.trim() || !form.answer.trim()) { setError('Pergunta e resposta são obrigatórias.'); return }
    setSaving(true); setError('')
    const payload = { question: form.question, answer: form.answer, order_index: form.order_index, published: form.published }
    const { data, error: err } = editing === 'new'
      ? await supabase.from('faqs').insert(payload).select('id').single()
      : await supabase.from('faqs').update(payload).eq('id', editing!).select('id').single()
    if (err) { setError(err.message); setSaving(false); return }
    queueAuditLog({
      action: editing === 'new' ? 'admin.faq.created' : 'admin.faq.updated',
      resource: 'faq',
      resourceId: data.id,
      metadata: { question: form.question, published: form.published },
    })
    await load(); setSaving(false); closeForm()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    await supabase.from('faqs').delete().eq('id', deleteTarget.id)
    setItems((prev) => prev.filter((f) => f.id !== deleteTarget.id))
    queueAuditLog({
      action: 'admin.faq.deleted',
      resource: 'faq',
      resourceId: deleteTarget.id,
      metadata: { question: deleteTarget.question },
    })
    setDeleteTarget(null)
  }

  if (loading) return <div className="flex items-center justify-center min-h-64"><RefreshCw size={28} className="animate-spin" style={{ color: '#00d4ff' }} /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">FAQs</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{items.length} pergunta(s) cadastrada(s)</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #2563eb)', color: 'white', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}>
          <Plus size={15} /> Nova Pergunta
        </button>
      </div>

      {editing && (
        <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(6,13,26,0.9)', border: '1px solid rgba(0,212,255,0.2)' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{editing === 'new' ? 'Nova Pergunta' : 'Editar Pergunta'}</h3>
            <button onClick={closeForm} style={{ color: 'rgba(255,255,255,0.4)' }}><X size={16} /></button>
          </div>
          {error && <p className="text-[12px] px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Pergunta *</label>
            <input value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              placeholder="Ex: Qual o prazo de entrega?" className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Resposta *</label>
            <textarea value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              placeholder="Escreva a resposta completa..." rows={4}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
          </div>
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Ordem</label>
              <input type="number" value={form.order_index} onChange={(e) => setForm((f) => ({ ...f, order_index: Number(e.target.value) }))}
                className="w-20 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              />
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
              style={{ background: 'linear-gradient(135deg, #3B82F6, #2563eb)', color: 'white', opacity: saving ? 0.7 : 1 }}>
              {saving ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-xl" style={{ border: '1px dashed rgba(0,212,255,0.15)', background: 'rgba(6,13,26,0.5)' }}>
          <p className="text-sm text-gray-500">Nenhuma FAQ cadastrada.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.id} className="flex items-start gap-4 rounded-xl px-5 py-4"
              style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.08)' }}>
              <GripVertical size={14} style={{ color: 'rgba(255,255,255,0.2)' }} className="mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white">{f.question}</span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: f.published ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)', color: f.published ? '#4ade80' : 'rgba(255,255,255,0.4)' }}>
                    {f.published ? 'Publicado' : 'Oculto'}
                  </span>
                </div>
                <p className="text-xs line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{f.answer}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: '#00d4ff' }}><Pencil size={13} /></button>
                <button onClick={() => setDeleteTarget(f)} className="p-1.5 rounded-lg hover:bg-red-500/10" style={{ color: '#ef4444' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 max-w-sm w-full mx-4 space-y-4" style={{ background: '#060d1a', border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 className="text-lg font-black text-white">Excluir FAQ?</h3>
            <p className="text-sm text-gray-400">A pergunta <strong className="text-white">&quot;{deleteTarget.question}&quot;</strong> será removida.</p>
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
