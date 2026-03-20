import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react'
import type { Project } from '@/types'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

async function getProject(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'portfolio.detail' })
  const common = await getTranslations({ locale, namespace: 'common' })

  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.15) 0%, transparent 70%)' }} />
        <div className="stars pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">{common('home')}</Link>
            <ChevronRight size={12} />
            <Link href="/portfolio" className="hover:text-white/70 transition-colors">{locale === 'es' ? 'Portafolio' : 'Portfolio'}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient">{project.title}</span>
          </nav>

          {/* Back */}
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 mb-8 text-xs font-semibold transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ArrowLeft size={14} /> {t('backLink')}
          </Link>

          {/* Title */}
          <div className="mb-6">
            {project.featured && (
              <span className="inline-block mb-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                {t('featuredBadge')}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">{project.title}</h1>
            <p className="text-base text-gray-400 leading-relaxed">{project.short_description}</p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.client && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('client')}</span>
                <span className="text-sm font-bold text-white">{project.client}</span>
              </div>
            )}
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
                style={{ color: '#00d4ff' }}>
                {t('viewLive')} <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}>
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COVER IMAGE */}
      {project.cover_image && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,212,255,0.12)' }}>
            <div className="relative max-h-[480px] min-h-[280px] w-full">
              <Image
                src={project.cover_image}
                alt={`${project.title} - case da Ascend Tech Global`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}
      {project.full_description && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
          <div className="rounded-2xl p-8" style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
            <h2 className="text-lg font-black text-white mb-6">{t('aboutProject')}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed whitespace-pre-wrap">
              {project.full_description}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#060d1a' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <p className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
            {t('cta.eyebrow')}
          </p>
          <h2 className="text-2xl font-black text-white mb-4">
            {t('cta.title')} <span className="text-gradient">{t('cta.titleHighlight')}</span>
          </h2>
          <p className="mb-8 text-sm text-gray-400">
            {t('cta.description')}
          </p>
          <Link href="/contato" className="btn-orange inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm">
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
