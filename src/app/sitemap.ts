import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://ascendtechglobal.com'
const LOCALES = ['pt-BR', 'en', 'es'] as const

function localeUrls(path: string) {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localeUrls(''),
    ...localeUrls('/servicos'),
    ...localeUrls('/portfolio'),
    ...localeUrls('/blog'),
    ...localeUrls('/sobre'),
    ...localeUrls('/contato'),
  ]

  // Dynamic blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true)

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).flatMap((post) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  )

  // Dynamic portfolio projects
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .eq('published', true)

  const portfolioRoutes: MetadataRoute.Sitemap = (projects ?? []).flatMap((project) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/portfolio/${project.slug}`,
      lastModified: new Date(project.updated_at ?? new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  )

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes]
}
