import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  ArrowRight,
  CircleDot,
  FilePenLine,
  FolderKanban,
  MessageSquarePlus,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import type { ContactSubmission, Project } from '@/types'
import ManualLeadDialog from './_components/manual-lead-dialog'

type BlogPostSummary = {
  id: string
  title: string
  published: boolean
  created_at: string
}

type LeadBoardColumn = {
  id: 'new' | 'in_progress' | 'resolved' | 'spam'
  title: string
  description: string
  color: string
  surface: string
}

const leadColumns: LeadBoardColumn[] = [
  {
    id: 'new',
    title: 'Novo',
    description: 'Entradas que pedem primeira leitura e qualificação.',
    color: '#38bdf8',
    surface: 'linear-gradient(180deg, rgba(56,189,248,0.12), rgba(56,189,248,0.03))',
  },
  {
    id: 'in_progress',
    title: 'Em analise',
    description: 'Conversas em andamento, escopo e proposta sendo definidos.',
    color: '#3B82F6',
    surface: 'linear-gradient(180deg, rgba(59,130,246,0.12), rgba(59,130,246,0.03))',
  },
  {
    id: 'resolved',
    title: 'Fechado',
    description: 'Leads concluídos ou já encaminhados para próxima etapa.',
    color: '#22c55e',
    surface: 'linear-gradient(180deg, rgba(34,197,94,0.12), rgba(34,197,94,0.03))',
  },
  {
    id: 'spam',
    title: 'Descartado',
    description: 'Itens sem aderência, ruído ou contatos inválidos.',
    color: '#f87171',
    surface: 'linear-gradient(180deg, rgba(248,113,113,0.12), rgba(248,113,113,0.03))',
  },
]

