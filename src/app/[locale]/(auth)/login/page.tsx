'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
type LoginFormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations('auth.login')
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t('errors.emailRequired'))
      .email(t('errors.emailInvalid')),
    password: z
      .string()
      .min(1, t('errors.passwordRequired'))
      .min(6, t('errors.passwordMinLength')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setServerError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        setServerError(result?.error ?? t('errors.unexpected'))
        return
      }

      router.replace('/admin')
      router.refresh()
    } catch {
      setServerError(t('errors.unexpected'))
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

        {/* Heading */}
        <div className="pointer-events-none relative z-0 mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {t('subtitle')}
          </p>
        </div>

        {/* Error message */}
        {serverError && (
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-20 space-y-5">
          {/* Email */}
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
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-widest text-white/60"
            >
              {t('password')}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3.5 pr-11 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#00d4ff]/60 focus:ring-2 focus:ring-[#00d4ff]/20"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t('password') : t('password')}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-white/40 transition-colors hover:text-white/70"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/recuperar-senha"
              className="text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: '#00d4ff' }}
            >
              {t('forgotPassword')}
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-blue relative flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t('submitting')}
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                {t('submit')}
              </>
            )}
          </button>
        </form>

        {/* Back to site */}
          <div className="relative z-10 mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-white/30 transition-colors hover:text-white/55"
          >
            {t('backToSite')}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
