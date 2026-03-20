'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, KeyRound } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'

type ResetFormData = {
  password: string
  confirmPassword: string
}

export default function ResetPasswordPage() {
  const t = useTranslations('auth.reset')
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)

  const schema = z
    .object({
      password: z.string().min(8, t('errors.passwordMinLength')).max(200),
      confirmPassword: z.string().min(8, t('errors.passwordMinLength')).max(200),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('errors.passwordMismatch'),
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: ResetFormData) {
    setIsLoading(true)
    setServerError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: data.password })

      if (error) {
        setServerError(t('errors.unexpected'))
        return
      }

      setDone(true)
    } catch {
      setServerError(t('errors.unexpected'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-md"
    >
      <div className="glow-card isolate rounded-2xl p-8 backdrop-blur-sm">
        <div className="pointer-events-none relative z-0 mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              {done ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-300" />
              ) : (
                <KeyRound className="h-6 w-6 text-sky-300" />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {done ? t('successTitle') : t('title')}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            {done ? t('successDescription') : t('subtitle')}
          </p>
        </div>

        {done ? (
          <div className="text-center">
            <Link
              href="/login"
              className="btn-orange inline-flex rounded-xl px-6 py-3 text-sm"
            >
              {t('backToLogin')}
            </Link>
          </div>
        ) : (
          <>
            {serverError && (
              <div className="relative z-10 mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-20 space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-widest text-white/60"
                >
                  {t('password')}
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/25"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold uppercase tracking-widest text-white/60"
                >
                  {t('confirmPassword')}
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/25"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-orange flex h-11 w-full items-center justify-center rounded-xl text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? t('submitting') : t('submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  )
}
