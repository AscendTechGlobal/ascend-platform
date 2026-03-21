'use client'

import { motion } from 'framer-motion'
import { Layers3, ScanSearch, Workflow } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

const DIFFERENTIAL_ICONS = [ScanSearch, Workflow, Layers3]

export default function Differentials() {
  const t = useTranslations('differentials')

  const paragraphs = [t('paragraph1'), t('paragraph2'), t('paragraph3')]

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title mt-6 max-w-4xl">{t('title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="grid gap-4"
        >
          {paragraphs.map((paragraph, index) => {
            const Icon = DIFFERENTIAL_ICONS[index] ?? Layers3

            return (
              <article key={paragraph} className="premium-panel rounded-[1.7rem] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-white/12 bg-white/[0.04] text-sky-200">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/38">
                      0{index + 1}
                    </p>
                    <p className="section-copy mt-3 text-base">{paragraph}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
