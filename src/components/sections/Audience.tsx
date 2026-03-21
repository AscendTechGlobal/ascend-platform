'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

export default function Audience() {
  const t = useTranslations('audience')
  const rawItems = t.raw('items')
  const items = Array.isArray(rawItems) ? rawItems.filter((item): item is string => typeof item === 'string') : []

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
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title mt-6">{t('title')}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
        >
          {items.map((item) => (
            <article
              key={item}
              className="premium-panel flex min-h-[148px] flex-col justify-between rounded-[1.65rem] p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-white/12 bg-white/[0.04] text-sky-200">
                <CheckCircle2 className="h-5 w-5" strokeWidth={1.9} />
              </div>
              <p className="mt-8 text-base font-medium leading-7 tracking-[-0.025em] text-white/88">
                {item}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
