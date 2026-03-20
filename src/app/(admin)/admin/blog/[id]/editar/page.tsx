'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { ArrowLeft, Save, RefreshCw } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  title: z.string().min(3, 'Título deve ter ao menos 3 caracteres'),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífens'),
  excerpt: z.string().optional(),
  content: z.string().min(10, 'Conteúdo obrigatório'),
  author: z.string().min(2, 'Autor obrigatório'),
  tags: z.string().optional(),
  cover_image: z.string().url('URL inválida').optional().or(z.literal('')),
  published: z.boolean(),
  featured: z.boolean(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
      {children} {required && <span style={{ color: '#f59e0b' }}>*</span>}
    </label>
  )
}

function InputField({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div>
      <input {...props} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`, color: 'white' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)'; props.onFocus?.(e) }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; props.onBlur?.(e) }}
      />
      {error && <p className="mt-1 text-[11px]" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  )
}

function TextareaField({ error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <div>
      <textarea {...props} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
        style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`, color: 'white' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#00d4ff55'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
      />
      {error && <p className="mt-1 text-[11px]" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  )
}

export default function EditarPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { featured: false, published: false },
  })

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
      if (data) {
        reset({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? '',
          content: data.content,
          author: data.author,
          tags: data.tags?.join(', ') ?? '',
          cover_image: data.cover_image ?? '',
          published: data.published,
          featured: data.featured,
          seo_title: data.seo_title ?? '',
          seo_description: data.seo_description ?? '',
        })
      }
      setLoading(false)
    }
    load()
  }, [id, reset, supabase])

  async function onSubmit(data: FormData) {
    setSaving(true)
    setErrorMsg('')
    const tags = data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
    const { error } = await supabase.from('blog_posts').update({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      author: data.author,
      tags,
      cover_image: data.cover_image || null,
      published: data.published,
      featured: data.featured,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
    }).eq('id', id)

    if (error) { setErrorMsg(error.message); setSaving(false); return }
    queueAuditLog({
      action: 'admin.blog.updated',
      resource: 'blog_post',
      resourceId: id,
      metadata: {
        title: data.title,
        published: data.published,
      },
    })
    router.push('/admin/blog')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <RefreshCw size={28} className="animate-spin" style={{ color: '#00d4ff' }} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-white">Editar Post</h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Atualize os dados do post</p>
        </div>
      </div>

      {errorMsg && (
        <div className="px-4 py-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5">Conteúdo</h3>
          <div><FieldLabel required>Título</FieldLabel><InputField placeholder="Título do post" error={errors.title?.message} {...register('title')} /></div>
          <div><FieldLabel required>Slug</FieldLabel><InputField placeholder="slug-do-post" error={errors.slug?.message} {...register('slug')} /></div>
          <div><FieldLabel required>Autor</FieldLabel><InputField placeholder="Nome do autor" error={errors.author?.message} {...register('author')} /></div>
          <div><FieldLabel>Resumo (Excerpt)</FieldLabel><TextareaField placeholder="Resumo do artigo..." rows={3} {...register('excerpt')} /></div>
          <div><FieldLabel required>Conteúdo</FieldLabel><TextareaField placeholder="Conteúdo completo do post..." rows={12} error={errors.content?.message} {...register('content')} /></div>
        </div>

        <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5">Mídia e Tags</h3>
          <div><FieldLabel>URL da Imagem de Capa</FieldLabel><InputField placeholder="https://..." error={errors.cover_image?.message} {...register('cover_image')} /></div>
          <div>
            <FieldLabel>Tags</FieldLabel>
            <InputField placeholder="IA, Cloud, DevOps" {...register('tags')} />
            <p className="mt-1 text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Separe por vírgulas.</p>
          </div>
        </div>

        <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5">SEO</h3>
          <div><FieldLabel>Título SEO</FieldLabel><InputField placeholder="Título SEO" {...register('seo_title')} /></div>
          <div><FieldLabel>Descrição SEO</FieldLabel><TextareaField placeholder="Descrição SEO" rows={3} {...register('seo_description')} /></div>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <h3 className="text-sm font-bold text-white pb-3 mb-4 border-b border-white/5">Publicação</h3>
          <div className="flex gap-8">
            {[
              { name: 'published' as const, label: 'Publicado', color: 'bg-cyan-500' },
              { name: 'featured' as const, label: 'Destaque', color: 'bg-yellow-500' },
            ].map(({ name, label, color }) => (
              <label key={name} className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" {...register(name)} />
                  <div className={`w-10 h-5 rounded-full transition-all peer-checked:${color}`} style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all peer-checked:translate-x-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </div>
                <span className="text-sm text-white font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/blog" className="px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}>
            Cancelar
          </Link>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', opacity: saving ? 0.7 : 1 }}>
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Salvando...' : 'Atualizar Post'}
          </button>
        </div>
      </form>
    </div>
  )
}
