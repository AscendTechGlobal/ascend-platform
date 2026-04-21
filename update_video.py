filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components/sections/SystemsVisual.tsx'

content = """'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export default function SystemsVisual() {
  return (
    <section className="relative py-32 sm:py-48 overflow-hidden bg-[#0B0F14]">
      
      {/* 1. Background Video with high visibility replacing static image */}
      <video
        src="/videos/dashboard-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[center_left] md:object-center opacity-[0.85] z-0"
      />

      {/* 2. Gradient Overlay reversed to protect text on the Right */}
      {/* Fade from right to left */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0B0F14] via-[#0B0F14]/90 to-transparent w-full md:w-3/4 right-0 ml-auto z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14] z-10" />

      {/* 3. Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Empty Space for Grid Alignment on the Left so the video shines unhindered */}
          <div className="hidden lg:block pointer-events-none" />

          {/* Text Content shifted to the Right - Shortened to emphasize video */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:pl-8 flex flex-col justify-center"
          >
            <span className="eyebrow !border-blue-500/20 !bg-blue-500/10 !text-blue-400">A Infraestrutura Invisível</span>
            <h2 className="section-title mt-6 text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.1] text-white drop-shadow-lg">
              Transformamos processos complexos em sistemas <span className="highlight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">simples e escaláveis.</span>
            </h2>
            <p className="section-copy mt-6 text-xl sm:text-2xl text-white/90 font-medium drop-shadow-md">
              Menos esforço manual, mais controle, mais resultado.
            </p>

            <div className="mt-14">
              <Link href="/contato" className="btn-blue w-fit rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide">
                Estruturar Minha Base
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
"""

with open(filepath, 'w') as f:
    f.write(content)

print("SystemsVisual updated with video and removed list.")
