'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/lib/i18n'

export default function FinalCta() {
  const t = useTranslations('finalCta')

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="premium-panel rounded-[2.4rem] px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="section-title mt-6">{t('title')}</h2>
            <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
              {t('description')}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contato"
                className="btn-orange inline-flex min-w-[220px] justify-center rounded-2xl px-7 py-4 text-sm"
              >
                {t('primaryButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contato"
                className="btn-cyan-outline inline-flex min-w-[220px] justify-center rounded-2xl px-7 py-4 text-sm"
              >
                {t('secondaryButton')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
