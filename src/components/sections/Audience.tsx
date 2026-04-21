'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from '@/lib/i18n'

export default function Audience() {
  const t = useTranslations('audience')
  const rawItems = t.raw('items')
  const items = Array.isArray(rawItems) ? rawItems.filter((item): item is string => typeof item === 'string') : []
  const closingLine = t('closingLine')

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
          <h2 className="section-title mt-6">{t('title')}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('description')}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const isFeatured = i === 1
            return (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={[
                  'relative flex min-h-[148px] flex-col justify-between rounded-[1.65rem] p-5 cursor-default transition-shadow duration-300',
                  isFeatured
                    ? 'border border-blue-500/30 bg-blue-500/[0.06] shadow-[0_0_32px_rgba(59,130,246,0.12)]'
                    : 'premium-panel',
                ].join(' ')}
              >
                {isFeatured && (
                  <div className="absolute inset-0 rounded-[1.65rem] ring-1 ring-inset ring-blue-500/20 pointer-events-none" />
                )}

                <div
                  className={[
                    'flex h-11 w-11 items-center justify-center rounded-[0.95rem] border transition-shadow duration-300',
                    isFeatured
                      ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.35)]'
                      : 'border-red-500/20 bg-red-500/10 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.18)]',
                  ].join(' ')}
                >
                  <AlertTriangle className="h-5 w-5" strokeWidth={1.9} />
                </div>

                <p className="mt-8 text-base font-medium leading-7 tracking-[-0.025em] text-white/88">
                  {item}
                </p>
              </motion.article>
            )
          })}
        </div>

        {/* Closing statement */}
        {closingLine && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 text-xl sm:text-2xl font-bold tracking-tight text-white text-center max-w-5xl mx-auto"
          >
            Se você se identificou com isso, sua operação já está no limite.
          </motion.p>
        )}
      </div>
    </section>
  )
}
