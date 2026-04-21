'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Clock, TrendingDown, Network } from 'lucide-react'

const painPoints = [
  {
    icon: Clock,
    title: 'Processos Manuais Lentos',
    description: 'Equipes perdem horas em tarefas repetitivas e planilhas instáveis que poderiam ser 100% automatizadas.'
  },
  {
    icon: TrendingDown,
    title: 'Ineficiência Operacional',
    description: 'A falta de processos sistêmicos claros gera retrabalho constante, erros humanos e perda de margem de lucro.'
  },
  {
    icon: AlertCircle,
    title: 'Limitação de Escala',
    description: 'Sua empresa não consegue absorver o dobro de clientes sem ter que contratar proporcionalmente mais braços.'
  },
  {
    icon: Network,
    title: 'Sistemas Desconectados',
    description: 'Dados isolados em diferentes plataformas forçam a tomada de decisão no escuro, baseada em "achismo".'
  }
]

export default function PainPoints() {
  return (
    <section className="section-shell bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)] relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          
          <h2 className="section-title mt-6 text-[clamp(2rem,4vw,3rem)]">
            A sua operação está focada em crescer ou <span className="highlight !bg-gradient-to-r !from-red-400 !to-orange-500 text-transparent bg-clip-text font-bold">presa no operacional?</span>
          </h2>
          <p className="section-copy mt-6 text-lg max-w-2xl mx-auto text-white/50">
            A maioria das empresas estagna porque a base da operação depende inteiramente de gestão humana braçal, gerando falhas operacionais logo quando a demanda tenta aumentar.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="premium-panel flex flex-col items-start rounded-[1.8rem] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-red-500/20 bg-red-500/10 text-red-400 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <item.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
