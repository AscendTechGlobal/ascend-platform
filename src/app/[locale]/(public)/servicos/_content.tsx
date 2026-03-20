'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/lib/i18n'
import {
  Lightbulb,
  Code2,
  Shield,
  Cloud,
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
    id: 'consulting',
    icon: Lightbulb,
    title: 'TECH',
    titleHighlight: 'CONSULTING',
    tagline: 'Estratégia tecnológica para crescimento real',
    description:
      'Analisamos profundamente sua operação e mapeamos as melhores oportunidades tecnológicas para otimizar processos, reduzir custos e acelerar o crescimento do seu negócio.',
    features: [
      'Diagnóstico tecnológico completo',
      'Roadmap de transformação digital',
      'Análise de ROI e viabilidade',
      'Gestão de fornecedores e integrações',
      'Planejamento de arquitetura de sistemas',
      'Workshops de inovação para times',
    ],
    color: '#00d4ff',
  },
  {
    id: 'software',
    icon: Code2,
    title: 'SOFTWARE',
    titleHighlight: 'DEVELOPMENT',
    tagline: 'Desenvolvimento sob medida para o seu negócio',
    description:
      'Criamos aplicações web, mobile e sistemas corporativos com código limpo, arquitetura sólida e foco em performance, escalabilidade e experiência do usuário.',
    features: [
      'Aplicações web full-stack (React, Next.js)',
      'Apps mobile (React Native, Flutter)',
      'APIs REST e GraphQL',
      'Integrações com sistemas legados',
      'Automação de processos (RPA)',
      'Desenvolvimento ágil com sprints semanais',
    ],
    color: '#f59e0b',
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    title: 'CYBER',
    titleHighlight: 'SECURITY',
    tagline: 'Proteção total para dados e infraestrutura',
    description:
      'Implementamos camadas robustas de segurança para proteger sua empresa contra ameaças modernas, garantindo conformidade com regulamentações e continuidade dos negócios.',
    features: [
      'Pentest e análise de vulnerabilidades',
      'Implementação de SIEM e SOC',
      'Conformidade LGPD e ISO 27001',
      'Treinamento de segurança para times',
      'Plano de resposta a incidentes',
      'Monitoramento contínuo 24/7',
    ],
    color: '#00d4ff',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'CLOUD',
    titleHighlight: 'SOLUTIONS',
    tagline: 'Escale com confiança na nuvem',
    description:
      'Projetamos e gerenciamos infraestruturas cloud-native na AWS, Azure e GCP que escalam automaticamente, reduzem custos operacionais e garantem alta disponibilidade.',
    features: [
      'Migração e modernização para cloud',
      'Arquitetura serverless e microservices',
      'DevOps, CI/CD e Infrastructure as Code',
      'Kubernetes e orquestração de containers',
      'Otimização de custos de cloud',
      'Backup, DR e alta disponibilidade',
    ],
    color: '#f59e0b',
  },
]

const baseProcessSteps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description:
      'Entendemos profundamente seu negócio, desafios e objetivos para mapear a melhor solução tecnológica.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Proposta',
    description:
      'Desenvolvemos uma proposta detalhada com escopo, cronograma, investimento e projeção de resultados.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Desenvolvimento',
    description:
      'Executamos o projeto com metodologia ágil, entregas incrementais e comunicação transparente a cada sprint.',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Entrega',
    description:
      'Realizamos o deploy com zero downtime, treinamos sua equipe e oferecemos suporte contínuo pós-lançamento.',
  },
]

