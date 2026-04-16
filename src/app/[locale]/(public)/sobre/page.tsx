import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import SobreContent from './_content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const url = `${baseUrl}/${locale}/sobre`
  const title = 'Sobre | Ascend Tech Global'
  const description =
    'Conheça a Ascend Tech Global, empresa focada em automação, software, inteligência artificial e segurança para operações que precisam crescer com estrutura.'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/sobre`,
        en: `${baseUrl}/en/sobre`,
        es: `${baseUrl}/es/sobre`,
        'x-default': `${baseUrl}/pt-BR/sobre`,
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

export default async function SobrePage({
  params,
}: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SobreContent />
}
