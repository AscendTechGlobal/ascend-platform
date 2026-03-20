import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import PortfolioContent from './_content'
import type { Project } from '@/types'

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
