import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/types'
import ProjetosClient from './projetos-client'

async function getProjects() {
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  return (data ?? []) as Project[]
}

export default async function ProjetosPage() {
  const projects = await getProjects()
  return <ProjetosClient initialProjects={projects} />
}
