'use client'

import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/lib/i18n'

export default function FinalCta() {
  const t = useTranslations('finalCta')

  return (
    <section className="relative isolate overflow-hidden bg-[#0B0F14] py-24 sm:py-28">
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,15,20,0.88)_0%,rgba(11,15,20,0.76)_38%,rgba(11,15,20,0.58)_65%,rgba(11,15,20,0.72)_100%)] z-10" />
        <div className="absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          src="/videos/fundo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-white">
              {t('title')}
            </h2>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/78 max-w-2xl mx-auto">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contato"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold rounded-xl px-8 py-4 transition-all duration-200 text-sm shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_28px_rgba(59,130,246,0.55)]"
              >
                {t('primaryButton')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/servicos"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 font-medium rounded-xl px-8 py-4 transition-all duration-200 text-sm backdrop-blur-sm"
              >
                <PlayCircle className="w-4 h-4 text-white/50" />
                {t('secondaryButton')}
              </Link>
            </div>

            {/* Micro trust */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/65"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-white/60" />
              <span>{t('trust')}</span>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
