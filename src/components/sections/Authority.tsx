'use client'

import { motion } from 'framer-motion'
import { Server, ShieldCheck, Zap } from 'lucide-react'

export default function Authority() {
  return (
    <section className="section-shell bg-[linear-gradient(to_bottom,#0B0F14_0%,#0F1720_8%,#0F1720_92%,#0B0F14_100%)] relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="section-title mt-6 max-w-3xl mx-auto text-4xl">
          Tecnologia projetada para escala, segurança e <span className="highlight">alta performance</span>
        </h2>
        <p className="section-copy mt-6 max-w-2xl mx-auto">
          Pare de improvisar com soluções frágeis. Trabalhe com uma base sólida, segura e escalável.
        </p>

        <div className="grid gap-6 sm:grid-cols-3 mt-16">
          {[
            {
              icon: Zap,
              metric: '99.9%',
              label: 'Uptime e Disponibilidade',
              desc: 'Infraestrutura estável que mantém sua operação rodando sem interrupções.'
            },
            {
              icon: ShieldCheck,
              metric: 'Criptografia',
              label: 'End-to-End',
              desc: 'Seus dados protegidos com padrão de segurança de nível global.'
            },
            {
              icon: Server,
              metric: '< 50ms',
              label: 'Latência de Integração',
              desc: 'Comunicação em tempo real entre sistemas, sem gargalos.'
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="mono-card border border-white/5 rounded-2xl p-8 flex flex-col items-center shadow-lg group hover:border-white/10 transition-colors"
            >
              <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/25 blur-xl rounded-full group-hover:bg-blue-400/40 transition-colors duration-500" />
                <div className="relative h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-white text-transparent bg-clip-text mb-2 tracking-tight">{item.metric}</h3>
              <p className="font-semibold text-white mb-3 text-lg">{item.label}</p>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
