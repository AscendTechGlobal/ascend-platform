'use client'

import { motion } from 'framer-motion'
import { ArrowRightLeft, Sparkles, type LucideIcon } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

function ContentCard({
  icon: Icon,
  eyebrow,
  title,
  paragraph1,
  paragraph2,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  paragraph1: string
  paragraph2: string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="premium-panel rounded-[2rem] p-7 sm:p-8"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04)),linear-gradient(135deg,rgba(59,130,246,0.18),rgba(217,119,6,0.12),rgba(180,83,9,0.12))] text-white shadow-[0_12px_26px_rgba(4,9,28,0.24)]">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>

      
      <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
        {title}
      </h2>
      <p className="section-copy mt-5 text-base sm:text-lg">{paragraph1}</p>
      <p className="section-copy mt-4 text-base sm:text-lg">{paragraph2}</p>
    </motion.article>
  )
}

export default function ProblemSolution() {
  const t = useTranslations('problemSolution')

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <ContentCard
          icon={ArrowRightLeft}
          eyebrow={t('problemEyebrow')}
          title={t('problemTitle')}
          paragraph1={t('problemParagraph1')}
          paragraph2={t('problemParagraph2')}
        />
        <ContentCard
          icon={Sparkles}
          eyebrow={t('solutionEyebrow')}
          title={t('solutionTitle')}
          paragraph1={t('solutionParagraph1')}
          paragraph2={t('solutionParagraph2')}
        />
      </div>
    </section>
  )
}
