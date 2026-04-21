'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ExternalLink, ChevronRight, ArrowRight } from 'lucide-react'
import type { Project } from '@/types'

const ACCENT_COLORS = ['#00d4ff', '#3B82F6']

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

function ProjectCard({ project, index, featuredLabel, viewProjectLabel }: { project: Project; index: number; featuredLabel: string; viewProjectLabel: string }) {
  const accentColor = ACCENT_COLORS[index % 2]
  const gradient = `linear-gradient(135deg, ${accentColor}12 0%, ${accentColor}06 60%, rgba(3,7,18,0.9) 100%)`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="glow-card flex flex-col rounded-2xl overflow-hidden"
      style={{ borderColor: `${accentColor}22` }}
    >
      <div
        className="relative h-52 w-full flex items-center justify-center overflow-hidden"
        style={{ background: gradient, borderBottom: `1px solid ${accentColor}20` }}
      >
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={`${project.title} - capa do projeto`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 select-none">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
              <rect x="8" y="8" width="56" height="56" rx="10" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.5" fill={`${accentColor}08`} />
              <circle cx="26" cy="26" r="6" fill={`${accentColor}30`} />
              <path d="M8 46 L22 32 L34 44 L48 30 L64 46" stroke={accentColor} strokeWidth="2" strokeLinejoin="round" strokeOpacity="0.6" fill="none" />
            </svg>
            {project.client && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: `${accentColor}80` }}>
                {project.client}
              </span>
            )}
          </div>
        )}
        <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
        {project.featured && (
          <div className="absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35`, color: accentColor }}>
            {featuredLabel}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-base font-extrabold uppercase tracking-wide text-white">{project.title}</h3>

        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{ background: `${accentColor}0a`, border: `1px solid ${accentColor}30`, color: accentColor }}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="flex-1 text-xs leading-relaxed text-gray-400">{project.short_description}</p>

        <Link href={`/portfolio/${project.slug}`}
          className="btn-blue-outline mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs"
          style={{ borderColor: `${accentColor}50`, color: accentColor }}>
          {viewProjectLabel}
          <ExternalLink size={12} />
        </Link>
      </div>
    </motion.article>
  )
}

export default function PortfolioContent({ projects }: { projects: Project[] }) {
  const t = useTranslations('portfolio')
  const homeLabel = useTranslations('common')('home')
  const plural = projects.length === 1 ? '' : 's'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.18) 0%, transparent 70%)' }} />
        <div className="stars pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav variants={fadeUp} initial="hidden" animate="visible"
            className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">{homeLabel}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient">{t('titleHighlight')}</span>
          </motion.nav>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-gradient mb-4 text-xs font-semibold uppercase tracking-[0.25em]">
              {t('eyebrow')}
            </motion.p>
            <motion.h1 variants={fadeUp} className="section-title mb-6">
              {t('title')} <span className="highlight">{t('titleHighlight')}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-white/60">
              {t('subtitle')}
            </motion.p>
          </motion.div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }} />
      </section>

      {/* GRID */}
      <section className="relative py-16" style={{ backgroundColor: '#030712' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 55%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-white/30">
            {t('projectsFound', { count: projects.length, plural })}
          </motion.p>

          {projects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-gray-500">{t('notFound')}</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    featuredLabel={t('featuredBadge')}
                    viewProjectLabel={t('viewProject')}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#060d1a' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {t('cta.eyebrow')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              {t('cta.title')} <span className="highlight">{t('cta.titleHighlight')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-10 text-sm leading-relaxed text-gray-400">
              {t('cta.description')}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contato" className="btn-blue inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm">
                {t('cta.button')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
