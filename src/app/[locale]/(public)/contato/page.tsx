import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import ContatoContent from './_content'
import { getSiteSettings } from '@/lib/site-settings'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const path = locale === 'pt-BR' ? '/pt-BR/contato' : `/${locale}/contato`
  const url = `${baseUrl}${path}`

  return {
    title: 'Contato | Ascend Tech Global',
    description:
      'Fale com a Ascend Tech Global e descubra como automatizar processos, estruturar sua operação e desenvolver soluções sob medida para o seu negócio.',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: 'Contato | Ascend Tech Global',
      description:
        'Fale com a Ascend Tech Global e descubra como automatizar processos, estruturar sua operação e desenvolver soluções sob medida para o seu negócio.',
      url,
      siteName: 'Ascend Tech Global',
      locale,
      type: 'website',
    },
  }
}

export default async function ContatoPage({
  params,
}: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const settings = await getSiteSettings()

  return <ContatoContent settings={settings} />
}
