'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ChevronRight,
  Cog,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true, hint: 'Board operacional' },
  { label: 'Leads', href: '/admin/leads', icon: Users, hint: 'Pipeline comercial' },
  { label: 'Projetos', href: '/admin/projetos', icon: FolderKanban, hint: 'Entrega e portfólio' },
  { label: 'Blog', href: '/admin/blog', icon: FileText, hint: 'Conteúdo e SEO' },
  { label: 'Serviços', href: '/admin/servicos', icon: Settings, hint: 'Oferta comercial' },
  { label: 'Depoimentos', href: '/admin/depoimentos', icon: MessageSquare, hint: 'Prova social' },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle, hint: 'Objeções e suporte' },
  { label: 'Configurações', href: '/admin/configuracoes', icon: Cog, hint: 'Preferências do sistema' },
]

function getBreadcrumb(pathname: string) {
  const map: Record<string, string> = {
    '/admin': 'Overview Operacional',
    '/admin/leads': 'Leads & Pipeline',
    '/admin/projetos': 'Projetos',
    '/admin/projetos/novo': 'Novo Projeto',
    '/admin/blog': 'Conteúdo & Blog',
    '/admin/blog/novo': 'Novo Post',
    '/admin/servicos': 'Serviços',
    '/admin/depoimentos': 'Depoimentos',
    '/admin/faqs': 'FAQs',
    '/admin/configuracoes': 'Configurações',
  }

  return map[pathname] ?? 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#030409_0%,#07101d_28%,#0a1225_100%)] text-white">
      <div className="flex min-h-screen">
        <aside className="admin-sidebar fixed inset-y-0 left-0 z-40 hidden w-[296px] flex-col border-r border-white/8 xl:flex">
          <div className="border-b border-white/8 px-6 py-6">
            <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_16px_36px_rgba(88,28,135,0.22)]">
                  <Image
                    src="/file_000.png"
                    alt="Ascend Tech Global"
                    width={96}
                    height={120}
                    className="h-[120%] w-[120%] object-contain"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-[-0.03em] text-white">
                    Ascend Tech Global
                  </p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/40">
                    Admin board
                  </p>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'group flex items-center gap-3 rounded-[1.2rem] border px-4 py-3 transition-all duration-200',
                    active
                      ? 'border-white/12 bg-white/[0.08] shadow-[0_16px_36px_rgba(2,6,23,0.18)]'
                      : 'border-transparent bg-white/[0.02] hover:border-white/8 hover:bg-white/[0.04]',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex h-10 w-10 items-center justify-center rounded-[1rem] border transition-all duration-200',
                      active
                        ? 'border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)),linear-gradient(135deg,#0ea5e9_0%,#8b5cf6_54%,#ec4899_100%)] text-white'
                        : 'border-white/8 bg-white/[0.03] text-white/55 group-hover:text-white/85',
                    ].join(' ')}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className={active ? 'text-sm font-semibold text-white' : 'text-sm font-medium text-white/66 group-hover:text-white/88'}>
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/34">{item.hint}</span>
                  </span>

                  {active && <ChevronRight className="h-4 w-4 text-white/42" />}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-white/8 px-4 py-4">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)),linear-gradient(135deg,#0ea5e9_0%,#8b5cf6_54%,#ec4899_100%)] text-sm font-semibold text-white">
                  A
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">Administrador</p>
                  <p className="truncate text-xs text-white/36">ascendtechglobal.com</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/68 transition-all duration-200 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col xl:ml-[296px]">
          <header className="sticky top-0 z-30 border-b border-white/8 bg-[rgba(5,9,18,0.82)] px-5 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/38">
                  Ascend Tech Global
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">
                  {getBreadcrumb(pathname)}
                </h1>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:flex">
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/36">
                    Sistema
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-white/78">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.65)]" />
                    Online e operacional
                  </div>
                </div>

                <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/36">
                    Modo
                  </p>
                  <p className="mt-2 text-sm text-white/78">Gestão comercial + conteúdo</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-5 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
