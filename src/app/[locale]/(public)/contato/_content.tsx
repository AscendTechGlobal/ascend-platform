'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
  ChevronRight,
  Linkedin,
  Instagram,
  Github,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import type { ContactFormData, SiteSettings } from '@/types'
import {
  formatWhatsAppLink,
  normalizeEmail,
  normalizeExternalUrl,
  normalizePhone,
} from '@/lib/utils'

type ContactSchema = {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  type: 'contact' | 'budget'
}

/* ─── Animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65 } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.1 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/* ─── Shared input styles ─────────────────────────────────── */
const inputBase =
  'w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-1 focus:ring-[rgba(0,212,255,0.4)]'

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(0,212,255,0.15)',
}

const inputErrorStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(239,68,68,0.5)',
}

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', key: 'linkedin' },
  { icon: Instagram, label: 'Instagram', key: 'instagram' },
  { icon: Github, label: 'GitHub', key: 'github' },
]

type SocialLinkItem = (typeof socialLinks)[number] & { href: string }

const copyByLocale = {
  'pt-BR': {
    heroEyebrow: 'Fale Conosco',
    heroTitle: 'ENTRE EM',
    heroHighlight: 'CONTATO',
    heroDescription:
      'Nossa equipe está pronta para ouvir sobre seus desafios e apresentar a melhor solução tecnológica para o seu negócio. Resposta garantida em menos de 24 horas.',
    whatsappEyebrow: 'Resposta Imediata',
    whatsappTitle: 'Fale pelo WhatsApp agora',
    whatsappDescription:
      'Clique para iniciar uma conversa. Normalmente respondemos em menos de 1 hora durante o horário comercial.',
    formTitle: 'Envie sua Mensagem',
    formSubtitle: 'Preencha o formulário e entraremos em contato em até 24 horas.',
    successTitle: 'Mensagem enviada!',
    successDescription: 'Recebemos sua mensagem e entraremos em contato em breve.',
    errorTitle: 'Ocorreu um erro',
    errorDescription: 'Por favor, tente novamente ou entre em contato pelo WhatsApp.',
    company: 'Empresa',
    companyPlaceholder: 'Nome da sua empresa',
    infoTitle: 'Informações de Contato',
    infoDescription:
      'Nossos especialistas estão disponíveis de segunda a sexta, das 9h às 18h. Para emergências, utilizamos o canal de WhatsApp com cobertura estendida.',
    location: 'Localização',
    socialTitle: 'Redes Sociais',
  },
  en: {
    heroEyebrow: 'Get In Touch',
    heroTitle: 'GET IN',
    heroHighlight: 'TOUCH',
    heroDescription:
      'Our team is ready to understand your challenges and present the best technology solution for your business. Response guaranteed in less than 24 hours.',
    whatsappEyebrow: 'Instant Response',
    whatsappTitle: 'Talk on WhatsApp now',
    whatsappDescription:
      'Click to start a conversation. We usually reply in under 1 hour during business hours.',
    formTitle: 'Send Your Message',
    formSubtitle: "Fill out the form and we'll get back to you within 24 hours.",
    successTitle: 'Message sent!',
    successDescription: "We've received your message and will get back to you soon.",
    errorTitle: 'Something went wrong',
    errorDescription: 'Please try again or contact us on WhatsApp.',
    company: 'Company',
    companyPlaceholder: 'Your company name',
    infoTitle: 'Contact Information',
    infoDescription:
      'Our specialists are available Monday through Friday, from 9 AM to 6 PM. For urgent cases, we use WhatsApp with extended coverage.',
    location: 'Location',
    socialTitle: 'Social Media',
  },
  es: {
    heroEyebrow: 'Hable con Nosotros',
    heroTitle: 'PÓNGASE EN',
    heroHighlight: 'CONTACTO',
    heroDescription:
      'Nuestro equipo está listo para escuchar sus desafíos y presentar la mejor solución tecnológica para su negocio. Respuesta garantizada en menos de 24 horas.',
    whatsappEyebrow: 'Respuesta Inmediata',
    whatsappTitle: 'Hable por WhatsApp ahora',
    whatsappDescription:
      'Haga clic para iniciar una conversación. Normalmente respondemos en menos de 1 hora durante el horario comercial.',
    formTitle: 'Envíe su Mensaje',
    formSubtitle: 'Complete el formulario y nos pondremos en contacto en hasta 24 horas.',
    successTitle: '¡Mensaje enviado!',
    successDescription: 'Hemos recibido su mensaje y nos pondremos en contacto en breve.',
    errorTitle: 'Ocurrió un error',
    errorDescription: 'Por favor, inténtelo nuevamente o contáctenos por WhatsApp.',
    company: 'Empresa',
    companyPlaceholder: 'Nombre de su empresa',
    infoTitle: 'Información de Contacto',
    infoDescription:
      'Nuestros especialistas están disponibles de lunes a viernes, de 9:00 a 18:00. Para urgencias, utilizamos WhatsApp con cobertura extendida.',
    location: 'Ubicación',
    socialTitle: 'Redes Sociales',
  },
} as const

