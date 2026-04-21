'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/lib/i18n'
import type { SiteSettings } from '@/types'

function AboutVisual({ locale }: { locale: string }) {
  const copy =
    locale === 'en'
      ? {
          eyebrow: 'Execution Layer',
          title: 'Strategy with delivery discipline',
          items: [
            { label: 'Discovery', value: 'Business, product and user alignment' },
            { label: 'Build', value: 'Senior implementation with scalable foundations' },
            { label: 'Scale', value: 'Optimization, trust and measurable growth' },
          ],
        }
        : locale === 'es'
        ? {
            eyebrow: 'Capa de Ejecucion',
            title: 'Estrategia con disciplina de entrega',
            items: [
              { label: 'Discovery', value: 'Alineacion entre negocio, producto y usuario' },
              { label: 'Build', value: 'Implementacion senior con bases escalables' },
              { label: 'Scale', value: 'Optimizacion, confianza y crecimiento medible' },
            ],
          }
        : {
            eyebrow: 'Camada de Execucao',
            title: 'Estrategia com disciplina de entrega',
            items: [
              { label: 'Discovery', value: 'Alinhamento entre negocio, produto e usuario' },
              { label: 'Build', value: 'Implementacao senior com fundamentos escalaveis' },
              { label: 'Scale', value: 'Otimizacao, confianca e crescimento mensuravel' },
            ],
          }

  return (
    <div className="premium-panel relative w-full max-w-[520px] rounded-[2rem] p-6 sm:p-8">
      <div className="grain-overlay rounded-[2rem]" />

      <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/38">
              {copy.eyebrow}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
              {copy.title}
            </p>
          </div>
          <div className="rounded-full border border-white/12 bg-white/[0.04] p-3 text-white/72">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {copy.items.map((item, index) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/78">{item.value}</p>
                </div>
                <div className="text-sm font-semibold tracking-[-0.03em] text-white/52">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About({ settings }: { settings?: SiteSettings | null }) {
  const locale = useLocale()
  const t = useTranslations('about')
  const bullets = [t('bullet1'), t('bullet2'), t('bullet3')]

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.96fr)] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          
          <h2 className="section-title mt-6">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h2>

          <p className="section-copy mt-6 text-base sm:text-lg">
            {settings?.about_text || t('paragraph1')}
          </p>
          <p className="section-copy mt-4 text-base sm:text-lg">{t('paragraph2')}</p>

          <div className="mt-8 grid gap-3">
            {bullets.map((item) => (
              <div
                key={item}
                className="premium-panel flex items-start gap-3 rounded-[1.35rem] px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                <p className="text-sm leading-7 text-white/78">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/sobre" className="btn-blue rounded-2xl px-7 py-3.5 text-sm">
              {t('cta')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="flex justify-center lg:justify-end"
        >
          <AboutVisual locale={locale} />
        </motion.div>
      </div>
    </section>
  )
}
