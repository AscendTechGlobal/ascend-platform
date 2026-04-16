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
  const url = `${baseUrl}/${locale}/contato`
  const title = 'Contato | Ascend Tech Global'
  const description =
    'Fale com a Ascend Tech Global e descubra como automatizar processos, estruturar sua operação e desenvolver soluções sob medida para o seu negócio.'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/contato`,
        en: `${baseUrl}/en/contato`,
        es: `${baseUrl}/es/contato`,
        'x-default': `${baseUrl}/pt-BR/contato`,
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

export default async function ContatoPage({
  params,
}: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const settings = await getSiteSettings()

  return <ContatoContent settings={settings} />
}