const baseFaqs = [
  {
    question: 'Qual é o tempo médio de um projeto de desenvolvimento?',
    answer:
      'Depende do escopo. Projetos simples levam de 4 a 8 semanas. Sistemas complexos podem durar de 3 a 6 meses. Trabalhamos sempre com sprints de 2 semanas, entregando valor contínuo ao longo do projeto.',
  },
  {
    question: 'Vocês trabalham com empresas de todos os portes?',
    answer:
      'Sim. Atendemos desde startups em estágio inicial até grandes corporações com infraestrutura crítica. Nossa abordagem é adaptada ao momento e ao tamanho de cada cliente.',
  },
  {
    question: 'Como funciona a consultoria tecnológica?',
    answer:
      'Começamos com uma análise completa da sua operação atual, identificamos gargalos e oportunidades, e entregamos um roadmap prático e priorizado. O processo dura de 2 a 4 semanas e pode ser contínuo ou pontual.',
  },
  {
    question: 'Vocês oferecem suporte após a entrega do projeto?',
    answer:
      'Sim. Oferecemos planos de suporte e manutenção contínua, monitoramento de performance, atualizações de segurança e evolução do produto. Nosso time está disponível por chat, e-mail e WhatsApp.',
  },
  {
    question: 'Como é feita a precificação dos projetos?',
    answer:
      'Trabalhamos com precificação por projeto (escopo fechado), time & material (horas trabalhadas) ou retainer mensal. Após o diagnóstico gratuito, apresentamos uma proposta transparente com todos os custos detalhados.',
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
          heroTitle: 'OUR',
          heroHighlight: 'SERVICES',
          heroDescription: 'Complete technology services to transform your company, from strategy to delivery, with technical excellence and total focus on measurable results.',
          processEyebrow: 'Our Process',
          processTitle: 'HOW WE',
          processHighlight: 'WORK',
          processDescription: 'A methodology tested and refined over the years to ensure predictability, quality and results in every project.',
          faqEyebrow: 'Frequently Asked Questions',
          faqTitle: 'FAQ - CLEAR YOUR',
          faqHighlight: 'DOUBTS',
          ctaEyebrow: 'Ready to Start?',
          ctaTitle: 'TRANSFORM YOUR BUSINESS',
          ctaHighlight: 'TODAY',
          ctaDescription: 'Schedule a free conversation with our specialists and discover which service best fits your business right now.',
          ctaButton: 'Request Free Assessment',
          services: [
            { ...baseServices[0], tagline: 'Technology strategy for real growth', description: 'We deeply analyze your operation and map the best technology opportunities to optimize processes, reduce costs and accelerate business growth.', features: ['Complete technology assessment', 'Digital transformation roadmap', 'ROI and feasibility analysis', 'Vendor and integration management', 'Systems architecture planning', 'Innovation workshops for teams'] },
            { ...baseServices[1], tagline: 'Custom development for your business', description: 'We build web applications, mobile apps and enterprise systems with clean code, solid architecture and a strong focus on performance, scalability and user experience.', features: ['Full-stack web applications (React, Next.js)', 'Mobile apps (React Native, Flutter)', 'REST and GraphQL APIs', 'Legacy systems integrations', 'Process automation (RPA)', 'Agile delivery with weekly sprints'] },
            { ...baseServices[2], tagline: 'Full protection for data and infrastructure', description: 'We implement robust security layers to protect your company against modern threats, ensuring compliance and business continuity.', features: ['Pentest and vulnerability analysis', 'SIEM and SOC implementation', 'LGPD and ISO 27001 compliance', 'Security training for teams', 'Incident response planning', '24/7 continuous monitoring'] },
            { ...baseServices[3], tagline: 'Scale with confidence in the cloud', description: 'We design and manage cloud-native infrastructure on AWS, Azure and GCP that scales automatically, reduces operating costs and guarantees high availability.', features: ['Cloud migration and modernization', 'Serverless and microservices architecture', 'DevOps, CI/CD and Infrastructure as Code', 'Kubernetes and container orchestration', 'Cloud cost optimization', 'Backup, DR and high availability'] },
          ],
          processSteps: [
            { ...baseProcessSteps[0], title: 'Assessment', description: 'We deeply understand your business, challenges and goals to map the best technology solution.' },
            { ...baseProcessSteps[1], title: 'Proposal', description: 'We develop a detailed proposal with scope, timeline, investment and projected outcomes.' },
            { ...baseProcessSteps[2], title: 'Development', description: 'We execute the project with agile methodology, incremental deliveries and transparent communication in every sprint.' },
            { ...baseProcessSteps[3], title: 'Delivery', description: 'We deploy with zero downtime, train your team and provide ongoing post-launch support.' },
          ],
          faqs: [
            { question: 'What is the average timeline for a development project?', answer: 'It depends on scope. Simple projects usually take 4 to 8 weeks, while more complex systems may take 3 to 6 months. We always work in 2-week sprints, delivering continuous value throughout the project.' },
            { question: 'Do you work with companies of all sizes?', answer: 'Yes. We work with early-stage startups as well as large enterprises with critical infrastructure. Our approach is adapted to each client’s stage and scale.' },
            { question: 'How does your technology consulting work?', answer: 'We begin with a full analysis of your current operation, identify bottlenecks and opportunities, and deliver a practical, prioritized roadmap. The process usually lasts 2 to 4 weeks and can be ongoing or one-off.' },
            { question: 'Do you offer support after project delivery?', answer: 'Yes. We offer support and maintenance plans, performance monitoring, security updates and product evolution. Our team is available via chat, email and WhatsApp.' },
            { question: 'How do you price projects?', answer: 'We work with fixed-scope pricing, time and material, or monthly retainers. After the free assessment, we present a transparent proposal with all costs detailed.' },
          ],
        }
      : locale === 'es'
        ? {
            page: 'Servicios',
            heroEyebrow: 'Lo Que Hacemos',
            heroTitle: 'NUESTROS',
            heroHighlight: 'SERVICIOS',
            heroDescription: 'Soluciones tecnológicas completas para transformar su empresa, desde la estrategia hasta la entrega, con excelencia técnica y foco total en resultados medibles.',
            processEyebrow: 'Nuestro Proceso',
            processTitle: 'COMO',
            processHighlight: 'TRABAJAMOS',
            processDescription: 'Una metodología probada y refinada a lo largo de los años para garantizar previsibilidad, calidad y resultados en cada proyecto.',
            faqEyebrow: 'Preguntas Frecuentes',
            faqTitle: 'FAQ - RESUELVA SUS',
            faqHighlight: 'DUDAS',
            ctaEyebrow: 'Listo para Comenzar?',
            ctaTitle: 'TRANSFORME SU NEGOCIO',
            ctaHighlight: 'HOY',
            ctaDescription: 'Agende una conversación gratuita con nuestros especialistas y descubra qué servicio se adapta mejor al momento actual de su negocio.',
            ctaButton: 'Solicitar Diagnóstico Gratis',
            services: [
              { ...baseServices[0], tagline: 'Estrategia tecnológica para crecimiento real', description: 'Analizamos profundamente su operación y mapeamos las mejores oportunidades tecnológicas para optimizar procesos, reducir costos y acelerar el crecimiento del negocio.', features: ['Diagnóstico tecnológico completo', 'Hoja de ruta de transformación digital', 'Análisis de ROI y viabilidad', 'Gestión de proveedores e integraciones', 'Planificación de arquitectura de sistemas', 'Workshops de innovación para equipos'] },
              { ...baseServices[1], tagline: 'Desarrollo a medida para su negocio', description: 'Creamos aplicaciones web, móviles y sistemas corporativos con código limpio, arquitectura sólida y foco en rendimiento, escalabilidad y experiencia del usuario.', features: ['Aplicaciones web full-stack (React, Next.js)', 'Apps móviles (React Native, Flutter)', 'APIs REST y GraphQL', 'Integraciones con sistemas legados', 'Automatización de procesos (RPA)', 'Desarrollo ágil con sprints semanales'] },
              { ...baseServices[2], tagline: 'Protección total para datos e infraestructura', description: 'Implementamos capas robustas de seguridad para proteger su empresa contra amenazas modernas, garantizando cumplimiento normativo y continuidad del negocio.', features: ['Pentest y análisis de vulnerabilidades', 'Implementación de SIEM y SOC', 'Cumplimiento LGPD e ISO 27001', 'Capacitación de seguridad para equipos', 'Plan de respuesta a incidentes', 'Monitoreo continuo 24/7'] },
              { ...baseServices[3], tagline: 'Escale con confianza en la nube', description: 'Diseñamos y gestionamos infraestructuras cloud-native en AWS, Azure y GCP que escalan automáticamente, reducen costos operativos y garantizan alta disponibilidad.', features: ['Migración y modernización a cloud', 'Arquitectura serverless y microservicios', 'DevOps, CI/CD e Infrastructure as Code', 'Kubernetes y orquestación de contenedores', 'Optimización de costos cloud', 'Backup, DR y alta disponibilidad'] },
            ],
            processSteps: [
              { ...baseProcessSteps[0], title: 'Diagnóstico', description: 'Entendemos profundamente su negocio, desafíos y objetivos para mapear la mejor solución tecnológica.' },
              { ...baseProcessSteps[1], title: 'Propuesta', description: 'Desarrollamos una propuesta detallada con alcance, cronograma, inversión y proyección de resultados.' },
              { ...baseProcessSteps[2], title: 'Desarrollo', description: 'Ejecutamos el proyecto con metodología ágil, entregas incrementales y comunicación transparente en cada sprint.' },
              { ...baseProcessSteps[3], title: 'Entrega', description: 'Realizamos el despliegue sin interrupciones, capacitamos a su equipo y ofrecemos soporte continuo después del lanzamiento.' },
            ],
            faqs: [
              { question: 'Cuál es el tiempo promedio de un proyecto de desarrollo?', answer: 'Depende del alcance. Los proyectos simples tardan entre 4 y 8 semanas. Los sistemas complejos pueden durar de 3 a 6 meses. Siempre trabajamos en sprints de 2 semanas, entregando valor continuo a lo largo del proyecto.' },
              { question: 'Trabajan con empresas de todos los tamaños?', answer: 'Sí. Atendemos desde startups en etapa inicial hasta grandes corporaciones con infraestructura crítica. Nuestro enfoque se adapta al momento y al tamaño de cada cliente.' },
              { question: 'Cómo funciona la consultoría tecnológica?', answer: 'Comenzamos con un análisis completo de su operación actual, identificamos cuellos de botella y oportunidades, y entregamos una hoja de ruta práctica y priorizada. El proceso dura de 2 a 4 semanas y puede ser continuo o puntual.' },
              { question: 'Ofrecen soporte después de la entrega del proyecto?', answer: 'Sí. Ofrecemos planes de soporte y mantenimiento continuo, monitoreo de rendimiento, actualizaciones de seguridad y evolución del producto. Nuestro equipo está disponible por chat, correo electrónico y WhatsApp.' },
              { question: 'Cómo se define el precio de los proyectos?', answer: 'Trabajamos con precio por proyecto, time and material o retainer mensual. Después del diagnóstico gratuito, presentamos una propuesta transparente con todos los costos detallados.' },
            ],
          }
        : {
            page: 'Serviços',
            heroEyebrow: 'O Que Fazemos',
            heroTitle: 'NOSSOS',
            heroHighlight: 'SERVIÇOS',
            heroDescription: 'Soluções completas de tecnologia para transformar sua empresa — da estratégia à entrega, com excelência técnica e foco total em resultados mensuráveis.',
            processEyebrow: 'Nosso Processo',
            processTitle: 'COMO',
            processHighlight: 'TRABALHAMOS',
            processDescription: 'Uma metodologia testada e refinada ao longo de anos para garantir previsibilidade, qualidade e resultados em cada projeto.',
            faqEyebrow: 'Perguntas Frequentes',
            faqTitle: 'FAQ - TIRE SUAS',
            faqHighlight: 'DÚVIDAS',
            ctaEyebrow: 'Pronto para Começar?',
            ctaTitle: 'TRANSFORME SEU NEGÓCIO',
            ctaHighlight: 'HOJE',
            ctaDescription: 'Agende uma conversa gratuita com nossos especialistas e descubra qual serviço se encaixa melhor no momento do seu negócio.',
            ctaButton: 'Solicitar Diagnóstico Grátis',
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
                  className="btn-cyan-outline mt-auto inline-flex w-fit items-center gap-2 rounded-lg px-6 py-2.5 text-xs"
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
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.04) 0%, transparent 55%)' }} />

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
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', boxShadow: '0 0 12px rgba(245,158,11,0.5)' }}
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
              <Link href="/contato" className="btn-orange inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm">
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
