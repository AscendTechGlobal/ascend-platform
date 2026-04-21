'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import { Plus, Pencil, Trash2, RefreshCw, FolderOpen, Star } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function ProjetosClient({ initialProjects }: { initialProjects: Project[] }) {
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)

  async function confirmDelete() {
    if (!deleteTarget) return
    setLoading(true)
    await supabase.from('projects').delete().eq('id', deleteTarget.id)
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    queueAuditLog({
      action: 'admin.project.deleted',
      resource: 'project',
      resourceId: deleteTarget.id,
      metadata: {
        title: deleteTarget.title,
      },
    })
    setDeleteTarget(null)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Projetos</h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {projects.length} projeto(s) cadastrado(s)
          </p>
        </div>
        <Link
          href="/admin/projetos/novo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563eb)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
          }}
        >
          <Plus size={15} /> Novo Projeto
        </Link>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl"
          style={{ border: '1px dashed rgba(0,212,255,0.15)', background: 'rgba(6,13,26,0.5)' }}
        >
          <FolderOpen size={40} style={{ color: 'rgba(0,212,255,0.3)' }} />
          <p className="mt-4 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Nenhum projeto cadastrado ainda.
          </p>
          <Link
            href="/admin/projetos/novo"
            className="mt-4 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            style={{
              background: 'rgba(0,212,255,0.1)',
              color: '#00d4ff',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
          >
            Criar primeiro projeto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(6,13,26,0.8)',
                border: '1px solid rgba(0,212,255,0.1)',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Cover */}
              <div
                className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: project.cover_image
                    ? `url(${project.cover_image}) center/cover no-repeat`
                    : 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(6,13,26,0.9))',
                }}
              >
                {!project.cover_image && (
                  <FolderOpen size={32} style={{ color: 'rgba(0,212,255,0.25)' }} />
                )}
                {/* Badges overlay */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {project.featured && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(59,130,246,0.85)', color: '#030712' }}
                    >
                      <Star size={8} /> Destaque
                    </span>
                  )}
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={
                      project.published
                        ? { background: 'rgba(34,197,94,0.85)', color: '#030712' }
                        : { background: 'rgba(100,116,139,0.85)', color: 'white' }
                    }
                  >
                    {project.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">{project.title}</h3>
                  <p
                    className="text-xs mt-1 line-clamp-2"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {project.short_description}
                  </p>
                </div>

                {/* Technologies */}
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-semibold px-2 py-0.5 rounded"
                        style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className="text-[9px] px-2 py-0.5 rounded"
                        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
                  <Link
                    href={`/admin/projetos/${project.id}/editar`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold flex-1 justify-center transition-all"
                    style={{
                      border: '1px solid rgba(0,212,255,0.2)',
                      color: '#00d4ff',
                    }}
                  >
                    <Pencil size={11} /> Editar
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:bg-red-500/10"
                    style={{
                      border: '1px solid rgba(239,68,68,0.15)',
                      color: 'rgba(239,68,68,0.7)',
                    }}
                  >
                    <Trash2 size={11} /> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent style={{ background: '#060d1a', border: '1px solid rgba(239,68,68,0.2)', maxWidth: 400 }}>
          <DialogHeader>
            <DialogTitle className="text-white">Excluir Projeto</DialogTitle>
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
