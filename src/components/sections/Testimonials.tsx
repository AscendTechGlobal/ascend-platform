'use client'

import { motion, type Variants } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import type { Testimonial } from '@/types'
import { useTranslations } from '@/lib/i18n'

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rafael Mendes',
    role: 'CEO',
    company: 'FinCorp Brasil',
    content:
      'A Ascend Tech Global transformou completamente nossa infraestrutura digital. Em apenas 6 meses, reduzimos custos operacionais em 35% e aumentamos nossa capacidade de processamento em 4x. Trabalho impecável e equipe extremamente dedicada.',
    avatar: null,
    rating: 5,
    published: true,
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Camila Torres',
    role: 'CTO',
    company: 'ShopNow E-Commerce',
    content:
      'Precisávamos de uma plataforma escalável para o nosso marketplace. A solução entregue pela Ascend superou todas as expectativas. O suporte pós-implantação é exemplar.',
    avatar: null,
    rating: 5,
    published: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Lucas Ferreira',
    role: 'Diretor de Tecnologia',
    company: 'MedCare Solutions',
    content:
      'Desenvolveram nossa plataforma de telemedicina com altíssima qualidade técnica, cumprindo todos os requisitos regulatórios. A parceria com a Ascend é estratégica para nosso crescimento.',
    avatar: null,
    rating: 5,
    published: true,
    created_at: '2023-12-10T00:00:00Z',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: 'easeOut' },
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-3.5 w-3.5"
          fill={index < rating ? '#3b82f6' : 'transparent'}
          stroke={index < rating ? '#3b82f6' : 'rgba(255,255,255,0.2)'}
          strokeWidth={1.4}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.article variants={cardVariants} className="premium-panel rounded-[1.8rem] p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/12 bg-white/[0.04] text-blue-400">
          <Quote className="h-5 w-5" />
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      <p className="section-copy mt-6 text-sm italic">&ldquo;{testimonial.content}&rdquo;</p>

      <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[var(--gradient-brand)] text-sm font-semibold text-white">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-white/48">
            {testimonial.role}
            {testimonial.company ? ` — ${testimonial.company}` : ''}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations('testimonials')
  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : mockTestimonials

  return (
    <section className="section-shell bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          
          <h2 className="section-title mt-6">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/50">{t('trustBadge')}</p>
        </motion.div>
      </div>
    </section>
  )
}
