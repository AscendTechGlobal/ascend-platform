'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/lib/i18n'
import type { SiteSettings } from '@/types'

const LEGACY_DEFAULT_HERO_TITLE = 'Empowering Your Business to Reach New Heights'
const LEGACY_DEFAULT_HERO_SUBTITLE = 'Innovative Technology Solutions for Businesses Worldwide'
const LEGACY_DEFAULT_HERO_CTA = 'Get Started'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[640px] px-2 lg:-mt-10 xl:-mt-14">
      <div className="absolute inset-x-[14%] bottom-[17%] h-24 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18),transparent_70%)] blur-3xl" />
      <Image
        src="/file_000.png"
        alt="Ascend Tech Global"
        width={1080}
        height={1350}
        priority
        className="relative z-10 h-auto w-[108%] max-w-none object-contain lg:-translate-y-4"
      />
    </div>
  )
}

export default function Hero({ settings }: { settings?: SiteSettings | null }) {
  const t = useTranslations('hero')
  const heroTitle =
    settings?.hero_title && settings.hero_title !== LEGACY_DEFAULT_HERO_TITLE
      ? settings.hero_title
      : null
  const heroSubtitle =
    settings?.hero_subtitle && settings.hero_subtitle !== LEGACY_DEFAULT_HERO_SUBTITLE
      ? settings.hero_subtitle
      : null
  const heroCta =
    settings?.hero_cta_text && settings.hero_cta_text !== LEGACY_DEFAULT_HERO_CTA
      ? settings.hero_cta_text
      : null

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ]

  return (
    <section className="section-shell relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 stars opacity-75" />
      <div className="pointer-events-none absolute inset-0 grain-overlay" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl gap-14 px-6 pb-18 pt-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full max-w-2xl flex-col items-start lg:mx-0"
        >
          <motion.span variants={itemVariants} className="eyebrow">
            {t('badge')}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-7 max-w-none text-[clamp(2.9rem,5.4vw,4.85rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white"
          >
            {heroTitle ? (
              <span className="text-white">{heroTitle}</span>
            ) : (
              <>
                <span className="text-white">{t('title')}</span>{' '}
                <span className="bg-[linear-gradient(135deg,#367dd9_0%,#f2ae2e_100%)] bg-clip-text text-transparent [text-shadow:0_0_26px_rgba(54,125,217,0.16)]">
                  {t('titleHighlight')}
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-[1.15rem] font-medium leading-8 text-white/86 sm:text-[1.28rem]"
          >
            {heroSubtitle || t('subtitle')}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="section-copy mt-4 max-w-xl text-base sm:text-lg"
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href="/contato"
              className="btn-orange inline-flex min-w-[220px] justify-center rounded-2xl px-7 py-4 text-sm"
            >
              {heroCta || t('cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="btn-cyan-outline inline-flex min-w-[200px] justify-center rounded-2xl px-7 py-4 text-sm"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 w-full max-w-xl rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4 backdrop-blur-xl"
          >
            <div className="grid gap-3 sm:grid-cols-[1.25fr_repeat(3,0.75fr)] sm:items-center">
              <div className="flex items-start gap-3 pr-2">
                <span className="mt-1 rounded-full border border-white/10 bg-white/[0.04] p-2 text-sky-200">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/88">{t('trustLabel')}</p>
                  <p className="mt-1 text-sm leading-6 text-white/56">{t('trustDescription')}</p>
                </div>
              </div>

              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-left sm:text-center"
                >
                  <p className="text-[1.45rem] font-semibold tracking-[-0.05em] text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.64rem] uppercase tracking-[0.2em] text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.12 }}
          className="flex items-center justify-center lg:justify-end lg:self-start"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
