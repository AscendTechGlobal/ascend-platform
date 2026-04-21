'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/lib/i18n'
import {
  Lightbulb,
  Code2,
  Bot,
  ArrowRightLeft,
  Shield,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Search,
  Wrench,
  PackageCheck,
} from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const baseServices = [
  {
    id: 'automation',
    icon: Lightbulb,
    title: 'AUTOMAÇÃO',
    titleHighlight: 'DE PROCESSOS',
    tagline: 'Elimine tarefas manuais e ganhe eficiência',
    description:
      'Automatizamos processos repetitivos, integrações e rotinas operacionais para reduzir erros, economizar tempo e aumentar a produtividade da sua operação.',
    features: [
      'Automação de tarefas repetitivas',
      'Integração entre sistemas e ferramentas',
      'Redução de retrabalho operacional',
      'Padronização de processos',
      'Aumento de produtividade da equipe',
      'Fluxos automatizados sob medida',
    ],
    color: '#00d4ff',
  },
  {
    id: 'systems',
    icon: Code2,
    title: 'DESENVOLVIMENTO',
    titleHighlight: 'DE SISTEMAS',
    tagline: 'Software sob medida para sua operação',
    description:
      'Criamos sistemas personalizados, dashboards e plataformas adaptadas à realidade do seu negócio, com foco em eficiência, controle e escalabilidade.',
    features: [
      'Sistemas web sob medida',
      'Dashboards e painéis de controle',
      'APIs e integrações personalizadas',
      'Centralização de informações',
      'Arquitetura escalável',
      'Soluções orientadas à operação real',
    ],
    color: '#3B82F6',
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'INTELIGÊNCIA',
    titleHighlight: 'ARTIFICIAL',
    tagline: 'IA aplicada ao seu negócio',
    description:
      'Integramos inteligência artificial aos seus processos para automatizar decisões, atendimento e análise de dados, gerando ganho real de produtividade.',
    features: [
      'Automação com IA',
      'Chatbots inteligentes',
      'Análise de dados automatizada',
      'Geração de conteúdo com IA',
      'Otimização de processos com IA',
      'Integração com ferramentas existentes',
    ],
    color: '#00d4ff',
  },
  {
    id: 'integrations',
    icon: ArrowRightLeft,
    title: 'INTEGRAÇÕES',
    titleHighlight: 'E APIS',
    tagline: 'Conecte seus sistemas e elimine retrabalho',
    description:
      'Conectamos sistemas, ferramentas e plataformas para criar fluxos contínuos de informação, reduzindo erros e aumentando a eficiência operacional.',
    features: [
      'Integração entre plataformas',
      'APIs personalizadas',
      'Sincronização de dados',
      'Automação entre sistemas',
      'Eliminação de duplicidade',
      'Fluxos operacionais integrados',
    ],
    color: '#3B82F6',
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    title: 'CIBERSEGURANÇA',
    titleHighlight: 'E AUDITORIA',
    tagline: 'Proteção e auditoria para sua operação',
    description:
      'Analisamos sistemas, identificamos vulnerabilidades e implementamos práticas de segurança para proteger dados, reduzir riscos e garantir conformidade.',
    features: [
      'Análise de vulnerabilidades',
      'Auditoria de segurança',
      'Hardening de sistemas',
      'Proteção de dados',
      'Conformidade e boas práticas',
      'Redução de riscos operacionais',
    ],
    color: '#7dd3fc',
  },
]

const baseProcessSteps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description:
      'Entendemos sua operação, identificamos gargalos e mapeamos onde a tecnologia pode gerar mais impacto.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Estratégia',
    description:
      'Estruturamos a melhor solução com escopo claro, prioridades definidas e visão de resultado.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Implementação',
    description:
      'Executamos o projeto com método, transparência e foco em eficiência operacional.',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Evolução',
    description:
      'Após a entrega, sua solução pode continuar evoluindo com ajustes, integrações e melhorias contínuas.',
  },
]

