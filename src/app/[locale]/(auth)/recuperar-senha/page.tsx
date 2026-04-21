'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, ArrowLeft, Send } from 'lucide-react'
import { Link } from '@/i18n/navigation'
type RecoveryFormData = {
  email: string
}

export default function RecuperarSenhaPage() {
  const t = useTranslations('auth.recovery')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const recoverySchema = z.object({
    email: z
      .string()
      .min(1, t('errors.emailRequired'))
      .email(t('errors.emailInvalid')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
  })

  const onSubmit = async (data: RecoveryFormData) => {
    setIsLoading(true)
    setServerError(null)

    try {
      const response = await fetch('/api/auth/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          locale,
          origin: window.location.origin,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        setServerError(result?.error ?? t('errors.unexpected'))
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setServerError(t('errors.unexpected'))
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="glow-card isolate rounded-2xl p-8 backdrop-blur-sm">
        {/* Logo */}
        <div className="pointer-events-none relative z-0 mb-8 text-center select-none">
          <div className="mb-3 inline-flex items-center justify-center">
            <span
              className="text-xs font-bold tracking-[0.35em] uppercase"
              style={{ color: '#00d4ff' }}
            >
              ASCEND
            </span>
            <span className="mx-2 h-3 w-px bg-white/20" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
              TECH GLOBAL
            </span>
          </div>
          <div className="gradient-line mx-auto w-24" />
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* ── Success State ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 py-4 text-center"
            >
              <div className="mb-5 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">
                {t('successTitle')}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-white/55">
                {t('successDescription')}
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: '#00d4ff' }}
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToLogin')}
              </Link>
            </motion.div>
          ) : (
            /* ── Form State ── */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Heading */}
              <div className="pointer-events-none relative z-0 mb-7 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/8">
                    <Mail className="h-6 w-6" style={{ color: '#00d4ff' }} />
                  </div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {t('title')}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {t('subtitle')}
                </p>
              </div>

              {/* Error message */}
              {serverError && status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <p className="text-sm text-red-400">{serverError}</p>
                </motion.div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="relative z-20 space-y-5"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-widest text-white/60"
                  >
                    {t('email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3.5 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#00d4ff]/60 focus:ring-2 focus:ring-[#00d4ff]/20"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-blue flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t('submit')}
                    </>
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="relative z-10 mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: '#00d4ff' }}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t('backToLogin')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
