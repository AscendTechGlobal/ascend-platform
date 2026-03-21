'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Radar } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

export default function Authority() {
  const t = useTranslations('authority')

  const points = [
    { icon: BadgeCheck, text: t('paragraph1') },
    { icon: Radar, text: t('paragraph2') },
  ]

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.96fr)] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title mt-6">{t('title')}</h2>
          <p className="section-copy mt-6 text-base sm:text-lg">{t('paragraph1')}</p>
          <p className="section-copy mt-4 text-base sm:text-lg">{t('paragraph2')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="premium-panel rounded-[2rem] p-6 sm:p-8"
        >
          <div className="grid gap-4">
            {points.map(({ icon: Icon, text }, index) => (
              <div
                key={`${index}-${text}`}
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-white/12 bg-white/[0.04] text-sky-200">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/38">
                      0{index + 1}
                    </p>
                    <p className="section-copy mt-3 text-sm">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
