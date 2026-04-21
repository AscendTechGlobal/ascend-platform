import re

filepath = '/home/weber/WEBER/PROJETOS/ASCEND TECH GLOBAL/ascend-web/src/components/sections/SystemsVisual.tsx'

content = """'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SystemsVisual() {
  return (
    <section className="section-shell relative py-32 sm:py-48 bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)] overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 w-full h-full opacity-40">
        <div 
          className="w-full h-full bg-[url('/images/dashboard.png')] bg-cover bg-center md:bg-[center_right_-10rem] bg-no-repeat" 
        />
        {/* Horizontal Dark Fade Overlay (Left to Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1720] via-[#0F1720]/80 to-transparent" />
        
        {/* Soft edge blur (Top & Bottom borders melt into the main structure) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14] via-transparent to-[#0B0F14]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow !border-blue-500/20 !bg-blue-500/10 !text-blue-400">A Infraestrutura Invisível</span>
            <h2 className="section-title mt-6 text-[clamp(2.2rem,4vw,3.5rem)] leading-tight text-white drop-shadow-lg">
              A base da sua <span className="highlight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Escalabilidade</span>
            </h2>
            <p className="section-copy mt-6 text-lg sm:text-lg text-white/90 font-medium drop-shadow-md">
              Não adianta investir em vendas se o back-office quebra com o aumento de entrega. Estruturamos os bastidores da sua empresa para suportar crescimento agressivo sem histeria operacional.
            </p>

            <ul className="mt-8 space-y-5">
              {[
                'Arquiteturas modernas e conectadas via APIs',
                'Painéis gerenciais em tempo real com dados unificados',
                'Automação de ponta a ponta tirando gargalos das equipes'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-white">
                  <div className="bg-blue-500/20 rounded-full p-1 border border-blue-500/30">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                  </div>
                  <span className="text-[1.05rem] leading-snug font-medium drop-shadow-md">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-14">
              <Link href="/contato" className="btn-blue w-fit rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide">
                Estruturar Minha Base
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Empty Space Block for Grid Alignment to ensure background glows unhindered */}
          <div className="hidden lg:block pointer-events-none" />

        </div>
      </div>
    </section>
  )
}
"""

with open(filepath, 'w') as f:
    f.write(content)

print("SystemsVisual overwritten layout.")
