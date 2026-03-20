import { setRequestLocale } from 'next-intl/server'
import ContatoContent from './_content'
import { getSiteSettings } from '@/lib/site-settings'

export const dynamic = 'force-dynamic'

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const settings = await getSiteSettings()

  return <ContatoContent settings={settings} />
}
