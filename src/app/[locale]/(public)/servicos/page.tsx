import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import ServicosContent from './_content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const url = `${baseUrl}/${locale}/servicos`
  const title = 'Serviços | Ascend Tech Global'
  const description =
    'Automação de processos, desenvolvimento de sistemas, inteligência artificial aplicada, integrações e cibersegurança para empresas que querem escalar com eficiência.'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/servicos`,
        en: `${baseUrl}/en/servicos`,
        es: `${baseUrl}/es/servicos`,
        'x-default': `${baseUrl}/pt-BR/servicos`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ascend Tech Global',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
