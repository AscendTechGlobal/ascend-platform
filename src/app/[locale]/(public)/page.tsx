import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/sections/Hero'
import PainPoints from '@/components/sections/PainPoints'
import Services from '@/components/sections/Services'
import SystemsVisual from '@/components/sections/SystemsVisual'
import ProcessSteps from '@/components/sections/ProcessSteps'
import Authority from '@/components/sections/Authority'
import Audience from '@/components/sections/Audience'
import FinalCta from '@/components/sections/FinalCta'
import type { Service } from '@/types'
import { getSiteSettings } from '@/lib/site-settings'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const url = `${baseUrl}/${locale}`

  const titles: Record<string, string> = {
    'pt-BR': 'Ascend Tech Global | Automação, IA e Sistemas Sob Medida',
    en: 'Ascend Tech Global | Automation, AI and Custom Software',
    es: 'Ascend Tech Global | Automatización, IA y Software a Medida',
  }
  const descriptions: Record<string, string> = {
    'pt-BR':
      'Automação, inteligência artificial e desenvolvimento de sistemas para empresas que querem crescer com eficiência, controle e escala.',
    en: 'Automation, artificial intelligence and software development for businesses that want to grow with efficiency, control and scale.',
    es: 'Automatización, inteligencia artificial y desarrollo de sistemas para empresas que quieren crecer con eficiencia, control y escala.',
  }

  const title = titles[locale] ?? titles['pt-BR']
  const description = descriptions[locale] ?? descriptions['pt-BR']

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR`,
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        'x-default': `${baseUrl}/pt-BR`,
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
async function getData() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true })

  return {
    services: (data ?? []) as Service[],
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [{ services }, settings] = await Promise.all([
    getData(),
    getSiteSettings(),
  ])

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ascend Tech Global',
    url: 'https://ascendtechglobal.com',
    logo: 'https://ascendtechglobal.com/favicon.ico',
    description:
      'Automação, inteligência artificial e desenvolvimento de sistemas para empresas que querem crescer com eficiência, controle e escala.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Porto Alegre',
      addressRegion: 'RS',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
    sameAs: [
      settings?.social_links?.linkedin ?? '',
      settings?.social_links?.instagram ?? '',
    ].filter(Boolean),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ascend Tech Global',
    url: 'https://ascendtechglobal.com',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <section id="hero">
        <Hero settings={settings} />
      </section>

      <section id="pain-points">
        <PainPoints />
      </section>

      <section id="services">
        <Services services={services} />
      </section>

      <section id="systems-visual">
        <SystemsVisual />
      </section>

      <section id="process-steps">
        <ProcessSteps />
      </section>

      <section id="authority">
        <Authority />
      </section>

      <section id="audience">
        <Audience />
      </section>

      <section id="final-cta">
        <FinalCta />
      </section>
    </>
  )
}