/* ─── Content ────────────────────────────────────────────── */
function getMailtoHref(email: string) {
  return `mailto:${email}`
}

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/\D/g, '')}`
}

export default function ContatoContent({ settings }: { settings?: SiteSettings | null }) {
  const locale = useLocale() as keyof typeof copyByLocale
  const t = useTranslations('contact')
  const copy = copyByLocale[locale] ?? copyByLocale['pt-BR']
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const email = normalizeEmail(settings?.email) || 'contato@ascendtech.com.br'
  const phone = normalizePhone(settings?.phone) || '+55 (11) 9 0000-0000'
  const whatsappNumber = normalizePhone(settings?.whatsapp_number) || '5511900000000'
  const whatsappHref = formatWhatsAppLink(whatsappNumber)
  const resolvedSocialLinks = socialLinks
    .map((item) => ({
      ...item,
      href: normalizeExternalUrl(settings?.social_links?.[item.key]),
    }))
    .filter((item): item is SocialLinkItem => Boolean(item.href))

  const contactSchema = z.object({
    name: z.string().min(2, locale === 'en' ? 'Name must be at least 2 characters' : locale === 'es' ? 'El nombre debe tener al menos 2 caracteres' : 'Nome deve ter ao menos 2 caracteres'),
    email: z.string().email(locale === 'en' ? 'Invalid email' : locale === 'es' ? 'Correo electrónico inválido' : 'E-mail inválido'),
    phone: z.string().optional(),
    company: z.string().optional(),
    message: z.string().min(10, locale === 'en' ? 'Message must be at least 10 characters' : locale === 'es' ? 'El mensaje debe tener al menos 10 caracteres' : 'Mensagem deve ter ao menos 10 caracteres'),
    type: z.enum(['contact', 'budget'] as const, { message: locale === 'en' ? 'Select a contact type' : locale === 'es' ? 'Seleccione el tipo' : 'Selecione o tipo' }),
  })

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
      href: whatsappHref,
    },
    {
      icon: MapPin,
      label: copy.location,
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
        company: data.company,
        message: data.message,
        type: data.type,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Server error')

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.18) 0%, transparent 70%)' }} />
        <div className="stars pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav variants={fadeUp} initial="hidden" animate="visible"
            className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">{locale === 'en' ? 'Home' : locale === 'es' ? 'Inicio' : 'Início'}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient">{locale === 'en' ? 'Contact' : locale === 'es' ? 'Contacto' : 'Contato'}</span>
          </motion.nav>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-gradient mb-4 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.heroEyebrow}
            </motion.p>
            <motion.h1 variants={fadeUp} className="section-title mb-6">
              {copy.heroTitle} <span className="highlight">{copy.heroHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-white/60">
              {copy.heroDescription}
            </motion.p>
          </motion.div>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }} />
      </section>

      {/* ── WHATSAPP CARD ─────────────────────────────────── */}
      <section className="py-6" style={{ backgroundColor: '#030712' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ scale: 1.01 }}
            className="flex items-center gap-5 rounded-2xl p-6 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(37,211,102,0.1) 0%, rgba(37,211,102,0.05) 100%)',
              border: '1px solid rgba(37,211,102,0.3)',
              boxShadow: '0 0 30px rgba(37,211,102,0.08)',
            }}
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.35)', boxShadow: '0 0 20px rgba(37,211,102,0.2)' }}>
              <MessageCircle size={28} color="#25d366" strokeWidth={1.8} />
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#25d366' }}>
                {copy.whatsappEyebrow}
              </p>
              <h3 className="mt-0.5 text-base font-extrabold text-white">{copy.whatsappTitle}</h3>
              <p className="mt-1 text-xs text-gray-400">
                {copy.whatsappDescription}
              </p>
            </div>

            <ArrowRight size={20} color="#25d366" className="shrink-0" />
          </motion.a>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────── */}
      <section className="relative py-16" style={{ backgroundColor: '#030712' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,212,255,0.05) 0%, transparent 55%)' }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 75% 50%, rgba(245,158,11,0.03) 0%, transparent 50%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* ── LEFT: Form ─────────────────────────────── */}
            <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <div className="glow-card rounded-2xl p-8">
                <h2 className="mb-2 text-base font-extrabold uppercase tracking-wide text-white">{copy.formTitle}</h2>
                <p className="mb-8 text-xs text-gray-400">{copy.formSubtitle}</p>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 flex items-start gap-3 rounded-xl p-4"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <CheckCircle2 size={18} color="#4ade80" className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-400">{copy.successTitle}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{copy.successDescription}</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 flex items-start gap-3 rounded-xl p-4"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <AlertCircle size={18} color="#f87171" className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-400">{copy.errorTitle}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{copy.errorDescription}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('form.name')} *</label>
                      <input {...register('name')} placeholder={t('form.namePlaceholder')} className={inputBase}
                        style={errors.name ? inputErrorStyle : inputStyle} />
                      {errors.name && <p className="text-[10px] text-red-400">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('form.email')} *</label>
                      <input {...register('email')} type="email" placeholder={t('form.emailPlaceholder')} className={inputBase}
                        style={errors.email ? inputErrorStyle : inputStyle} />
                      {errors.email && <p className="text-[10px] text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('form.phone')}</label>
                      <input {...register('phone')} type="tel" placeholder={t('form.phonePlaceholder')} className={inputBase} style={inputStyle} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{copy.company}</label>
                      <input {...register('company')} placeholder={copy.companyPlaceholder} className={inputBase} style={inputStyle} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('form.type')} *</label>
                    <select {...register('type')} className={inputBase}
                      style={{ ...(errors.type ? inputErrorStyle : inputStyle), appearance: 'none', cursor: 'pointer' }}>
                      <option value="contact" style={{ background: '#060d1a' }}>{t('form.typeContact')}</option>
                      <option value="budget" style={{ background: '#060d1a' }}>{t('form.typeBudget')}</option>
                    </select>
                    {errors.type && <p className="text-[10px] text-red-400">{errors.type.message}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t('form.message')} *</label>
                    <textarea {...register('message')} rows={5}
                      placeholder={t('form.messagePlaceholder')}
                      className={inputBase}
                      style={{ ...(errors.message ? inputErrorStyle : inputStyle), resize: 'vertical' }} />
                    {errors.message && <p className="text-[10px] text-red-400">{errors.message.message}</p>}
                  </div>

                  <button type="submit"
                    disabled={submitStatus === 'loading' || submitStatus === 'success'}
                    className="btn-orange inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-60">
                    {submitStatus === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" />{t('form.submitting')}</>
                    ) : submitStatus === 'success' ? (
                      <><CheckCircle2 size={16} />{t('form.successMessage')}</>
                    ) : (
                      <><Send size={16} />{t('form.submit')}</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* ── RIGHT: Info ─────────────────────────────── */}
            <motion.div variants={slideRight} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }} className="flex flex-col gap-6">

              <div>
                <h2 className="mb-2 text-base font-extrabold uppercase tracking-wide text-white">{copy.infoTitle}</h2>
                <p className="text-sm leading-relaxed text-gray-400">
                  {copy.infoDescription}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {contactItems.map((item) => {
                  const card = (
                    <div key={item.label} className="glow-card flex items-center gap-4 rounded-xl p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)' }}>
                        <item.icon size={18} color="#00d4ff" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-white/85">{item.value}</p>
                      </div>
                    </div>
                  )

                  if (item.href) {
                    return (
                      <a key={item.label} href={item.href} className="block no-underline transition-opacity hover:opacity-80">
                        {card}
                      </a>
                    )
                  }
                  return card
                })}
              </div>

              {/* Map placeholder */}
              <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(3,7,18,0.9) 100%)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <div className="grid-dots absolute inset-0 opacity-60" />
                <div className="relative flex flex-col items-center gap-2 select-none">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.4)', boxShadow: '0 0 20px rgba(0,212,255,0.25)' }}>
                    <MapPin size={20} color="#00d4ff" strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">
                    {locale === 'en' ? 'Sao Paulo, SP' : 'São Paulo, SP'}
                  </span>
                </div>
                <div className="absolute h-24 w-24 rounded-full animate-ping" style={{ border: '1px solid rgba(0,212,255,0.12)' }} />
                <div className="absolute h-36 w-36 rounded-full animate-ping" style={{ border: '1px solid rgba(0,212,255,0.07)', animationDelay: '0.5s' }} />
              </div>

              {/* Social links */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">{copy.socialTitle}</p>
                <div className="flex items-center gap-3">
                  {resolvedSocialLinks.map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="group flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <Icon size={18} color="rgba(255,255,255,0.5)" strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}>
                <div className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: '#00d4ff', boxShadow: '0 0 8px rgba(0,212,255,0.9)', animation: 'glow-pulse 2s ease-in-out infinite' }} />
                <p className="text-xs text-gray-400">
                  {t('info.responseTime')}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}
