import { defineRouting } from 'next-intl/routing'

export const locales = ['pt-BR', 'en', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pt-BR'

export const routing = defineRouting({
  locales,
  defaultLocale,
  /**
   * 'always' → all locales are explicit in the URL:
   *   /pt-BR/   /en/   /es/
   *
   * This makes it simple for SEO (clear hreflang) and for
   * middleware to detect locale without ambiguity.
   */
  localePrefix: 'always',
})
