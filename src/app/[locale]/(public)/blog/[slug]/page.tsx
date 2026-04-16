import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/navigation'
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react'
import type { BlogPost } from '@/types'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const baseUrl = 'https://ascendtechglobal.com'
  const url = `${baseUrl}/${locale}/blog/${slug}`
  const title = post.title
  const description = post.excerpt ?? post.title

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
        es: `${baseUrl}/es/blog/${slug}`,
        'x-default': `${baseUrl}/pt-BR/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ascend Tech Global',
      locale,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author],
      ...(post.cover_image ? { images: [{ url: post.cover_image, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(post.cover_image ? { images: [post.cover_image] } : {}),
    },
  }
}

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr))
}

function getInitials(author: string) {
  return author.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const common = await getTranslations({ locale, namespace: 'common' })

  const post = await getPost(slug)
  if (!post) notFound()

  const baseUrl = 'https://ascendtechglobal.com'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? post.title,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ascend Tech Global',
      url: baseUrl,
    },
    datePublished: post.created_at,
    url: `${baseUrl}/${locale}/blog/${post.slug}`,
    ...(post.cover_image ? { image: post.cover_image } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${baseUrl}/${locale}/blog/${post.slug}` },
    ],
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.15) 0%, transparent 70%)' }} />
        <div className="stars pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">{common('home')}</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-white/70 transition-colors">{t('titleHighlight')}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient truncate max-w-[200px]">{post.title}</span>
          </nav>

          <Link href="/blog"
            className="inline-flex items-center gap-2 mb-8 text-xs font-semibold transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ArrowLeft size={14} /> {t('backLink')}
          </Link>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)', color: 'rgba(0,212,255,0.75)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">{post.title}</h1>

          {post.excerpt && (
            <p className="text-base text-gray-400 leading-relaxed mb-8">{post.excerpt}</p>
          )}

          {/* Author + Date */}
          <div className="flex items-center gap-4 pb-8 border-b border-white/[0.06]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.08))', border: '1px solid rgba(0,212,255,0.3)' }}>
              {getInitials(post.author)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar size={11} color="rgba(0,212,255,0.6)" />
                <span className="text-[11px] text-gray-500">{formatDate(post.created_at, locale)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COVER */}
      {post.cover_image && (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,212,255,0.12)' }}>
            <div className="relative max-h-[400px] min-h-[260px] w-full">
              <Image
                src={post.cover_image}
                alt={`${post.title} - Ascend Tech Global`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-2xl p-8 sm:p-12" style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
            {post.content}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 flex items-center justify-between">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ArrowLeft size={14} /> {t('backLink')}
          </Link>
          <Link href="/contato" className="btn-blue inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-xs">
            {locale === 'en' ? 'Talk to the team' : locale === 'es' ? 'Hablar con el equipo' : 'Falar com a equipe'}
          </Link>
        </div>
      </section>
    </div>
  )
}
