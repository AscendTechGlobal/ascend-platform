'use client'

import { motion } from 'framer-motion'
import { Search, Code, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico & Arquitetura',
    description: 'Mapeamos sua operação atual, identificamos os gargalos (onde o dinheiro e o tempo estão vazando) e desenhamos a arquitetura do sistema ideal.'
  },
  {
    number: '02',
    icon: Code,
    title: 'Desenvolvimento e Integração',
    description: 'Construímos soluções sob medida e conectamos suas ferramentas existentes via APIs, criando um ecossistema único sem fricção.'
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Automação & Escala',
    description: 'Com o sistema rodando, tarefas braçais desaparecem. O time foca no estratégico e sua empresa ganha capacidade para multiplicar o faturamento.'
  }
]

export default function ProcessSteps() {
  return (
    <section className="section-shell bg-[#0B0F14] relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          
          <h2 className="section-title mt-6 text-4xl">Do zero à <span className="highlight">Escala</span> em 3 passos</h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-12 left-[28px] md:left-1/2 md:-translate-x-1/2 w-0.5 h-[calc(100%-100px)] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 hidden sm:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Text Content */}
                <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:text-left text-left' : 'md:text-right text-left'}`}>
                  <h3 className="text-2xl font-semibold text-white mb-4"><span className="text-blue-500 mr-2">{step.number}.</span> {step.title}</h3>
                  <p className="text-white/60 leading-relaxed max-w-md ml-0 md:ml-auto md:mr-0 inline-block text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Central Icon */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-[#0B0F14] bg-blue-500/10 items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)] z-10 backdrop-blur-md">
                  <step.icon className="h-5 w-5 text-blue-400" />
                </div>

                {/* Mobile Icon (Only shows on mobile, aligned with text) */}
                <div className="md:hidden w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center shrink-0 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                   <step.icon className="h-5 w-5 text-blue-400" />
                </div>

                {/* Empty Space for Grid Alignment */}
                <div className="md:w-1/2 hidden md:block" />

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