async function getDashboardData() {
  const supabase = await createClient()

  const [leadsRes, projectsRes, postsRes] = await Promise.all([
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8),
    supabase
      .from('blog_posts')
      .select('id, title, published, created_at')
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const leads = (leadsRes.data ?? []) as ContactSubmission[]
  const projects = (projectsRes.data ?? []) as Project[]
  const posts = (postsRes.data ?? []) as BlogPostSummary[]

  const totalLeads = leads.length
  const newLeads = leads.filter((lead) => lead.status === 'new').length
  const inProgressLeads = leads.filter((lead) => lead.status === 'in_progress').length
  const publishedProjects = projects.filter((project) => project.published).length
  const publishedPosts = posts.filter((post) => post.published).length

  return {
    leads,
    projects,
    posts,
    totalLeads,
    newLeads,
    inProgressLeads,
    publishedProjects,
    publishedPosts,
    totalPosts: posts.length,
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

function OverviewMetric({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string
  value: number
  description: string
  icon: React.ElementType
}) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_50px_rgba(2,6,23,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/38">{label}</p>
          <p className="mt-3 text-[2rem] font-semibold leading-none tracking-[-0.05em] text-white">
            {value}
          </p>
          <p className="mt-3 max-w-[24ch] text-sm leading-6 text-white/56">{description}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.04] text-white/72">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

function LeadCard({ lead }: { lead: ContactSubmission }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_14px_34px_rgba(2,6,23,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{lead.name}</p>
          <p className="truncate text-xs text-white/42">{lead.email}</p>
        </div>
        <span
          className={[
            'rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]',
            lead.type === 'budget'
              ? 'bg-blue-400/14 text-blue-500'
              : 'bg-white/[0.07] text-white/52',
          ].join(' ')}
        >
          {lead.type === 'budget' ? 'Orçamento' : 'Contato'}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/66">{lead.message}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-white/38">
        <span>{lead.company ?? 'Sem empresa informada'}</span>
        <span>{formatDate(lead.created_at)}</span>
      </div>
    </div>
  )
}

function StreamCard({
  title,
  href,
  eyebrow,
  children,
}: {
  title: string
  href: string
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/36">{eyebrow}</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">{title}</h3>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
        >
          Abrir
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default async function AdminDashboard() {
  const {
    leads,
    projects,
    posts,
    totalLeads,
    newLeads,
    inProgressLeads,
    publishedProjects,
    publishedPosts,
    totalPosts,
  } = await getDashboardData()

  const leadBuckets = Object.fromEntries(
    leadColumns.map((column) => [column.id, leads.filter((lead) => lead.status === column.id)]),
  ) as Record<LeadBoardColumn['id'], ContactSubmission[]>

  const budgetLeads = leads.filter((lead) => lead.type === 'budget').length

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.18)] sm:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/62">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              Centro operacional
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
              Visão rápida do negócio, com leitura em fluxo e prioridade.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/60">
              Estruturamos o dashboard como um board administrativo: o que exige ação fica evidente, o que está avançando fica organizado e o que é conteúdo ou operação fica mais fácil de escanear.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/admin/leads"
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-medium text-white/78 transition-all duration-200 hover:bg-white/[0.08]"
            >
              <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-white/34">
                Precisa de ação
              </span>
              <span className="mt-2 block text-lg font-semibold text-white">{newLeads} novos leads</span>
            </Link>
            <Link
              href="/admin/projetos/novo"
              className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)),linear-gradient(135deg,#3B82F6_0%,#2563eb_54%,#b45309_100%)] px-4 py-4 text-sm font-medium text-white shadow-[0_18px_40px_rgba(88,28,135,0.22)] transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-white/66">
                Ação principal
              </span>
              <span className="mt-2 block text-lg font-semibold text-white">Criar projeto</span>
            </Link>
            <Link
              href="/admin/blog/novo"
              className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-medium text-white/78 transition-all duration-200 hover:bg-white/[0.08]"
            >
              <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-white/34">
                Conteúdo
              </span>
              <span className="mt-2 block text-lg font-semibold text-white">Publicar post</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewMetric
          label="Leads na fila"
          value={totalLeads}
          description="Volume recente para triagem, comercial e acompanhamento."
          icon={Users}
        />
        <OverviewMetric
          label="Novos contatos"
          value={newLeads}
          description="Itens que exigem primeira resposta ou qualificação."
          icon={TrendingUp}
        />
        <OverviewMetric
          label="Projetos publicados"
          value={publishedProjects}
          description="Prova operacional e vitrine comercial ativa."
          icon={FolderKanban}
        />
        <OverviewMetric
          label="Posts publicados"
          value={publishedPosts}
          description="Conteúdo ativo para autoridade, busca e conversão."
          icon={FilePenLine}
        />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.18)] sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/36">Lead board</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
              Pipeline administrativo inspirado em kanban
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/58">
              Em vez de uma tabela fria, o estado comercial agora pode ser escaneado por fluxo: o que entrou, o que está em andamento e o que já foi concluído.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-white/60">
              {budgetLeads} pedidos de orçamento
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-white/60">
              {inProgressLeads} em andamento
            </span>
            <ManualLeadDialog />
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {leadColumns.map((column) => {
            const items = leadBuckets[column.id]

            return (
              <div
                key={column.id}
                className="rounded-[1.6rem] border p-4"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: column.surface,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: column.color, boxShadow: `0 0 14px ${column.color}` }}
                      />
                      <p className="text-sm font-semibold text-white">{column.title}</p>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-white/48">{column.description}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[0.68rem] font-semibold text-white/66">
                    {items.length}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {items.length === 0 ? (
                    <div className="rounded-[1.2rem] border border-dashed border-white/10 px-4 py-6 text-center text-xs text-white/34">
                      Nenhum item nesta coluna.
                    </div>
                  ) : (
                    items.slice(0, 4).map((lead) => <LeadCard key={lead.id} lead={lead} />)
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <StreamCard title="Projetos e entregas" href="/admin/projetos" eyebrow="Execução">
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="rounded-[1.2rem] border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/36">
                Nenhum projeto disponível ainda.
              </div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{project.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/56">
                        {project.short_description}
                      </p>
                    </div>
                    <span
                      className={[
                        'rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]',
                        project.published
                          ? 'bg-emerald-400/14 text-emerald-300'
                          : 'bg-white/[0.07] text-white/50',
                      ].join(' ')}
                    >
                      {project.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/38">
                    <span>{project.client ?? 'Cliente interno'}</span>
                    <span className="text-white/18">•</span>
                    <span>{formatDate(project.created_at)}</span>
                    {project.featured && (
                      <>
                        <span className="text-white/18">•</span>
                        <span className="text-blue-500">Destaque</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </StreamCard>

        <div className="grid gap-5">
          <StreamCard title="Conteúdo em movimento" href="/admin/blog" eyebrow="Conteúdo">
            <div className="space-y-3">
              {posts.length === 0 ? (
                <div className="rounded-[1.2rem] border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/36">
                  Nenhum post disponível ainda.
                </div>
              ) : (
                posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3.5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{post.title}</p>
                        <p className="mt-1 text-xs text-white/38">{formatDate(post.created_at)}</p>
                      </div>
                      <span
                        className={[
                          'rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]',
                          post.published
                            ? 'bg-emerald-400/14 text-emerald-300'
                            : 'bg-white/[0.07] text-white/50',
                        ].join(' ')}
                      >
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </StreamCard>

          <StreamCard title="Ações rápidas com contexto" href="/admin/leads" eyebrow="Produtividade">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/admin/projetos/novo"
                className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)),linear-gradient(135deg,#3B82F6_0%,#2563eb_54%,#b45309_100%)] p-4 text-white shadow-[0_18px_40px_rgba(88,28,135,0.2)] transition-all duration-200 hover:scale-[1.02]"
              >
                <FolderKanban className="h-5 w-5" />
                <p className="mt-4 text-sm font-semibold">Novo projeto</p>
                <p className="mt-1 text-xs leading-6 text-white/70">
                  Inicie uma entrega nova e mantenha o board comercial ativo.
                </p>
              </Link>

              <Link
                href="/admin/blog/novo"
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-white/78 transition-all duration-200 hover:bg-white/[0.08]"
              >
                <FilePenLine className="h-5 w-5" />
                <p className="mt-4 text-sm font-semibold text-white">Novo post</p>
                <p className="mt-1 text-xs leading-6 text-white/52">
                  Publique conteúdo novo para sustentar autoridade e inbound.
                </p>
              </Link>

              <Link
                href="/admin/leads"
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-white/78 transition-all duration-200 hover:bg-white/[0.08]"
              >
                <MessageSquarePlus className="h-5 w-5" />
                <p className="mt-4 text-sm font-semibold text-white">Revisar leads</p>
                <p className="mt-1 text-xs leading-6 text-white/52">
                  Priorize novos contatos e mantenha o pipeline sem gargalo.
                </p>
              </Link>

              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                <CircleDot className="h-5 w-5 text-emerald-300" />
                <p className="mt-4 text-sm font-semibold text-white">Estado do negócio</p>
                <p className="mt-1 text-xs leading-6 text-white/52">
                  {newLeads > 0
                    ? `${newLeads} lead(s) aguardando ação e ${publishedPosts} post(s) já publicados.`
                    : `Fluxo estabilizado, com ${publishedProjects} projeto(s) publicado(s) e ${totalPosts} post(s) no total.`}
                </p>
              </div>
            </div>
          </StreamCard>
        </div>
      </section>
    </div>
  )
}
