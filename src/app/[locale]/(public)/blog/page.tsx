import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import BlogContent from './_content'
import type { BlogPost } from '@/types'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = 'https://ascendtechglobal.com'
  const url = `${baseUrl}/${locale}/blog`
  const title = 'Blog | Ascend Tech Global'
  const description =
    'Artigos sobre automação, inteligência artificial, desenvolvimento de sistemas e estratégias para empresas que querem crescer com tecnologia.'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/blog`,
        en: `${baseUrl}/en/blog`,
        es: `${baseUrl}/es/blog`,
        'x-default': `${baseUrl}/pt-BR/blog`,
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
