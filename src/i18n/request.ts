import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'

/**
 * Called on every server request — resolves the locale and loads the
 * corresponding message bundle.
 *
 * next-intl reads the locale from the [locale] URL segment via
 * `requestLocale`. If it is missing or unknown, we fall back to pt-BR.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  // Static imports keep webpack happy (no dynamic template literal)
  const messages = await loadMessages(locale)

  return { locale, messages }
})

async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('../../messages/en.json')).default
    case 'es':
      return (await import('../../messages/es.json')).default
    case 'pt-BR':
    default:
      return (await import('../../messages/pt-BR.json')).default
  }
}
