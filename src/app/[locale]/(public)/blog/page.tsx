import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import BlogContent from './_content'
import type { BlogPost } from '@/types'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  return <BlogContent posts={(data ?? []) as BlogPost[]} />
}
