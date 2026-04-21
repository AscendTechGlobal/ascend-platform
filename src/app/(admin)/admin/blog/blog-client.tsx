'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Plus, Pencil, Trash2, RefreshCw, FileText, Star } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const supabase = createClient()
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)

  async function confirmDelete() {
    if (!deleteTarget) return
    setLoading(true)
    await supabase.from('blog_posts').delete().eq('id', deleteTarget.id)
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    queueAuditLog({
      action: 'admin.blog.deleted',
      resource: 'blog_post',
      resourceId: deleteTarget.id,
      metadata: {
        title: deleteTarget.title,
      },
    })
    setDeleteTarget(null)
    setLoading(false)
  }

  const published = posts.filter((p) => p.published).length
  const drafts = posts.length - published

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Blog</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {published} publicado(s) · {drafts} rascunho(s)
          </p>
        </div>
        <Link
          href="/admin/blog/novo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563eb)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
          }}
        >
          <Plus size={15} /> Novo Post
        </Link>
      </div>

      {/* Posts list */}
      {posts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl"
          style={{ border: '1px dashed rgba(0,212,255,0.15)', background: 'rgba(6,13,26,0.5)' }}
        >
          <FileText size={40} style={{ color: 'rgba(0,212,255,0.3)' }} />
          <p className="mt-4 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Nenhum post criado ainda.
          </p>
          <Link
            href="/admin/blog/novo"
            className="mt-4 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            style={{
              background: 'rgba(0,212,255,0.1)',
              color: '#00d4ff',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
          >
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(0,212,255,0.1)', background: 'rgba(6,13,26,0.8)' }}
        >
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Título', 'Autor', 'Tags', 'Status', 'Data', 'Ações'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left font-semibold tracking-wider uppercase text-[10px]"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  className="hover:bg-white/[0.02] transition-colors"
                  style={{
                    borderBottom: i < posts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {post.featured && (
                        <Star size={11} style={{ color: '#3B82F6', flexShrink: 0 }} />
                      )}
                      <span className="font-semibold text-white">{post.title}</span>
                    </div>
                    {post.excerpt && (
                      <p className="text-[10px] mt-0.5 truncate max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {post.excerpt}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {post.author}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(post.tags ?? []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {(post.tags ?? []).length > 3 && (
                        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={
                        post.published
                          ? { background: 'rgba(34,197,94,0.12)', color: '#22c55e' }
                          : { background: 'rgba(100,116,139,0.15)', color: 'rgba(255,255,255,0.45)' }
                      }
                    >
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/${post.id}/editar`}
                        className="p-1.5 rounded-md transition-all hover:bg-white/10"
                        style={{ color: '#00d4ff' }}
                        title="Editar"
                      >
                        <Pencil size={13} />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="p-1.5 rounded-md transition-all hover:bg-red-500/10"
                        style={{ color: 'rgba(239,68,68,0.7)' }}
                        title="Excluir"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent style={{ background: '#060d1a', border: '1px solid rgba(239,68,68,0.2)', maxWidth: 400 }}>
          <DialogHeader>
            <DialogTitle className="text-white">Excluir Post</DialogTitle>
            <DialogDescription style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tem certeza que deseja excluir{' '}
              <span className="text-white font-semibold">{deleteTarget?.title}</span>? Esta ação não
              pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={loading}
              style={{ background: '#ef4444', color: 'white' }}
            >
              {loading ? <RefreshCw size={14} className="animate-spin mr-1" /> : null}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
