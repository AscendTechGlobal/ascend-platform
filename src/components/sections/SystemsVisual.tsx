'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export default function SystemsVisual() {
  return (
    <section className="relative py-24 sm:py-36 overflow-hidden bg-[#0B0F14]">
      
      {/* 1. Background Video with precise positioning to respect container indent and fix zoom/resolution */}
      <div className="absolute inset-0 w-full h-full flex justify-center pointer-events-none z-0">
        <video
          src="/videos/dashboard-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full max-w-[1920px] object-cover sm:object-[15%_center] lg:object-[20%_center] object-center opacity-[0.85] md:opacity-90 mix-blend-screen bg-transparent"
        />
      </div>

      {/* 2. Gradient Overlay reversed to protect text on the Right and soften mobile edges */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0B0F14] via-[#0B0F14]/90 to-transparent w-full md:w-2/3 right-0 ml-auto z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14] z-10 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-transparent to-transparent z-10 opacity-40 sm:opacity-0" /> {/* Mobile left edge protect */}

      {/* 3. Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Empty Space for Grid Alignment on the Left so the video shines unhindered */}
          <div className="hidden lg:block pointer-events-none" />

          {/* Text Content shifted to the Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:pl-12 flex flex-col justify-center"
          >
            
            <h2 className="section-title mt-6 text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.1] text-white drop-shadow-lg">
              Transformamos processos complexos em sistemas <span className="highlight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">simples e escaláveis.</span>
            </h2>
            <p className="section-copy mt-6 text-xl sm:text-2xl text-white/90 font-medium drop-shadow-md">
              Menos esforço manual, mais controle, mais resultado.
            </p>

            <div className="mt-12">
              <Link href="/contato" className="btn-blue w-fit rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide inline-flex items-center">
                Estruturar Minha Base
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
