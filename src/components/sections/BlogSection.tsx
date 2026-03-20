'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPost } from '@/types'
import { useTranslations } from '@/lib/i18n'

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Como a IA está Transformando o Desenvolvimento de Software',
    slug: 'ia-transformando-desenvolvimento-software',
    excerpt:
      'Exploramos como ferramentas de inteligência artificial estão acelerando ciclos de desenvolvimento e reduzindo custos operacionais em até 40%.',
    content: '',
    cover_image: null,
    author: 'Ascend Tech',
    tags: ['IA', 'Desenvolvimento', 'Tecnologia'],
    published: true,
    featured: true,
    seo_title: null,
    seo_description: null,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-10T00:00:00Z',
  },
  {
    id: '2',
    title: 'Segurança em Nuvem: Boas Práticas para 2025',
    slug: 'seguranca-nuvem-boas-praticas-2025',
    excerpt:
      'Um guia abrangente sobre as principais estratégias de segurança em ambientes cloud-first que todo CTO precisa conhecer.',
    content: '',
    cover_image: null,
    author: 'Ascend Tech',
    tags: ['Cloud', 'Segurança', 'DevOps'],
    published: true,
    featured: false,
    seo_title: null,
    seo_description: null,
    created_at: '2024-02-22T00:00:00Z',
    updated_at: '2024-02-22T00:00:00Z',
  },
  {
    id: '3',
    title: 'Micro-Frontends: Escalando Times de Engenharia',
    slug: 'micro-frontends-escalando-times-engenharia',
    excerpt:
      'Descubra como arquiteturas de micro-frontend permitem que equipes independentes entreguem features em paralelo sem conflitos.',
    content: '',
    cover_image: null,
    author: 'Ascend Tech',
    tags: ['Arquitetura', 'Frontend', 'Escalabilidade'],
    published: true,
    featured: false,
    seo_title: null,
    seo_description: null,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
]

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: 'easeOut' },
  },
}

function BlogCard({ post, readMoreLabel }: { post: BlogPost; readMoreLabel: string }) {
  return (
    <motion.article variants={cardVariants} className="premium-panel rounded-[1.8rem] p-6">
      <div className="flex items-center gap-2 text-white/55">
        <Calendar className="h-3.5 w-3.5 text-sky-300" />
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.24em]">
          {formatDate(post.created_at)}
        </span>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/62"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 className="mt-6 text-[1.2rem] font-semibold leading-tight tracking-[-0.03em] text-white">
        {post.title}
      </h3>
      <p className="section-copy mt-4 text-sm">{post.excerpt ?? ''}</p>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition-colors duration-200 hover:text-white"
      >
        {readMoreLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  )
}

interface BlogSectionProps {
  posts?: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations('blog')
  const displayPosts = posts && posts.length > 0 ? posts : mockPosts

  return (
    <section className="section-shell py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title mt-6">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {displayPosts.map((post) => (
            <BlogCard key={post.id} post={post} readMoreLabel={t('readMore')} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/blog" className="btn-cyan-outline rounded-2xl px-7 py-3 text-sm">
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
