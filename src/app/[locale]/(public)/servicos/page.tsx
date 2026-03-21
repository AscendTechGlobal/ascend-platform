import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import ServicosContent from './_content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const path = locale === 'pt-BR' ? '/pt-BR/servicos' : `/${locale}/servicos`
  const url = `${baseUrl}${path}`

  return {
    title: 'Serviços | Ascend Tech Global',
    description:
      'Automação de processos, desenvolvimento de sistemas, inteligência artificial aplicada, integrações e cibersegurança para empresas que querem escalar com eficiência.',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: 'Serviços | Ascend Tech Global',
      description:
        'Automação de processos, desenvolvimento de sistemas, inteligência artificial aplicada, integrações e cibersegurança para empresas que querem escalar com eficiência.',
      url,
      siteName: 'Ascend Tech Global',
      locale,
      type: 'website',
    },
  }
}

export default async function ServicosPage({
  params,
}: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ServicosContent />
}
