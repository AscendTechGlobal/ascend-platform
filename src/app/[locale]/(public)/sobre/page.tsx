import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import SobreContent from './_content'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const path = locale === 'pt-BR' ? '/pt-BR/sobre' : `/${locale}/sobre`
  const url = `${baseUrl}${path}`

  return {
    title: 'Sobre | Ascend Tech Global',
    description:
      'Conheça a Ascend Tech Global, empresa focada em automação, software, inteligência artificial e segurança para operações que precisam crescer com estrutura.',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: 'Sobre | Ascend Tech Global',
      description:
        'Conheça a Ascend Tech Global, empresa focada em automação, software, inteligência artificial e segurança para operações que precisam crescer com estrutura.',
      url,
      siteName: 'Ascend Tech Global',
      locale,
      type: 'website',
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
