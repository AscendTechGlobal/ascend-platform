'use client'

import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Github,
  MessageCircle,
} from 'lucide-react'
import { useTranslations } from '@/lib/i18n'
import type { SiteSettings } from '@/types'
import BrandWordmark from '@/components/layout/BrandWordmark'
import {
  formatWhatsAppLink,
  normalizeEmail,
  normalizeExternalUrl,
  normalizePhone,
  normalizeText,
} from '@/lib/utils'

type SocialItem = {
  icon: typeof Linkedin
  label: string
  href: string
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  )
}

function getMailtoHref(email: string) {
  return `mailto:${email}`
}

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/\D/g, '')}`
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/42">
        {title}
      </h3>
      {children}
    </div>
  )
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  const classes = 'text-sm text-white/58 transition-colors duration-200 hover:text-white'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

function WhatsAppFAB({ ariaLabel, href }: { ariaLabel: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-[linear-gradient(135deg,#0ea5e9_0%,#8b5cf6_55%,#ec4899_100%)] text-white shadow-[0_18px_36px_rgba(88,28,135,0.34)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_46px_rgba(88,28,135,0.42)]"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('footer')
  const email = normalizeEmail(settings?.email) || 'contato@ascendtech.com.br'
  const phone = normalizePhone(settings?.phone) || '+55 (11) 9 0000-0000'
  const whatsappNumber = normalizePhone(settings?.whatsapp_number) || '5511900000000'
  const whatsappHref = formatWhatsAppLink(whatsappNumber)
  const footerText = normalizeText(settings?.footer_text)
  const social = settings?.social_links ?? {}

  const contato = [
    {
      icon: Mail,
      label: email,
      href: getMailtoHref(email),
    },
    {
      icon: Phone,
      label: phone,
      href: getPhoneHref(phone),
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: whatsappHref,
      whatsapp: true,
    },
  ]

  const redes = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: normalizeExternalUrl(social.linkedin),
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: normalizeExternalUrl(social.instagram),
    },
    {
      icon: Github,
      label: 'GitHub',
      href: normalizeExternalUrl(social.github),
    },
  ].filter((item): item is SocialItem => Boolean(item.href))

  const empresa = [
    { label: t('links.about'), href: '/sobre' },
    { label: t('links.services'), href: '/servicos' },
    { label: t('links.portfolio'), href: '/portfolio' },
    { label: t('links.blog'), href: '/blog' },
  ]

  const servicos = [
    { label: t('serviceLinks.consulting'), href: '/servicos#consulting' },
    { label: t('serviceLinks.software'), href: '/servicos#software' },
    { label: t('serviceLinks.cyber'), href: '/servicos#cybersecurity' },
    { label: t('serviceLinks.cloud'), href: '/servicos#cloud' },
  ]

  return (
    <>
      <WhatsAppFAB ariaLabel={t('whatsappAria')} href={whatsappHref} />

      <footer className="relative overflow-hidden pb-6 pt-10 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,0.1),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(139,92,246,0.1),transparent_28%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glow-card rounded-[2rem] p-8 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
            >
              <div>
                <Link href="/" className="inline-flex items-center gap-3 select-none">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04)),linear-gradient(135deg,#0ea5e9_0%,#8b5cf6_52%,#ec4899_100%)] text-white shadow-[0_12px_30px_rgba(88,28,135,0.22)]">
                    <ArrowUpIcon className="h-5 w-5" />
                  </span>
                  <BrandWordmark className="text-xl" />
                </Link>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
                  {t('tagline')}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/42">
                  Digital Partner
                </p>
                <p className="mt-2 text-sm text-white/78">
                  Premium delivery for global-ready technology products.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="grid gap-10 border-t border-white/8 pt-10 sm:grid-cols-2 lg:grid-cols-4"
            >
              <FooterColumn title={t('company')}>
                <ul className="flex flex-col gap-3">
                  {empresa.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterColumn>

              <FooterColumn title={t('services')}>
                <ul className="flex flex-col gap-3">
                  {servicos.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterColumn>

              <FooterColumn title={t('contact')}>
                <ul className="flex flex-col gap-3">
                  {contato.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.whatsapp ? '_blank' : undefined}
                        rel={item.whatsapp ? 'noopener noreferrer' : undefined}
                        className="relative z-10 flex items-center gap-3 text-sm text-white/58 transition-colors duration-200 hover:text-white"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </FooterColumn>

              <FooterColumn title={t('social')}>
                <ul className="flex flex-col gap-3">
                  {redes.map((item) => (
                    <li key={item.label}>
                      <FooterLink href={item.href} external>
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
                            <item.icon className="h-4 w-4" />
                          </span>
                          <span>{item.label}</span>
                        </span>
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </motion.div>

            <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-center sm:flex-row sm:text-left">
              <p className="text-xs text-white/34">
                {footerText || `© ${currentYear} Ascend Tech Global. ${t('copyright')}`}
              </p>
              <p className="text-xs text-white/34">
                {t('madeBy')} <span className="font-medium text-white/62">{t('madeByHighlight')}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
