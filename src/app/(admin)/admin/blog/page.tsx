import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types'
import BlogClient from './blog-client'

async function getPosts() {
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  return (data ?? []) as BlogPost[]
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogClient initialPosts={posts} />
}
