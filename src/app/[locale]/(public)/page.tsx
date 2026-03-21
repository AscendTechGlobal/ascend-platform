import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/sections/Hero'
import ProblemSolution from '@/components/sections/ProblemSolution'
import Services from '@/components/sections/Services'
import Differentials from '@/components/sections/Differentials'
import Audience from '@/components/sections/Audience'
import Authority from '@/components/sections/Authority'
import Results from '@/components/sections/Results'
import FinalCta from '@/components/sections/FinalCta'
import About from '@/components/sections/About'
import type { Service } from '@/types'
import { getSiteSettings } from '@/lib/site-settings'

export const dynamic = 'force-dynamic'

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

  return (
    <>
      <section id="hero">
        <Hero settings={settings} />
      </section>

      <section id="problem-solution">
        <ProblemSolution />
      </section>

      <section id="services">
        <Services services={services} />
      </section>

      <section id="differentials">
        <Differentials />
      </section>

      <section id="audience">
        <Audience />
      </section>

      <section id="authority">
        <Authority />
      </section>

      <section id="results">
        <Results />
      </section>

      <section id="final-cta">
        <FinalCta />
      </section>

      <section id="about">
        <About settings={settings} />
      </section>
    </>
  )
}
