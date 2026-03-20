/**
 * Locale layout — wraps all public and auth pages.
 *
 * Responsibilities:
 * - Validates the [locale] param and falls back to pt-BR if unknown.
 * - Calls setRequestLocale() so next-intl RSC helpers (getTranslations, etc.)
 *   work correctly in Server Components under this segment.
 * - Provides NextIntlClientProvider so Client Components can call
 *   useTranslations(), useLocale(), etc.
 *
 * Admin routes are NOT under this layout — they live at app/(admin)/ and
 * use the root layout directly. Admin has no i18n requirement.
 */
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Reject unknown locale values (prevents Next.js from rendering garbage)
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  // Enable next-intl APIs in Server Components under this segment
  setRequestLocale(locale)

  // Load the full message bundle for this locale (passed to the provider)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
