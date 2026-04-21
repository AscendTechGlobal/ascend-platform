'use client'

import { useState } from 'react'
import type { ContactSubmission } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Search, Trash2, Eye, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type StatusType = ContactSubmission['status']

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; color: string; bg: string }
> = {
  new: { label: 'Novo', color: '#00d4ff', bg: 'rgba(0,212,255,0.12)' },
  in_progress: { label: 'Em Andamento', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  resolved: { label: 'Resolvido', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  spam: { label: 'Spam', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
}

const TABS: { label: string; value: string }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Novos', value: 'new' },
  { label: 'Em Andamento', value: 'in_progress' },
  { label: 'Resolvidos', value: 'resolved' },
  { label: 'Spam', value: 'spam' },
]

function StatusBadge({ status }: { status: StatusType }) {
  const c = STATUS_CONFIG[status]
  return (
    <span
      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
      style={{ color: c.color, background: c.bg }}
    >
      {c.label}
    </span>
  )
}

export default function LeadsClient({ initialLeads }: { initialLeads: ContactSubmission[] }) {
  const supabase = createClient()
  const [leads, setLeads] = useState<ContactSubmission[]>(initialLeads)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [viewLead, setViewLead] = useState<ContactSubmission | null>(null)
  const [deleteLead, setDeleteLead] = useState<ContactSubmission | null>(null)
  const [loading, setLoading] = useState(false)

  const filtered = leads.filter((l) => {
    const matchTab = activeTab === 'all' || l.status === activeTab
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.phone ?? '').toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  async function changeStatus(id: string, status: StatusType) {
    await supabase.from('contact_submissions').update({ status }).eq('id', id)
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    queueAuditLog({
      action: 'admin.lead.status_updated',
      resource: 'contact_submission',
      resourceId: id,
      metadata: { status },
    })
  }

  async function confirmDelete() {
    if (!deleteLead) return
    setLoading(true)
    await supabase.from('contact_submissions').delete().eq('id', deleteLead.id)
    setLeads((prev) => prev.filter((l) => l.id !== deleteLead.id))
    queueAuditLog({
      action: 'admin.lead.deleted',
      resource: 'contact_submission',
      resourceId: deleteLead.id,
      metadata: {
        email: deleteLead.email,
      },
    })
    setDeleteLead(null)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Leads & Contatos</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {leads.length} contatos no total
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
              style={
                activeTab === tab.value
                  ? { background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }
                  : { color: 'rgba(255,255,255,0.45)' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          />
          <input
            type="text"
            placeholder="Buscar por nome, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs rounded-lg outline-none w-64 transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(0,212,255,0.1)', background: 'rgba(6,13,26,0.8)' }}
      >
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Nome', 'Email', 'Telefone', 'Tipo', 'Status', 'Data', 'Ações'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left font-semibold tracking-wider uppercase text-[10px]"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search size={28} style={{ opacity: 0.3 }} />
                    <span className="text-sm">Nenhum lead encontrado.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((lead, i) => (
                <tr
                  key={lead.id}
                  className="hover:bg-white/[0.02] transition-colors"
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <td className="px-5 py-3 font-semibold text-white">{lead.name}</td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {lead.email}
                  </td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {lead.phone ?? '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{
                        background: lead.type === 'budget' ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.07)',
                        color: lead.type === 'budget' ? '#3B82F6' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {lead.type === 'budget' ? 'Orçamento' : 'Contato'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewLead(lead)}
                        className="p-1.5 rounded-md transition-all hover:bg-white/10"
                        style={{ color: '#00d4ff' }}
                        title="Ver detalhes"
                      >
                        <Eye size={13} />
                      </button>
                      <select
                        value={lead.status}
                        onChange={(e) => changeStatus(lead.id, e.target.value as StatusType)}
                        className="text-[10px] px-2 py-1 rounded-md outline-none cursor-pointer"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        <option value="new">Novo</option>
                        <option value="in_progress">Em Andamento</option>
                        <option value="resolved">Resolvido</option>
                        <option value="spam">Spam</option>
                      </select>
                      <button
                        onClick={() => setDeleteLead(lead)}
                        className="p-1.5 rounded-md transition-all hover:bg-red-500/10"
                        style={{ color: 'rgba(239,68,68,0.6)' }}
                        title="Excluir"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewLead} onOpenChange={() => setViewLead(null)}>
        <DialogContent
          style={{ background: '#060d1a', border: '1px solid rgba(0,212,255,0.15)', maxWidth: 520 }}
        >
          <DialogHeader>
            <DialogTitle className="text-white">{viewLead?.name}</DialogTitle>
            <DialogDescription style={{ color: 'rgba(255,255,255,0.4)' }}>
              Detalhes do contato
            </DialogDescription>
          </DialogHeader>
          {viewLead && (
            <div className="space-y-3 text-sm">
              {[
                { label: 'Email', value: viewLead.email },
                { label: 'Telefone', value: viewLead.phone ?? '—' },
                { label: 'Empresa', value: viewLead.company ?? '—' },
                { label: 'Tipo', value: viewLead.type === 'budget' ? 'Orçamento' : 'Contato' },
                { label: 'Status', value: STATUS_CONFIG[viewLead.status].label },
                {
                  label: 'Data',
                  value: new Date(viewLead.created_at).toLocaleString('pt-BR'),
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="w-20 flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {label}
                  </span>
                  <span className="text-white text-xs">{value}</span>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="w-20 flex-shrink-0 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Mensagem
                </span>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {viewLead.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteLead} onOpenChange={() => setDeleteLead(null)}>
        <DialogContent style={{ background: '#060d1a', border: '1px solid rgba(239,68,68,0.2)', maxWidth: 400 }}>
          <DialogHeader>
            <DialogTitle className="text-white">Confirmar Exclusão</DialogTitle>
            <DialogDescription style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tem certeza que deseja excluir o lead de{' '}
              <span className="text-white font-semibold">{deleteLead?.name}</span>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteLead(null)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={loading}
              style={{ background: '#ef4444', color: 'white' }}
            >
              {loading ? <RefreshCw size={14} className="animate-spin mr-1" /> : null}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
