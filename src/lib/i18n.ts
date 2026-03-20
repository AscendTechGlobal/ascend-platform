/**
 * i18n shim — re-exports next-intl's useTranslations for Client Components.
 *
 * All components that do:
 *   import { useTranslations } from '@/lib/i18n'
 * continue to work without any changes.
 *
 * next-intl's useTranslations reads messages from the nearest
 * NextIntlClientProvider (provided by src/app/[locale]/layout.tsx),
 * so translations are fully locale-aware.
 *
 * For Server Components that need translations, import directly:
 *   import { getTranslations } from 'next-intl/server'
 */
export { useTranslations } from 'next-intl'
