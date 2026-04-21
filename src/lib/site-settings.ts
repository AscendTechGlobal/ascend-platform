import type { SiteSettings } from '@/types'
import { createClient } from '@/lib/supabase/server'

export const SETTINGS_ID = '00000000-0000-0000-0000-000000000001'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', SETTINGS_ID)
    .maybeSingle()

  if (error) {
    console.error('Failed to load site settings', error)
    return null
  }

  return data as SiteSettings | null
}
