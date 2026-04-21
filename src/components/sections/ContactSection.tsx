'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import type { ContactFormData, SiteSettings } from '@/types'
import { useTranslations } from '@/lib/i18n'
import { formatWhatsAppLink, normalizeEmail, normalizePhone } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter ao menos 10 caracteres'),
  type: z.enum(['contact', 'budget'] as const),
})

type ContactSchema = z.infer<typeof contactSchema>

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut', delay: 0.08 } },
}

function getMailtoHref(email: string) {
  return `mailto:${email}`
}

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`
}

export default function ContactSection({ settings }: { settings?: SiteSettings | null }) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const t = useTranslations('contact')
  const email = normalizeEmail(settings?.email) || 'contato@ascendtech.com.br'
  const phone = normalizePhone(settings?.phone) || '+55 (11) 9 0000-0000'
  const whatsappNumber = normalizePhone(settings?.whatsapp_number) || '5511900000000'

  const contactItems = [
    {
      icon: Mail,
      label: t('info.email'),
      value: email,
      href: getMailtoHref(email),
    },
    {
      icon: Phone,
      label: t('info.phone'),
      value: phone,
      href: getPhoneHref(phone),
    },
    {
      icon: MessageCircle,
      label: t('info.whatsapp'),
      value: t('info.whatsappLabel'),
      href: formatWhatsAppLink(whatsappNumber),
    },
    {
      icon: MapPin,
      label: t('info.address'),
      value: t('info.addressValue'),
      href: null,
    },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: 'contact' },
  })

  async function onSubmit(data: ContactSchema) {
    setSubmitStatus('loading')

    try {
      const payload: ContactFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        type: data.type,
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Server error')

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <section id="contact" className="section-shell bg-[#0B0F14]  py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-3xl text-center"
        >
          
          <h2 className="section-title mt-6">
            {t('title')} <span className="highlight">{t('titleHighlight')}</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            {t('description')}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="premium-panel rounded-[2rem] p-6 sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                    {t('form.name')}
                  </label>
                  <input
                    {...register('name')}
                    placeholder={t('form.namePlaceholder')}
                    className="premium-input px-4 py-3.5 text-sm"
                    style={{
                      borderColor: errors.name ? 'rgba(239,68,68,0.45)' : undefined,
                    }}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                    {t('form.email')}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    className="premium-input px-4 py-3.5 text-sm"
                    style={{
                      borderColor: errors.email ? 'rgba(239,68,68,0.45)' : undefined,
                    }}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                    {t('form.phone')}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder={t('form.phonePlaceholder')}
                    className="premium-input px-4 py-3.5 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                    {t('form.type')}
                  </label>
                  <select
                    {...register('type')}
                    className="premium-select px-4 py-3.5 text-sm"
                    style={{
                      appearance: 'none',
                      borderColor: errors.type ? 'rgba(239,68,68,0.45)' : undefined,
                    }}
                  >
                    <option value="contact">{t('form.typeContact')}</option>
                    <option value="budget">{t('form.typeBudget')}</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {t('form.message')}
                </label>
                <textarea
                  {...register('message')}
                  rows={6}
                  placeholder={t('form.messagePlaceholder')}
                  className="premium-textarea px-4 py-3.5 text-sm"
                  style={{
                    resize: 'vertical',
                    borderColor: errors.message ? 'rgba(239,68,68,0.45)' : undefined,
                  }}
                />
                {errors.message && (
                  <p className="text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-white/52">{t('info.responseTime')}</p>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="btn-blue inline-flex rounded-2xl px-7 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-[1.2rem] border border-emerald-400/22 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                >
                  {t('form.successMessage')}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-[1.2rem] border border-red-400/22 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                >
                  {t('form.errorMessage')}
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-4"
          >
            <div className="premium-panel rounded-[2rem] p-6 sm:p-7">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/42">
                Contact Desk
              </p>
              <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
                {t('info.title')}
              </h3>
              <p className="section-copy mt-4 text-sm sm:text-base">{t('info.description')}</p>
            </div>

            {contactItems.map((item) => {
              const content = (
                <div className="premium-panel flex items-center gap-4 rounded-[1.5rem] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04)),linear-gradient(135deg,rgba(59,130,246,0.16),rgba(217,119,6,0.12),rgba(180,83,9,0.12))] text-white">
                    <item.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/38">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/82">{item.value}</p>
                  </div>
                </div>
              )

              if (!item.href) return <div key={item.label}>{content}</div>

              const isExternal = item.href.startsWith('http')
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {content}
                </a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
