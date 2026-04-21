'use client'

import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import type { FAQ } from '@/types'
import { useTranslations } from '@/lib/i18n'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={fadeUp}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="premium-panel w-full rounded-[1.5rem] px-5 py-5 text-left"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[0.68rem] font-semibold text-white/45">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-medium leading-snug text-white">{faq.question}</p>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/56">
                {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.24, ease: 'easeInOut' }}
                  className="section-copy overflow-hidden text-sm"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const t = useTranslations('faq')

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="section-shell bg-[#0F1720] py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            {t('eyebrow')}
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mt-6">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="mt-12 flex flex-col gap-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
