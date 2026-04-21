'use client'

import { motion, type Variants } from 'framer-motion'
import { Globe2, Lightbulb, ShieldCheck } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: 'easeOut' },
  },
}

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs')

  const reasons = [
    {
      icon: Lightbulb,
      title: t('card1.title'),
      titleHighlight: t('card1.titleHighlight'),
      description: t('card1.description'),
    },
    {
      icon: Globe2,
      title: t('card2.title'),
      titleHighlight: t('card2.titleHighlight'),
      description: t('card2.description'),
    },
    {
      icon: ShieldCheck,
      title: t('card3.title'),
      titleHighlight: t('card3.titleHighlight'),
      description: t('card3.description'),
    },
  ]

  return (
    <section className="section-shell py-24 sm:py-28">
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
          {reasons.map(({ icon: Icon, title, titleHighlight, description }) => (
            <motion.article
              key={titleHighlight}
              variants={cardVariants}
              className="premium-panel rounded-[1.8rem] p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04)),linear-gradient(135deg,rgba(59,130,246,0.16),rgba(217,119,6,0.12),rgba(180,83,9,0.12))] text-white shadow-[0_12px_26px_rgba(4,9,28,0.22)]">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>

              <h3 className="mt-8 text-[1.35rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                {title}{' '}
                <span className="bg-[var(--gradient-text)] bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              </h3>

              <p className="section-copy mt-4 text-sm">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
