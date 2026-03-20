'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Save,
  RefreshCw,
  Settings,
  Globe,
  Phone,
  Share2,
  FileText,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { queueAuditLog } from '@/lib/security/audit-client'
import {
  normalizeEmail,
  normalizeExternalUrl,
  normalizePhone,
  normalizeText,
} from '@/lib/utils'

const schema = z.object({
  whatsapp_number: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  hero_title: z.string().optional(),
  hero_subtitle: z.string().optional(),
  hero_cta_text: z.string().optional(),
  about_text: z.string().optional(),
  footer_text: z.string().optional(),
  social_linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
  social_instagram: z.string().url('URL inválida').optional().or(z.literal('')),
  social_github: z.string().url('URL inválida').optional().or(z.literal('')),
  social_facebook: z.string().url('URL inválida').optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001'

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon?: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-xl p-6 space-y-4"
      style={{ background: 'rgba(6,13,26,0.8)', border: '1px solid rgba(0,212,255,0.1)' }}
    >
      <h3 className="text-sm font-bold text-white pb-3 border-b border-white/5 flex items-center gap-2">
        {Icon && <Icon size={14} style={{ color: '#00d4ff' }} />}
        {title}
      </h3>
      {children}
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
      style={{ color: 'rgba(255,255,255,0.5)' }}
    >
      {children}
    </label>
  )
}

function InputField({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div>
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
          color: 'white',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#00d4ff55'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)'
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? 'rgba(239,68,68,0.4)'
            : 'rgba(255,255,255,0.1)'
          e.currentTarget.style.boxShadow = 'none'
          props.onBlur?.(e)
        }}
      />
      {error && (
        <p className="mt-1 text-[11px]" style={{ color: '#f87171' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function TextareaField({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#00d4ff55'
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)'
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    />
  )
}

export default function ConfiguracoesPage() {
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', SETTINGS_ID)
        .single()

      if (data) {
        const social = (data.social_links as Record<string, string>) ?? {}
        reset({
          whatsapp_number: data.whatsapp_number ?? '',
          email: data.email ?? '',
          phone: data.phone ?? '',
          hero_title: data.hero_title ?? '',
          hero_subtitle: data.hero_subtitle ?? '',
          hero_cta_text: data.hero_cta_text ?? '',
          about_text: data.about_text ?? '',
          footer_text: data.footer_text ?? '',
          social_linkedin: social.linkedin ?? '',
          social_instagram: social.instagram ?? '',
          social_github: social.github ?? '',
          social_facebook: social.facebook ?? '',
        })
      }
      setFetching(false)
    }
    fetchSettings()
  }, [reset, supabase])

  async function onSubmit(data: FormData) {
    setSaving(true)
    setErrorMsg('')
    setSuccessMsg('')

    const socialLinks = {
      linkedin: normalizeExternalUrl(data.social_linkedin) || '',
      instagram: normalizeExternalUrl(data.social_instagram) || '',
      github: normalizeExternalUrl(data.social_github) || '',
      facebook: normalizeExternalUrl(data.social_facebook) || '',
    }

    const { error } = await supabase.from('site_settings').upsert({
      id: SETTINGS_ID,
      whatsapp_number: normalizePhone(data.whatsapp_number),
      email: normalizeEmail(data.email),
      phone: normalizePhone(data.phone),
      hero_title: normalizeText(data.hero_title),
      hero_subtitle: normalizeText(data.hero_subtitle),
      hero_cta_text: normalizeText(data.hero_cta_text),
      about_text: normalizeText(data.about_text),
      footer_text: normalizeText(data.footer_text),
      social_links: socialLinks,
      updated_at: new Date().toISOString(),
    })

    setSaving(false)
    if (error) {
      setErrorMsg('Erro ao salvar: ' + error.message)
    } else {
      queueAuditLog({
        action: 'admin.settings.updated',
        resource: 'site_settings',
        resourceId: SETTINGS_ID,
      })
      setSuccessMsg('Configurações salvas com sucesso!')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={28} className="animate-spin" style={{ color: '#00d4ff' }} />
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Carregando configurações...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 40,
              height: 40,
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
          >
            <Settings size={18} style={{ color: '#00d4ff' }} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Configurações</h2>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Gerencie as informações globais do site
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div
          className="px-4 py-3 rounded-lg text-sm font-medium"
          style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.2)',
            color: '#4ade80',
          }}
        >
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div
          className="px-4 py-3 rounded-lg text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#f87171',
          }}
        >
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Hero */}
        <SectionCard title="Seção Hero" icon={Globe}>
          <div>
            <FieldLabel>Título Principal</FieldLabel>
            <InputField
              placeholder="Empowering Your Business to Reach New Heights"
              {...register('hero_title')}
            />
          </div>
          <div>
            <FieldLabel>Subtítulo</FieldLabel>
            <InputField
              placeholder="Innovative Technology Solutions for Businesses Worldwide"
              {...register('hero_subtitle')}
            />
          </div>
          <div>
            <FieldLabel>Texto do Botão CTA</FieldLabel>
            <InputField placeholder="Get Started" {...register('hero_cta_text')} />
          </div>
        </SectionCard>

        {/* About */}
        <SectionCard title="Sobre a Empresa" icon={FileText}>
          <div>
            <FieldLabel>Texto da seção &quot;Sobre&quot;</FieldLabel>
            <TextareaField
              placeholder="Descreva a empresa, sua missão, visão e valores..."
              rows={5}
              {...register('about_text')}
            />
          </div>
        </SectionCard>

        {/* Contact */}
        <SectionCard title="Informações de Contato" icon={Phone}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>WhatsApp (com DDI)</FieldLabel>
              <InputField placeholder="5511999999999" {...register('whatsapp_number')} />
            </div>
            <div>
              <FieldLabel>Telefone</FieldLabel>
              <InputField placeholder="(11) 99999-9999" {...register('phone')} />
            </div>
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <InputField
              type="email"
              placeholder="contato@ascendtechglobal.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
        </SectionCard>

        {/* Social Links */}
        <SectionCard title="Redes Sociais" icon={Share2}>
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                { key: 'social_linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/...' },
                { key: 'social_instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                { key: 'social_github', label: 'GitHub', placeholder: 'https://github.com/...' },
                { key: 'social_facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
              ] as const
            ).map(({ key, label, placeholder }) => (
              <div key={key}>
                <FieldLabel>{label}</FieldLabel>
                <InputField
                  placeholder={placeholder}
                  error={(errors as Record<string, { message?: string }>)[key]?.message}
                  {...register(key)}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Footer */}
        <SectionCard title="Rodapé" icon={FileText}>
          <div>
            <FieldLabel>Texto do Rodapé</FieldLabel>
            <InputField
              placeholder="© 2025 Ascend Tech Global. All rights reserved."
              {...register('footer_text')}
            />
          </div>
        </SectionCard>

        {/* Save button */}
        <div className="flex justify-end pb-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold transition-all"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              boxShadow: saving ? 'none' : '0 4px 20px rgba(245,158,11,0.3)',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  )
}
