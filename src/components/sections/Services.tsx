'use client'

import { motion, type Variants } from 'framer-motion'
import { useLocale } from 'next-intl'
import {
  ArrowRight,
  Bot,
  Cloud,
  Code2,
  Lightbulb,
  Shield,
  type LucideIcon,
} from 'lucide-react'
import type { Service } from '@/types'
import { useTranslations } from '@/lib/i18n'

type TranslationServiceItem = {
  title: string
  description: string
}

const ICON_MAP: Record<string, LucideIcon> = { Lightbulb, Code2, Shield, Cloud, Bot }
const TRANSLATION_KEY_BY_ICON: Record<string, 'consulting' | 'software' | 'cyber' | 'cloud'> = {
  Lightbulb: 'consulting',
  Code2: 'software',
  Shield: 'cyber',
  Cloud: 'cloud',
}
const MESSAGE_ICONS: LucideIcon[] = [Lightbulb, Code2, Bot, Cloud, Shield]

const ENGLISH_DEFAULT_TITLES = new Set([
  'Tech Consulting',
  'Software Development',
  'Cyber Security',
  'Cloud Solutions',
])

function parseTitle(title: string) {
  const words = title.trim().split(/\s+/)

  if (words.length >= 2) {
    return {
      first: words.slice(0, -1).join(' '),
      last: words[words.length - 1],
    }
  }

  return { first: '', last: title }
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Services({ services }: { services?: Service[] }) {
  const locale = useLocale()
  const t = useTranslations('services')

  let translationItems: TranslationServiceItem[] = []

  try {
    const rawItems = t.raw('items')
    if (Array.isArray(rawItems)) {
      translationItems = rawItems.filter(
        (item): item is TranslationServiceItem =>
          !!item &&
          typeof item === 'object' &&
          typeof item.title === 'string' &&
          typeof item.description === 'string',
      )
    }
  } catch {
    translationItems = []
  }

  const fallback = [
    { icon: 'Lightbulb', ...parseTitle(`${t('fallback.consulting.title')} ${t('fallback.consulting.titleHighlight')}`), description: t('fallback.consulting.description') },
    { icon: 'Code2', ...parseTitle(`${t('fallback.software.title')} ${t('fallback.software.titleHighlight')}`), description: t('fallback.software.description') },
    { icon: 'Shield', ...parseTitle(`${t('fallback.cyber.title')} ${t('fallback.cyber.titleHighlight')}`), description: t('fallback.cyber.description') },
    { icon: 'Cloud', ...parseTitle(`${t('fallback.cloud.title')} ${t('fallback.cloud.titleHighlight')}`), description: t('fallback.cloud.description') },
  ]

  const items =
    translationItems.length > 0
      ? translationItems.map((service, index) => ({
          icon: MESSAGE_ICONS[index % MESSAGE_ICONS.length],
          ...parseTitle(service.title),
          description: service.description,
        }))
      : services && services.length > 0
      ? services.map((service) => {
          const translationKey = TRANSLATION_KEY_BY_ICON[service.icon ?? '']
          const shouldUseTranslatedFallback =
            locale !== 'en' &&
            !!translationKey &&
            (ENGLISH_DEFAULT_TITLES.has(service.title) ||
              /^[A-Za-z0-9 ,.'/-]+$/.test(service.description))

          const content = shouldUseTranslatedFallback
            ? {
                ...parseTitle(
                  `${t(`fallback.${translationKey}.title`)} ${t(`fallback.${translationKey}.titleHighlight`)}`,
                ),
                description: t(`fallback.${translationKey}.description`),
              }
            : {
                ...parseTitle(service.title),
                description: service.description,
              }

          return {
            icon: ICON_MAP[service.icon ?? ''] ?? Lightbulb,
            ...content,
          }
        })
      : fallback.map((item) => ({
          icon: ICON_MAP[item.icon] ?? Lightbulb,
          first: item.first,
          last: item.last,
          description: item.description,
        }))

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
          <h2 className="section-title mt-6">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {items.map(({ icon: Icon, first, last, description }) => (
            <motion.article
              key={`${first}-${last}`}
              variants={cardVariants}
              className="premium-panel flex h-full flex-col rounded-[1.8rem] p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04)),linear-gradient(135deg,rgba(14,165,233,0.18),rgba(139,92,246,0.12),rgba(236,72,153,0.12))] text-white shadow-[0_12px_26px_rgba(4,9,28,0.24)]">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>

              <h3 className="mt-8 text-[1.35rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                {first ? `${first} ` : ''}
                <span className="bg-[var(--gradient-text)] bg-clip-text text-transparent">
                  {last}
                </span>
              </h3>

              <p className="section-copy mt-4 flex-1 text-sm">{description}</p>

              <button className="btn-cyan-outline mt-8 inline-flex w-fit rounded-2xl px-4 py-2.5 text-xs">
                {t('learnMore')}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
