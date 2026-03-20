'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, type Locale } from '@/i18n/routing'

const LABELS: Record<Locale, { short: string; label: string }> = {
  'pt-BR': { short: 'PT', label: 'Português' },
  en: { short: 'EN', label: 'English' },
  es: { short: 'ES', label: 'Español' },
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(next: Locale) {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl"
      style={{ opacity: isPending ? 0.65 : 1, transition: 'opacity 200ms ease' }}
      aria-label="Selecionar idioma"
    >
      {locales.map((item) => {
        const info = LABELS[item]
        const isActive = item === locale

        return (
          <button
            key={item}
            type="button"
            onClick={() => switchLocale(item)}
            disabled={isPending}
            title={info.label}
            className={[
              'rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] transition-all duration-200',
              isActive
                ? 'bg-white/[0.1] text-white shadow-[0_6px_18px_rgba(255,255,255,0.06)]'
                : 'text-white/45 hover:text-white',
            ].join(' ')}
          >
            {info.short}
          </button>
        )
      })}
    </div>
  )
}
