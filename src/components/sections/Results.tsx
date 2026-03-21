'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

export default function Results() {
  const t = useTranslations('results')
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

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {items.map((item, index) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="premium-panel rounded-[1.65rem] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/38">
                  0{index + 1}
                </span>
                <ArrowUpRight className="h-4 w-4 text-sky-200" strokeWidth={1.8} />
              </div>

              <p className="mt-10 text-lg font-medium leading-7 tracking-[-0.03em] text-white">
                {item}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
