'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Calendar, ArrowRight, ChevronRight, Tag } from 'lucide-react'
import type { BlogPost } from '@/types'

const ACCENT_COLORS = ['#00d4ff', '#f59e0b']

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr))
}

function getInitials(author: string) {
  return author.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

function FeaturedCard({
  post,
  locale,
  featuredLabel,
  readArticleLabel,
}: {
  post: BlogPost
  locale: string
  featuredLabel: string
  readArticleLabel: string
}) {
  return (
    <motion.article variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      className="glow-card rounded-2xl overflow-hidden">
      <div className="relative h-64 w-full flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0.04) 50%, rgba(3,7,18,0.95) 100%)', borderBottom: '1px solid rgba(0,212,255,0.15)' }}>
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={`${post.title} - capa do artigo`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
            <circle cx="60" cy="60" r="55" stroke="rgba(0,212,255,0.15)" strokeWidth="1" />
            <circle cx="60" cy="60" r="40" stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="60" cy="60" r="8" fill="rgba(0,212,255,0.25)" />
            <circle cx="60" cy="60" r="4" fill="#00d4ff" />
          </svg>
        )}
        <div className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.15))', border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b' }}>
          {featuredLabel}
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} color="rgba(0,212,255,0.6)" />
            <span className="text-[11px] font-medium text-gray-500">{formatDate(post.created_at, locale)}</span>
          </div>
        </div>

        {post.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)', color: 'rgba(0,212,255,0.75)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="mb-4 text-xl font-extrabold leading-tight text-white">{post.title}</h2>
        {post.excerpt && <p className="mb-6 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.08))', border: '1px solid rgba(0,212,255,0.3)' }}>
              {getInitials(post.author)}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{post.author}</p>
              <p className="text-[10px] text-gray-500">Ascend Tech Global</p>
            </div>
          </div>
          <Link href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:gap-2.5"
            style={{ color: '#00d4ff' }}>
            {readArticleLabel} <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function PostCard({ post, index, locale, readLabel }: { post: BlogPost; index: number; locale: string; readLabel: string }) {
  const accentColor = ACCENT_COLORS[index % 2]
  return (
    <motion.article layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }} className="glow-card flex flex-col rounded-2xl p-6 gap-4">
      <div className="flex items-center gap-1.5">
        <Calendar size={12} color="rgba(0,212,255,0.6)" />
        <span className="text-[10px] font-medium text-gray-500">{formatDate(post.created_at, locale)}</span>
      </div>

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
              style={{ background: `${accentColor}0a`, border: `1px solid ${accentColor}28`, color: `${accentColor}cc` }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 className="text-sm font-extrabold leading-snug text-white">{post.title}</h3>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }} />
      {post.excerpt && <p className="flex-1 text-xs leading-relaxed text-gray-400">{post.excerpt}</p>}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-black text-white"
            style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)`, border: `1px solid ${accentColor}30` }}>
            {getInitials(post.author)}
          </div>
          <span className="text-[10px] font-medium text-gray-500">{post.author}</span>
        </div>
        <Link href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
          style={{ color: accentColor }}>
          {readLabel} <ArrowRight size={11} />
        </Link>
      </div>
    </motion.article>
  )
}

export default function BlogContent({ posts }: { posts: BlogPost[] }) {
  const locale = useLocale()
  const t = useTranslations('blog')
  const homeLabel = useTranslations('common')('home')
  const featuredPost = posts.find((p) => p.featured)
  const otherPosts = posts.filter((p) => !p.featured || p.id !== featuredPost?.id)

  const allTags = [t('allTags'), ...Array.from(new Set(posts.flatMap((p) => p.tags ?? [])))]
  const [activeTag, setActiveTag] = useState(t('allTags'))

  const filteredOthers = activeTag === t('allTags') ? otherPosts : otherPosts.filter((p) => p.tags?.includes(activeTag))

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.18) 0%, transparent 70%)' }} />
        <div className="stars pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav variants={fadeUp} initial="hidden" animate="visible"
            className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">{homeLabel}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient">{t('titleHighlight')}</span>
          </motion.nav>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-gradient mb-4 text-xs font-semibold uppercase tracking-[0.25em]">
              {t('eyebrow')}
            </motion.p>
            <motion.h1 variants={fadeUp} className="section-title mb-6">
              {t('title')} <span className="highlight">{t('titleHighlight')}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-white/60">
              {t('subtitle')}
            </motion.p>
          </motion.div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }} />
      </section>

      {/* FEATURED */}
      {featuredPost && (
        <section className="relative py-8" style={{ backgroundColor: '#030712' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FeaturedCard
              post={featuredPost}
              locale={locale}
              featuredLabel={t('featuredBadge')}
              readArticleLabel={t('readArticle')}
            />
          </div>
        </section>
      )}

      {/* TAG FILTER + GRID */}
      <section className="relative py-16" style={{ backgroundColor: '#030712' }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {allTags.length > 1 && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-10 flex flex-wrap items-center gap-2">
              <Tag size={13} color="rgba(255,255,255,0.3)" />
              {allTags.map((tag) => {
                const isActive = activeTag === tag
                return (
                  <button key={tag} type="button" onClick={() => setActiveTag(tag)}
                    className="rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isActive ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.45)',
                    }}>
                    {tag}
                  </button>
                )
              })}
            </motion.div>
          )}

          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-gray-500">{t('notFound')}</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredOthers.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} locale={locale} readLabel={t('read')} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#060d1a' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {t('cta.eyebrow')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              {t('cta.title')} <span className="highlight">{t('cta.titleHighlight')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-10 text-sm leading-relaxed text-gray-400">
              {t('cta.description')}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contato" className="btn-orange inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm">
                {t('cta.button')} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
