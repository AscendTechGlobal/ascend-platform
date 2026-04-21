'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, UserPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type LeadStatus = 'new' | 'in_progress' | 'resolved' | 'spam'
type LeadType = 'contact' | 'budget'

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  type: 'budget' as LeadType,
  status: 'new' as LeadStatus,
}

export default function ManualLeadDialog() {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      company: form.company.trim() || null,
      message: form.message.trim(),
      type: form.type,
      status: form.status,
    }

    if (!payload.name || !payload.email || !payload.message) {
      setError('Preencha nome, e-mail e mensagem para criar o lead.')
      return
    }

    const { data, error: insertError } = await supabase
      .from('contact_submissions')
      .insert(payload)
      .select('id')
      .single()

    if (insertError) {
      setError('Nao foi possivel criar o lead manualmente.')
      return
    }

    queueAuditLog({
      action: 'admin.lead.created',
      resource: 'contact_submission',
      resourceId: data.id,
      metadata: {
        email: payload.email,
        type: payload.type,
        status: payload.status,
      },
    })

    setOpen(false)
    setForm(initialState)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="rounded-[1rem] px-4 py-2.5 text-sm" />
        }
      >
        <Plus className="h-4 w-4" />
        Adicionar lead
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-[1.6rem] border border-white/10 bg-[rgba(7,12,24,0.96)] p-6 text-white backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-[-0.03em] text-white">
            Adicionar lead manualmente
          </DialogTitle>
          <DialogDescription className="text-sm text-white/48">
            Registre um novo contato direto no pipeline operacional do dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                Nome
              </label>
              <Input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Nome do lead"
                className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] text-white placeholder:text-white/28"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                E-mail
              </label>
              <Input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="lead@empresa.com"
                className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] text-white placeholder:text-white/28"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                Telefone
              </label>
              <Input
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="+55 (11) 90000-0000"
                className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] text-white placeholder:text-white/28"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                Empresa
              </label>
              <Input
                value={form.company}
                onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                placeholder="Empresa do contato"
                className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] text-white placeholder:text-white/28"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                Tipo
              </label>
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({ ...current, type: event.target.value as LeadType }))
                }
                className="h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none"
              >
                <option value="budget" className="bg-slate-950">Orçamento</option>
                <option value="contact" className="bg-slate-950">Contato</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                Status inicial
              </label>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({ ...current, status: event.target.value as LeadStatus }))
                }
                className="h-11 w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none"
              >
                <option value="new" className="bg-slate-950">Novo</option>
                <option value="in_progress" className="bg-slate-950">Em analise</option>
                <option value="resolved" className="bg-slate-950">Fechado</option>
                <option value="spam" className="bg-slate-950">Descartado</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
              Contexto do lead
            </label>
            <Textarea
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              placeholder="Descreva rapidamente a oportunidade, origem ou necessidade desse contato."
              className="min-h-28 rounded-[1rem] border-white/10 bg-white/[0.04] text-white placeholder:text-white/28"
            />
          </div>

          {error && (
            <div className="rounded-[1rem] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-[1rem] border-white/10 bg-white/[0.03] text-white/72 hover:bg-white/[0.08] hover:text-white"
            >
              Cancelar
            </Button>
            <Button type="submit" className="rounded-[1rem] px-5" disabled={isPending}>
              <UserPlus className="h-4 w-4" />
              {isPending ? 'Salvando...' : 'Salvar lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
