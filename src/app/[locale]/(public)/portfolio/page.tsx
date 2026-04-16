import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import PortfolioContent from './_content'
import type { Project } from '@/types'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const url = `${baseUrl}/${locale}/portfolio`
  const title = 'Portfolio | Ascend Tech Global'
  const description =
    'Conheça os projetos da Ascend Tech Global: sistemas sob medida, automações, integrações e soluções de inteligência artificial entregues para clientes reais.'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/portfolio`,
        en: `${baseUrl}/en/portfolio`,
        es: `${baseUrl}/es/portfolio`,
        'x-default': `${baseUrl}/pt-BR/portfolio`,
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

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  return <PortfolioContent projects={(data ?? []) as Project[]} />
}
