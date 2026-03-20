import { setRequestLocale } from 'next-intl/server'
import ServicosContent from './_content'

export default async function ServicosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ServicosContent />
}
