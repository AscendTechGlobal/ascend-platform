'use client'

import { useLocale } from 'next-intl'
import { motion, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/types'
import { useTranslations } from '@/lib/i18n'

function getMockProjects(locale: string): Project[] {
  const copy =
    locale === 'en'
      ? [
          {
            title: 'FinTech Dashboard',
            description: 'Real-time financial analytics platform with advanced data visualization and AI-powered insights.',
          },
          {
            title: 'E-Commerce Platform',
            description: 'Scalable multi-vendor marketplace with real-time inventory and integrated payment gateway.',
          },
          {
            title: 'Healthcare App',
            description: 'Telemedicine platform connecting patients and doctors with secure video consultations.',
          },
        ]
      : locale === 'es'
        ? [
            {
              title: 'Dashboard FinTech',
              description: 'Plataforma de analítica financiera en tiempo real con visualización avanzada de datos e insights impulsados por IA.',
            },
            {
              title: 'Plataforma E-Commerce',
              description: 'Marketplace multivendedor escalable con inventario en tiempo real y pasarela de pago integrada.',
            },
            {
              title: 'App de Salud',
              description: 'Plataforma de telemedicina que conecta pacientes y médicos con videollamadas seguras.',
            },
          ]
        : [
            {
              title: 'Dashboard FinTech',
              description: 'Plataforma de analytics financeiros em tempo real com visualização avançada de dados e insights com IA.',
            },
            {
              title: 'Plataforma E-Commerce',
              description: 'Marketplace multivendedor escalável com estoque em tempo real e gateway de pagamento integrado.',
            },
            {
              title: 'App de Saúde',
              description: 'Plataforma de telemedicina conectando pacientes e médicos com videochamadas seguras.',
            },
          ]

  return [
    {
      id: '1',
      title: copy[0].title,
      slug: 'fintech-dashboard',
      short_description: copy[0].description,
      full_description: null,
      cover_image: null,
      gallery: null,
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'],
      client: 'FinCorp',
      url: null,
      featured: true,
      published: true,
      seo_title: null,
      seo_description: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      title: copy[1].title,
      slug: 'ecommerce-platform',
      short_description: copy[1].description,
      full_description: null,
      cover_image: null,
      gallery: null,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      client: 'ShopNow',
      url: null,
      featured: true,
      published: true,
      seo_title: null,
      seo_description: null,
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z',
    },
    {
      id: '3',
      title: copy[2].title,
      slug: 'healthcare-app',
      short_description: copy[2].description,
      full_description: null,
      cover_image: null,
      gallery: null,
      technologies: ['React Native', 'Firebase', 'WebRTC', 'AWS'],
      client: 'MedCare',
      url: null,
      featured: false,
      published: true,
      seo_title: null,
      seo_description: null,
      created_at: '2024-03-01T00:00:00Z',
      updated_at: '2024-03-01T00:00:00Z',
    },
  ]
}

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
}

/* ─── Project Card ───────────────────────────────────────── */
function ProjectCard({ project, ctaLabel }: { project: Project; ctaLabel: string }) {
  return (
    <motion.div
      variants={cardVariants}
      className="premium-panel flex flex-col overflow-hidden rounded-[1.8rem]"
    >
      {/* Cover image area */}
      <div
        className="relative h-48 w-full flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle at 20% 10%, rgba(14,165,233,0.15), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(10,14,28,0.92) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {project.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 select-none">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden
            >
              <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="8"
                stroke="rgba(0,212,255,0.35)"
                strokeWidth="1.5"
                fill="rgba(0,212,255,0.04)"
              />
              <circle cx="22" cy="22" r="5" fill="rgba(0,212,255,0.25)" />
              <path
                d="M8 40 L20 28 L30 38 L42 26 L56 40"
                stroke="rgba(0,212,255,0.4)"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(0,212,255,0.4)' }}
            >
              {project.client ?? 'Project'}
            </span>
          </div>
        )}

        {/* Corner accent */}
        <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.8)]" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Title */}
        <h3 className="text-[1.15rem] font-semibold leading-tight tracking-[-0.03em] text-white">
          {project.title}
        </h3>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="section-copy flex-1 text-sm">
          {project.short_description}
        </p>

        {/* CTA */}
        <Link
          href={project.url ?? `/portfolio/${project.slug}`}
          className="btn-cyan-outline mt-auto inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs"
        >
          {ctaLabel}
          <ExternalLink size={12} />
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── Portfolio section ──────────────────────────────────── */
interface PortfolioProps {
  projects?: Project[]
}

export default function Portfolio({ projects }: PortfolioProps) {
  const locale = useLocale()
  const t = useTranslations('portfolio')
  const displayProjects = projects === undefined ? getMockProjects(locale) : projects

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-4 max-w-3xl text-center"
        >
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-copy mx-auto mb-16 max-w-2xl text-center text-base"
        >
          {t('subtitle')}
        </motion.p>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} ctaLabel={t('viewProject')} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/portfolio"
            className="btn-orange inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm"
          >
            {t('viewAll')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