const baseFaqs = [
  {
    question: 'Qual serviço faz mais sentido para a minha empresa hoje?',
    answer:
      'Isso depende do estágio da sua operação e do tipo de gargalo que precisa ser resolvido. Em nosso diagnóstico, avaliamos processos, ferramentas, fluxo de dados e prioridades para indicar a solução com maior potencial de impacto.',
  },
  {
    question: 'Vocês atuam apenas com desenvolvimento ou também com automação e IA?',
    answer:
      'Atuamos de forma ampla. Desenvolvemos sistemas sob medida, automatizamos operações, aplicamos inteligência artificial, conectamos plataformas via APIs e também executamos frentes de segurança e auditoria.',
  },
  {
    question: 'É possível integrar as soluções com sistemas que já usamos hoje?',
    answer:
      'Sim. Nosso trabalho parte da realidade da sua operação. Sempre que faz sentido, integramos ERPs, CRMs, plataformas internas, ferramentas comerciais e fluxos já existentes para evitar retrabalho e preservar o que já funciona.',
  },
  {
    question: 'Quanto tempo leva para implementar uma solução?',
    answer:
      'O prazo varia conforme escopo, complexidade e integrações envolvidas. Há projetos mais enxutos que podem ser entregues em poucas semanas e operações mais robustas que exigem uma implementação faseada. Trabalhamos com escopo claro e previsibilidade de entrega.',
  },
  {
    question: 'Vocês oferecem suporte e evolução após a entrega?',
    answer:
      'Sim. Podemos continuar evoluindo a solução com melhorias, novas integrações, ajustes operacionais, manutenção e reforço de segurança para acompanhar o crescimento do seu negócio.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${open ? 'rgba(0,212,255,0.25)' : 'rgba(0,212,255,0.1)'}`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white">{question}</span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-300"
          style={{ color: '#00d4ff', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServicosContent() {
  const locale = useLocale()
  const tc = useTranslations('common')
  const copy =
    locale === 'en'
      ? {
          page: 'Services',
          heroEyebrow: 'What We Do',
          heroTitle: 'SOLUTIONS',
          heroHighlight: 'THAT SCALE',
          heroDescription: 'We structure operations with automation, software, artificial intelligence and security for companies that need to grow with efficiency, control and scale.',
          processEyebrow: 'Our Process',
          processTitle: 'HOW WE',
          processHighlight: 'OPERATE',
          processDescription: 'A clear delivery model designed to diagnose the operation, define priorities and execute with business focus.',
          faqEyebrow: 'Frequently Asked Questions',
          faqTitle: 'FAQ - CLEAR YOUR',
          faqHighlight: 'DOUBTS',
          ctaEyebrow: 'Ready to move forward?',
          ctaTitle: 'YOUR OPERATION CAN',
          ctaHighlight: 'DELIVER MORE',
          ctaDescription: 'Request a strategic conversation and discover how to automate processes, organize your operation and build a technology foundation ready to grow.',
          ctaButton: 'Request assessment',
          services: [
            { ...baseServices[0], title: 'PROCESS', titleHighlight: 'AUTOMATION', tagline: 'Eliminate manual work and gain efficiency', description: 'We automate repetitive processes, integrations and operational routines to reduce errors, save time and increase team productivity.', features: ['Automation of repetitive tasks', 'Integration across systems and tools', 'Reduction of operational rework', 'Process standardization', 'Higher team productivity', 'Tailored automated workflows'] },
            { ...baseServices[1], title: 'SYSTEMS', titleHighlight: 'DEVELOPMENT', tagline: 'Custom software for your operation', description: 'We build custom systems, dashboards and platforms tailored to your business reality, focused on efficiency, control and scalability.', features: ['Custom web systems', 'Dashboards and control panels', 'Custom APIs and integrations', 'Information centralization', 'Scalable architecture', 'Solutions built for real operations'] },
            { ...baseServices[2], title: 'APPLIED', titleHighlight: 'AI', tagline: 'AI applied to your business', description: 'We integrate artificial intelligence into your workflows to automate decisions, service and data analysis, generating real productivity gains.', features: ['AI-powered automation', 'Intelligent chatbots', 'Automated data analysis', 'AI content generation', 'Process optimization with AI', 'Integration with existing tools'] },
            { ...baseServices[3], title: 'INTEGRATIONS', titleHighlight: 'AND APIS', tagline: 'Connect your systems and eliminate rework', description: 'We connect systems, tools and platforms to create continuous information flows, reducing errors and improving operational efficiency.', features: ['Platform-to-platform integration', 'Custom APIs', 'Data synchronization', 'Automation between systems', 'Removal of duplicated work', 'Integrated operational flows'] },
            { ...baseServices[4], title: 'CYBERSECURITY', titleHighlight: 'AND AUDIT', tagline: 'Protection and audit for your operation', description: 'We assess systems, identify vulnerabilities and implement security practices to protect data, reduce risks and support compliance.', features: ['Vulnerability assessment', 'Security auditing', 'System hardening', 'Data protection', 'Compliance and best practices', 'Reduction of operational risks'] },
          ],
          processSteps: [
            { ...baseProcessSteps[0], title: 'Assessment', description: 'We understand your operation, identify bottlenecks and map where technology can generate the highest impact.' },
            { ...baseProcessSteps[1], title: 'Strategy', description: 'We structure the best solution with clear scope, defined priorities and an outcome-driven view.' },
            { ...baseProcessSteps[2], title: 'Implementation', description: 'We execute the project with method, transparency and focus on operational efficiency.' },
            { ...baseProcessSteps[3], title: 'Evolution', description: 'After delivery, your solution can keep evolving with adjustments, integrations and continuous improvements.' },
          ],
          faqs: [
            { question: 'Which service is the best fit for my company right now?', answer: 'That depends on your current operation and the bottlenecks that need to be solved. In our assessment, we review processes, tools, data flow and priorities to recommend the solution with the highest business impact.' },
            { question: 'Do you only build software, or do you also handle automation and AI?', answer: 'We work across the full operation stack. That includes custom systems, workflow automation, applied AI, API integrations and cybersecurity initiatives, depending on what the business actually needs.' },
            { question: 'Can you integrate with the systems we already use?', answer: 'Yes. Our work starts from your current reality. Whenever it makes sense, we integrate ERPs, CRMs, internal tools and existing operational platforms to avoid rework and preserve what is already working.' },
            { question: 'How long does it take to implement a solution?', answer: 'Timing varies according to scope, complexity and number of integrations involved. Some projects can be delivered in a few weeks, while more robust operations require phased implementation with clear milestones.' },
            { question: 'Do you offer support and evolution after delivery?', answer: 'Yes. We can keep evolving the solution with improvements, new integrations, operational adjustments, maintenance and security reinforcement as your business grows.' },
          ],
        }
      : locale === 'es'
        ? {
            page: 'Servicios',
            heroEyebrow: 'Lo Que Hacemos',
            heroTitle: 'SOLUCIONES',
            heroHighlight: 'QUE ESCALAN',
            heroDescription: 'Estructuramos operaciones con automatización, software, inteligencia artificial y seguridad para empresas que necesitan crecer con eficiencia, control y escala.',
            processEyebrow: 'Nuestro Proceso',
            processTitle: 'COMO',
            processHighlight: 'OPERAMOS',
            processDescription: 'Un modelo claro de entrega para diagnosticar la operación, definir prioridades y ejecutar con foco en resultado.',
            faqEyebrow: 'Preguntas Frecuentes',
            faqTitle: 'FAQ - RESUELVA SUS',
            faqHighlight: 'DUDAS',
            ctaEyebrow: 'Listo para avanzar?',
            ctaTitle: 'SU OPERACIÓN PUEDE',
            ctaHighlight: 'RENDIR MÁS',
            ctaDescription: 'Solicite una conversación estratégica y descubra cómo automatizar procesos, organizar su operación y crear una base tecnológica lista para crecer.',
            ctaButton: 'Solicitar diagnóstico',
            services: [
              { ...baseServices[0], title: 'AUTOMATIZACIÓN', titleHighlight: 'DE PROCESOS', tagline: 'Elimine tareas manuales y gane eficiencia', description: 'Automatizamos procesos repetitivos, integraciones y rutinas operativas para reducir errores, ahorrar tiempo y aumentar la productividad de su operación.', features: ['Automatización de tareas repetitivas', 'Integración entre sistemas y herramientas', 'Reducción de retrabajo operativo', 'Estandarización de procesos', 'Más productividad para el equipo', 'Flujos automatizados a medida'] },
              { ...baseServices[1], title: 'DESARROLLO', titleHighlight: 'DE SISTEMAS', tagline: 'Software a medida para su operación', description: 'Creamos sistemas personalizados, dashboards y plataformas adaptadas a la realidad de su negocio, con foco en eficiencia, control y escalabilidad.', features: ['Sistemas web a medida', 'Dashboards y paneles de control', 'APIs e integraciones personalizadas', 'Centralización de información', 'Arquitectura escalable', 'Soluciones orientadas a la operación real'] },
              { ...baseServices[2], title: 'INTELIGENCIA', titleHighlight: 'ARTIFICIAL', tagline: 'IA aplicada a su negocio', description: 'Integramos inteligencia artificial en sus procesos para automatizar decisiones, atención y análisis de datos, generando ganancias reales de productividad.', features: ['Automatización con IA', 'Chatbots inteligentes', 'Análisis de datos automatizado', 'Generación de contenido con IA', 'Optimización de procesos con IA', 'Integración con herramientas existentes'] },
              { ...baseServices[3], title: 'INTEGRACIONES', titleHighlight: 'Y APIS', tagline: 'Conecte sus sistemas y elimine retrabajo', description: 'Conectamos sistemas, herramientas y plataformas para crear flujos continuos de información, reduciendo errores y aumentando la eficiencia operativa.', features: ['Integración entre plataformas', 'APIs personalizadas', 'Sincronización de datos', 'Automatización entre sistemas', 'Eliminación de duplicidades', 'Flujos operativos integrados'] },
              { ...baseServices[4], title: 'CIBERSEGURIDAD', titleHighlight: 'Y AUDITORÍA', tagline: 'Protección y auditoría para su operación', description: 'Analizamos sistemas, identificamos vulnerabilidades e implementamos prácticas de seguridad para proteger datos, reducir riesgos y garantizar cumplimiento.', features: ['Análisis de vulnerabilidades', 'Auditoría de seguridad', 'Hardening de sistemas', 'Protección de datos', 'Cumplimiento y buenas prácticas', 'Reducción de riesgos operativos'] },
            ],
            processSteps: [
              { ...baseProcessSteps[0], title: 'Diagnóstico', description: 'Entendemos su operación, identificamos cuellos de botella y mapeamos dónde la tecnología puede generar más impacto.' },
              { ...baseProcessSteps[1], title: 'Estrategia', description: 'Estructuramos la mejor solución con alcance claro, prioridades definidas y visión de resultado.' },
              { ...baseProcessSteps[2], title: 'Implementación', description: 'Ejecutamos el proyecto con método, transparencia y foco en eficiencia operativa.' },
              { ...baseProcessSteps[3], title: 'Evolución', description: 'Después de la entrega, su solución puede seguir evolucionando con ajustes, integraciones y mejoras continuas.' },
            ],
            faqs: [
              { question: 'Qué servicio tiene más sentido para mi empresa hoy?', answer: 'Eso depende del momento de su operación y del tipo de cuello de botella que necesita resolver. En el diagnóstico evaluamos procesos, herramientas, flujo de datos y prioridades para indicar la solución con mayor potencial de impacto.' },
              { question: 'Solo desarrollan software o también trabajan con automatización e IA?', answer: 'Trabajamos de forma amplia sobre la operación. Eso incluye sistemas a medida, automatización de procesos, IA aplicada, integraciones vía API y frentes de ciberseguridad, según lo que el negocio realmente necesite.' },
              { question: 'Pueden integrar las soluciones con los sistemas que ya usamos?', answer: 'Sí. Nuestro trabajo parte de la realidad actual de su empresa. Siempre que tenga sentido, integramos ERPs, CRMs, herramientas internas y plataformas operativas para evitar retrabajo y aprovechar lo que ya funciona.' },
              { question: 'Cuánto tiempo lleva implementar una solución?', answer: 'El plazo varía según alcance, complejidad e integraciones involucradas. Hay proyectos más directos que pueden implementarse en pocas semanas y operaciones más robustas que requieren una ejecución por fases con hitos claros.' },
              { question: 'Ofrecen soporte y evolución después de la entrega?', answer: 'Sí. Podemos seguir evolucionando la solución con mejoras, nuevas integraciones, ajustes operativos, mantenimiento y refuerzo de seguridad a medida que el negocio crece.' },
            ],
          }
        : {
            page: 'Serviços',
            heroEyebrow: 'O Que Fazemos',
            heroTitle: 'SOLUÇÕES',
            heroHighlight: 'QUE ESCALAM',
            heroDescription: 'Estruturamos operações com automação, software, inteligência artificial e segurança para empresas que precisam crescer com eficiência, controle e escala.',
            processEyebrow: 'Nosso Processo',
            processTitle: 'COMO',
            processHighlight: 'ESTRUTURAMOS',
            processDescription: 'Um modelo de entrega claro para entender a operação, definir prioridades e executar com foco em resultado.',
            faqEyebrow: 'Perguntas Frequentes',
            faqTitle: 'FAQ - TIRE SUAS',
            faqHighlight: 'DÚVIDAS',
            ctaEyebrow: 'Pronto para avançar?',
            ctaTitle: 'SUA OPERAÇÃO PODE',
            ctaHighlight: 'RENDER MAIS',
            ctaDescription: 'Solicite uma conversa estratégica e descubra como automatizar processos, organizar sua operação e criar uma base tecnológica preparada para crescer.',
            ctaButton: 'Solicitar diagnóstico',
            services: baseServices,
            processSteps: baseProcessSteps,
            faqs: baseFaqs,
          }
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.18) 0%, transparent 70%)' }}
        />
        <div className="stars pointer-events-none absolute inset-0" />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40"
          >
            <Link href="/" className="hover:text-white/70 transition-colors">{tc('home')}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient">{copy.page}</span>
          </motion.nav>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-gradient mb-4 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.heroEyebrow}
            </motion.p>
            <motion.h1 variants={fadeUp} className="section-title mb-6">
              {copy.heroTitle} <span className="highlight">{copy.heroHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-white/60">
              {copy.heroDescription}
            </motion.p>
          </motion.div>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }} />
      </section>

      {/* ── SERVICE CARDS ─────────────────────────────────── */}
      <section className="relative py-20" style={{ backgroundColor: '#060d1a' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)' }} />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 md:grid-cols-2"
          >
            {copy.services.map(({ id, icon: Icon, title, titleHighlight, tagline, description, features, color }) => (
              <motion.div
                key={id}
                id={id}
                variants={fadeUp}
                className="glow-card rounded-2xl p-8 flex flex-col gap-6"
                style={{ borderColor: `${color}22`, background: `linear-gradient(135deg, ${color}06 0%, transparent 60%)` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `radial-gradient(circle, ${color}22 0%, ${color}08 100%)`,
                      border: `1px solid ${color}44`,
                      boxShadow: `0 0 24px ${color}18`,
                    }}
                  >
                    <Icon size={28} color={color} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{tagline}</p>
                    <h2 className="mt-1 text-lg font-extrabold uppercase tracking-wide text-white">
                      {title} <span style={{ color }}>{titleHighlight}</span>
                    </h2>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-400">{description}</p>

                <div className="h-px w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}33, transparent)` }} />

                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" color={color} strokeWidth={2} />
                      <span className="text-xs leading-snug text-gray-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contato"
                  className="btn-blue-outline mt-auto inline-flex w-fit items-center gap-2 rounded-lg px-6 py-2.5 text-xs"
                  style={{ borderColor: `${color}50`, color }}
                >
                  {tc('requestQuote')}
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="relative py-20" style={{ backgroundColor: '#030712' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.04) 0%, transparent 55%)' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14 text-center"
          >
            <p className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.processEyebrow}
            </p>
            <h2 className="section-title">{copy.processTitle} <span className="highlight">{copy.processHighlight}</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
              {copy.processDescription}
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative grid gap-8 md:grid-cols-4"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 hidden h-px md:block"
              style={{
                background: 'linear-gradient(90deg, transparent 5%, rgba(0,212,255,0.3) 20%, rgba(0,212,255,0.3) 80%, transparent 95%)',
                top: '2.8rem',
              }}
            />

            {copy.processSteps.map(({ number, icon: Icon, title, description }) => (
              <motion.div key={number} variants={fadeUp} className="relative flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,212,255,0.05) 100%)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      boxShadow: '0 0 24px rgba(0,212,255,0.12)',
                    }}
                  >
                    <Icon size={28} color="#00d4ff" strokeWidth={1.6} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #2563eb)', color: 'white', boxShadow: '0 0 12px rgba(59,130,246,0.5)' }}
                  >
                    {number}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{title}</h3>
                <p className="text-xs leading-relaxed text-gray-400">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#060d1a' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.05) 0%, transparent 55%)' }} />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14 text-center"
          >
            <p className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.faqEyebrow}
            </p>
            <h2 className="section-title">{copy.faqTitle} <span className="highlight">{copy.faqHighlight}</span></h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-3"
          >
            {copy.faqs.map((faq) => (
              <motion.div key={faq.question} variants={fadeUp}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#030712' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
        <div className="stars pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.ctaEyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              {copy.ctaTitle} <span className="highlight">{copy.ctaHighlight}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-10 text-sm leading-relaxed text-gray-400">
              {copy.ctaDescription}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contato" className="btn-blue inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm">
                {copy.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
