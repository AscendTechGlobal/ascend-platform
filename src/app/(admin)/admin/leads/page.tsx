import { createClient } from '@/lib/supabase/server'
import type { ContactSubmission } from '@/types'
import LeadsClient from './leads-client'

async function getLeads() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return (data ?? []) as ContactSubmission[]
}

export default async function LeadsPage() {
  const leads = await getLeads()
  return <LeadsClient initialLeads={leads} />
}
