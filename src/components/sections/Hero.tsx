'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { SiteSettings } from '@/types'

export default function Hero({ settings }: { settings?: SiteSettings | null }) {
  return (
    <section className="relative overflow-hidden bg-[#0B0F14] min-h-[100dvh] flex items-center pt-20 pb-16 sm:pt-28">
      {/* Absolute Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Extra 40% darkness layer */}
        <video 
          src="/videos/hero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover sm:object-[80%_center] lg:object-right opacity-90"
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white/80">
              Ascend Tech Global | Engineering Growth Systems
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(3rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-white mb-6"
          >
            Tecnologia que transforma operação em <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#3B82F6]">
              lucro previsível.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-[1.3rem] leading-relaxed text-[#B0B7C3] max-w-2xl mb-10 font-normal"
          >
            Desenvolvimento de sistemas sob medida, automações inteligentes e infraestrutura de IA criadas para reduzir seus custos operacionais e escalar a produtividade do seu negócio.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
          >
            <Link 
              href="/contato" 
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-medium rounded-lg px-8 py-3.5 transition-all duration-200 text-[0.95rem] shadow-[0_4px_14px_0_rgba(59,130,246,0.39)]"
            >
              Solicitar Diagnóstico Gratuito
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/servicos" 
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium rounded-lg px-8 py-3.5 transition-all duration-200 text-[0.95rem] backdrop-blur-sm"
            >
              <PlayCircle className="w-5 h-5 text-white/70" />
              Ver Como Funciona
            </Link>
          </motion.div>

          {/* Social Proof / Bullets */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl pt-8 border-t border-white/10"
          >
            {[
              "Automações sob medida",
              "Integração com IA e APIs",
              "Foco em geração de receita"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-[#B0B7C3] tracking-wide">{bullet}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

