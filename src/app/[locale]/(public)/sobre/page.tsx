import { setRequestLocale } from 'next-intl/server'
import SobreContent from './_content'

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SobreContent />
}
