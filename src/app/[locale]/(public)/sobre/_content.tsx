'use client'

import { useLocale } from 'next-intl'
import { motion, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import {
  Target,
  Eye,
  Heart,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

/* ─── Animation variants ─────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

/* ─── Data ───────────────────────────────────────────────── */
const basePillars = [
  {
    icon: Target,
    label: 'Foco',
    title: 'Resolver a operação real',
    text: 'Nosso foco é resolver problemas reais de operação, atacando gargalos, retrabalho e ineficiências que travam o crescimento.',
    color: '#00d4ff',
    border: 'rgba(0,212,255,0.2)',
    bg: 'rgba(0,212,255,0.05)',
  },
  {
    icon: Eye,
    label: 'Estrutura',
    title: 'Tecnologia aplicada com critério',
    text: 'Cada solução é pensada para reduzir esforço manual, aumentar produtividade, organizar processos e permitir crescimento com estrutura.',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.2)',
    bg: 'rgba(245,158,11,0.05)',
  },
  {
    icon: Heart,
    label: 'Resultado',
    title: 'Execução acima do discurso',
    text: 'Não trabalhamos com tecnologia por estética. Trabalhamos com tecnologia para gerar resultado de forma prática, clara e sustentável.',
    color: '#00d4ff',
    border: 'rgba(0,212,255,0.2)',
    bg: 'rgba(0,212,255,0.05)',
  },
]

const baseFounder = {
  initials: 'EW',
  name: 'Eduardo Weber',
  role: 'Founder',
  paragraph1:
    'A Ascend Tech Global é liderada por Eduardo Weber, profissional com atuação prática em tecnologia, automação e segurança aplicada a cenários reais.',
  paragraph2:
    'Com experiência no desenvolvimento de soluções para empresas, estabelecimentos comerciais e profissionais autônomos, sua atuação é focada em resolver problemas operacionais e estruturar negócios para crescimento.',
  paragraph3:
    'Cada projeto é conduzido com visão estratégica, execução técnica e foco direto em resultado.',
  paragraph4:
    'Dependendo da complexidade, a Ascend também atua com parceiros e especialistas, garantindo flexibilidade e escala conforme a necessidade de cada solução.',
}

const baseTimeline = [
  {
    year: '2023',
    event: 'INICIO DA JORNADA',
    detail:
      'Nao comecamos como uma grande empresa — comecamos resolvendo problemas reais. Demos os primeiros passos criando chatbots e automacoes para pessoas e pequenos negocios locais, focando em solucoes simples, acessiveis e que realmente funcionassem no dia a dia. Foi nesse momento que entendemos algo essencial: tecnologia so tem valor quando gera resultado.',
  },
  {
    year: '2024',
    event: 'EXPANSAO INICIAL',
    detail:
      'O que comecou pequeno comecou a crescer — e a ficar mais serio. Passamos a atender empresas com demandas mais estruturadas, desenvolvendo automacoes mais robustas e os primeiros sistemas personalizados. Aqui deixamos de apenas executar — comecamos a pensar estrategia, eficiencia e escala.',
  },
  {
    year: '2025',
    event: 'ESCALA E CONSOLIDACAO',
    detail:
      'Saimos do operacional e entramos no jogo de verdade. Ampliamos nossa atuacao para desenvolvimento completo de sistemas, integracoes com IA e solucoes mais complexas, atendendo clientes com necessidades reais de crescimento. A base estava solida. Agora, comecamos a construir algo maior.',
  },
  {
    year: '2026',
    event: 'ASCEND TECH GLOBAL',
    detail:
      'Hoje, nao entregamos apenas tecnologia — entregamos estrutura para crescimento. Atuamos como uma empresa de desenvolvimento de software e cyber security, criando solucoes escalaveis, seguras e pensadas para o longo prazo. Nosso foco e claro: ajudar empresas a crescer com inteligencia, eficiencia e seguranca.',
  },
]

const copyByLocale = {
  'pt-BR': {
    home: 'Início',
    page: 'Sobre',
    heroEyebrow: 'Quem Somos',
    heroTitle: 'SOBRE A',
    heroHighlight: 'ASCEND TECH GLOBAL',
    heroDescription:
      'A Ascend Tech Global é uma empresa de tecnologia focada em estruturar operações, automatizar processos e desenvolver soluções sob medida para empresas que precisam crescer com eficiência e controle.',
    heroDescriptionSecondary:
      'Mais do que desenvolver sistemas, atuamos diretamente na organização da operação, reduzindo retrabalho, integrando processos e criando uma base sólida para crescimento.',
    heroDescriptionTertiary:
      'A tecnologia existe. O diferencial está em como ela é aplicada.',
    pillarsEyebrow: 'O Que Nos Move',
    pillarsTitle: 'O QUE NOS',
    pillarsHighlight: 'MOVE',
    teamEyebrow: 'Liderança',
    teamTitle: 'QUEM ESTÁ',
    teamHighlight: 'POR TRÁS',
    teamDescription: 'Uma liderança técnica, prática e orientada a resultado, com execução próxima da operação e visão de crescimento.',
    timelineEyebrow: 'Nossa Evolucao',
    timelineTitle: 'A TRAJETORIA DA',
    timelineHighlight: 'ASCEND',
    timelineDescription:
      'Uma leitura clara da nossa evolucao, mostrando como a Ascend saiu da execucao inicial para uma operacao mais estrategica, robusta e pronta para crescer com consistencia.',
    ctaEyebrow: 'Próximos Passos',
    ctaTitle: 'SUA OPERAÇÃO PODE SER',
    ctaHighlight: 'MUITO MAIS EFICIENTE',
    ctaDescription:
      'Entre em contato e descubra onde estão os gargalos e como resolvê-los.',
    ctaButton: 'Solicitar diagnóstico',
    pillars: basePillars,
    founder: baseFounder,
    timeline: baseTimeline,
  },
  en: {
    home: 'Home',
    page: 'About',
    heroEyebrow: 'Who We Are',
    heroTitle: 'ABOUT',
    heroHighlight: 'ASCEND TECH GLOBAL',
    heroDescription:
      'Ascend Tech Global is a technology company focused on structuring operations, automating processes and building custom solutions for businesses that need to grow with efficiency and control.',
    heroDescriptionSecondary:
      'More than developing systems, we work directly on operational organization, reducing rework, integrating processes and creating a solid foundation for growth.',
    heroDescriptionTertiary:
      'The technology already exists. The difference is in how it is applied.',
    pillarsEyebrow: 'What Drives Us',
    pillarsTitle: 'WHAT DRIVES',
    pillarsHighlight: 'US',
    teamEyebrow: 'Leadership',
    teamTitle: 'WHO IS',
    teamHighlight: 'BEHIND IT',
    teamDescription: 'Technical leadership with practical execution, close to the operation and focused on delivering real outcomes.',
    timelineEyebrow: 'Our Journey',
    timelineTitle: 'THE STORY OF',
    timelineHighlight: 'ASCEND',
    timelineDescription:
      'A clearer view of our evolution, showing how Ascend moved from early execution into a stronger, more strategic and growth-ready operation.',
    ctaEyebrow: 'Next Steps',
    ctaTitle: 'YOUR OPERATION CAN BE',
    ctaHighlight: 'MUCH MORE EFFICIENT',
    ctaDescription:
      'Get in touch and discover where the bottlenecks are and how to solve them.',
    ctaButton: 'Request assessment',
    pillars: [
      { ...basePillars[0], label: 'Focus', title: 'Solve real operational problems', text: 'Our focus is to solve real operational problems by addressing bottlenecks, rework and inefficiencies that limit growth.' },
      { ...basePillars[1], label: 'Structure', title: 'Technology applied with purpose', text: 'Every solution is designed to reduce manual effort, increase productivity, organize processes and support structured growth.' },
      { ...basePillars[2], label: 'Outcome', title: 'Execution over discourse', text: 'We do not work with technology for aesthetics. We work with technology to generate practical, measurable and sustainable results.' },
    ],
    founder: {
      ...baseFounder,
      role: 'Founder',
      paragraph1:
        'Ascend Tech Global is led by Eduardo Weber, a professional with practical experience in technology, automation and security applied to real-world scenarios.',
      paragraph2:
        'With experience building solutions for companies, commercial establishments and independent professionals, his work is focused on solving operational problems and structuring businesses for growth.',
      paragraph3:
        'Each project is conducted with strategic vision, technical execution and direct focus on outcomes.',
      paragraph4:
        'Depending on the complexity, Ascend also works with partners and specialists, ensuring flexibility and scale according to the needs of each solution.',
    },
    timeline: [
      {
        year: '2023',
        event: 'THE START OF THE JOURNEY',
        detail:
          'We did not start as a big company — we started by solving real problems. Our first steps were chatbots and automations for individuals and small local businesses, focused on simple, accessible solutions that truly worked in day-to-day operations. That is when we learned something essential: technology only matters when it creates results.',
      },
      {
        year: '2024',
        event: 'EARLY EXPANSION',
        detail:
          'What began small started to grow — and became more serious. We moved into more structured business demands, delivering stronger automations and our first custom systems. This was the moment we stopped only executing and started thinking in strategy, efficiency and scale.',
      },
      {
        year: '2025',
        event: 'SCALE AND CONSOLIDATION',
        detail:
          'We left purely operational work behind and stepped into a more mature game. Our scope expanded into full systems development, AI integrations and more complex solutions for clients with real growth needs. The foundation was solid. We were ready to build something bigger.',
      },
      {
        year: '2026',
        event: 'ASCEND TECH GLOBAL',
        detail:
          'Today, we do not deliver just technology — we deliver structure for growth. We operate as a software development and cyber security company, building scalable, secure solutions designed for the long term. Our focus is clear: help companies grow with intelligence, efficiency and security.',
      },
    ],
  },
  es: {
    home: 'Inicio',
    page: 'Nosotros',
    heroEyebrow: 'Quiénes Somos',
    heroTitle: 'SOBRE',
    heroHighlight: 'ASCEND TECH GLOBAL',
    heroDescription:
      'Ascend Tech Global es una empresa de tecnología enfocada en estructurar operaciones, automatizar procesos y desarrollar soluciones a medida para empresas que necesitan crecer con eficiencia y control.',
    heroDescriptionSecondary:
      'Más que desarrollar sistemas, actuamos directamente en la organización de la operación, reduciendo retrabajo, integrando procesos y creando una base sólida para crecer.',
    heroDescriptionTertiary:
      'La tecnología ya existe. La diferencia está en cómo se aplica.',
    pillarsEyebrow: 'Lo Que Nos Mueve',
    pillarsTitle: 'LO QUE NOS',
    pillarsHighlight: 'MUEVE',
    teamEyebrow: 'Liderazgo',
    teamTitle: 'QUIÉN ESTÁ',
    teamHighlight: 'POR DETRÁS',
    teamDescription: 'Un liderazgo técnico, práctico y orientado a resultados, con ejecución cercana a la operación y visión de crecimiento.',
    timelineEyebrow: 'Nuestra Evolucion',
    timelineTitle: 'LA TRAYECTORIA DE',
    timelineHighlight: 'ASCEND',
    timelineDescription:
      'Una lectura clara de nuestra evolucion, mostrando como Ascend paso de la ejecucion inicial a una operacion mas estrategica, solida y lista para crecer con consistencia.',
    ctaEyebrow: 'Próximos Pasos',
    ctaTitle: 'SU OPERACIÓN PUEDE SER',
    ctaHighlight: 'MUCHO MÁS EFICIENTE',
    ctaDescription:
      'Póngase en contacto y descubra dónde están los cuellos de botella y cómo resolverlos.',
    ctaButton: 'Solicitar diagnóstico',
    pillars: [
      { ...basePillars[0], label: 'Foco', title: 'Resolver la operación real', text: 'Nuestro foco es resolver problemas reales de operación, atacando cuellos de botella, retrabajo e ineficiencias que frenan el crecimiento.' },
      { ...basePillars[1], label: 'Estructura', title: 'Tecnología aplicada con criterio', text: 'Cada solución está pensada para reducir esfuerzo manual, aumentar productividad, organizar procesos y permitir crecimiento con estructura.' },
      { ...basePillars[2], label: 'Resultado', title: 'Ejecución por encima del discurso', text: 'No trabajamos con tecnología por estética. Trabajamos con tecnología para generar resultados de forma práctica, clara y sostenible.' },
    ],
    founder: {
      ...baseFounder,
      role: 'Founder',
      paragraph1:
        'Ascend Tech Global es liderada por Eduardo Weber, profesional con actuación práctica en tecnología, automatización y seguridad aplicadas a escenarios reales.',
      paragraph2:
        'Con experiencia en el desarrollo de soluciones para empresas, comercios y profesionales autónomos, su trabajo está enfocado en resolver problemas operativos y estructurar negocios para crecer.',
      paragraph3:
        'Cada proyecto se conduce con visión estratégica, ejecución técnica y foco directo en resultado.',
      paragraph4:
        'Según la complejidad, Ascend también actúa con socios y especialistas, garantizando flexibilidad y escala conforme a la necesidad de cada solución.',
    },
    timeline: [
      {
        year: '2023',
        event: 'INICIO DEL CAMINO',
        detail:
          'No comenzamos como una gran empresa — comenzamos resolviendo problemas reales. Dimos los primeros pasos creando chatbots y automatizaciones para personas y pequenos negocios locales, enfocados en soluciones simples, accesibles y que realmente funcionaran en el dia a dia. Fue ahi cuando entendimos algo esencial: la tecnologia solo tiene valor cuando genera resultados.',
      },
      {
        year: '2024',
        event: 'EXPANSION INICIAL',
        detail:
          'Lo que empezo pequeno empezo a crecer — y a ponerse mas serio. Pasamos a atender empresas con demandas mas estructuradas, desarrollando automatizaciones mas robustas y los primeros sistemas personalizados. Aqui dejamos de solo ejecutar y comenzamos a pensar en estrategia, eficiencia y escala.',
      },
      {
        year: '2025',
        event: 'ESCALA Y CONSOLIDACION',
        detail:
          'Salimos de lo operativo y entramos en el juego de verdad. Ampliamos nuestra actuacion hacia el desarrollo completo de sistemas, integraciones con IA y soluciones mas complejas, atendiendo clientes con necesidades reales de crecimiento. La base ya era solida. Ahora empezamos a construir algo mas grande.',
      },
      {
        year: '2026',
        event: 'ASCEND TECH GLOBAL',
        detail:
          'Hoy no entregamos solo tecnologia — entregamos estructura para crecer. Actuamos como una empresa de desarrollo de software y cyber security, creando soluciones escalables, seguras y pensadas para el largo plazo. Nuestro foco es claro: ayudar a empresas a crecer con inteligencia, eficiencia y seguridad.',
      },
    ],
  },
} as const

/* ─── Content ────────────────────────────────────────────── */
export default function SobreContent() {
  const locale = useLocale() as keyof typeof copyByLocale
  const copy = copyByLocale[locale] ?? copyByLocale['pt-BR']
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(0,212,255,0.18) 0%, transparent 70%)',
          }}
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
            <Link href="/" className="hover:text-white/70 transition-colors">{copy.home}</Link>
            <ChevronRight size={12} />
            <span className="text-gradient">{copy.page}</span>
          </motion.nav>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="text-gradient mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
            >
              {copy.heroEyebrow}
            </motion.p>
            <motion.h1 variants={fadeUp} className="section-title mb-6">
              {copy.heroTitle} <span className="highlight">{copy.heroHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-white/60">
              {copy.heroDescription}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              {copy.heroDescriptionSecondary}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-relaxed text-white/72">
              {copy.heroDescriptionTertiary}
            </motion.p>
          </motion.div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }}
        />
      </section>

      {/* ── MISSION / VISION / VALUES ────────────────────── */}
      <section className="relative py-20" style={{ backgroundColor: '#060d1a' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)' }}
        />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14 text-center"
          >
            <p className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.pillarsEyebrow}
            </p>
            <h2 className="section-title">{copy.pillarsTitle} <span className="highlight">{copy.pillarsHighlight}</span></h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 md:grid-cols-3"
          >
            {copy.pillars.map(({ icon: Icon, label, title, text, color, border, bg }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="glow-card rounded-2xl p-8 flex flex-col gap-5"
                style={{ borderColor: border, background: bg }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${color}22 0%, ${color}08 100%)`,
                    border: `1px solid ${color}44`,
                    boxShadow: `0 0 20px ${color}22`,
                  }}
                >
                  <Icon size={24} color={color} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color }}>
                    {label}
                  </p>
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-white">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────── */}
      <section className="relative py-20" style={{ backgroundColor: '#030712' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.04) 0%, transparent 55%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14 text-center"
          >
            <p className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.teamEyebrow}
            </p>
            <h2 className="section-title">
              {copy.teamTitle} <span className="highlight">{copy.teamHighlight}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
              {copy.teamDescription}
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="glow-card rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <div className="flex flex-col items-center text-center lg:w-64 lg:items-start lg:text-left">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-black text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(0,212,255,0.06) 100%)',
                      border: '2px solid rgba(0,212,255,0.35)',
                      boxShadow: '0 0 24px rgba(0,212,255,0.15)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {copy.founder.initials}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                      {copy.founder.name}
                    </h3>
                    <p className="text-gradient mt-1 text-[11px] font-semibold uppercase tracking-widest">
                      {copy.founder.role}
                    </p>
                  </div>
                </div>

                <div className="grid flex-1 gap-4">
                  {[copy.founder.paragraph1, copy.founder.paragraph2, copy.founder.paragraph3, copy.founder.paragraph4].map((paragraph, index) => (
                    <div
                      key={paragraph}
                      className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/38">
                        0{index + 1}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/68">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#060d1a' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 50%)' }}
        />
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14 text-center"
          >
            <p className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              {copy.timelineEyebrow}
            </p>
            <h2 className="section-title">{copy.timelineTitle} <span className="highlight">{copy.timelineHighlight}</span></h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              {copy.timelineDescription}
            </p>
          </motion.div>

          <div className="relative">
            <div
              className="absolute bottom-0 left-5 top-0 w-px sm:left-1/2 sm:-translate-x-1/2"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(54,125,217,0.14) 0%, rgba(54,125,217,0.55) 18%, rgba(242,174,46,0.52) 82%, rgba(242,174,46,0.12) 100%)',
                boxShadow: '0 0 18px rgba(54,125,217,0.14)',
              }}
            />

            <div className="flex flex-col gap-8 sm:gap-10">
              {copy.timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0
                const isFirst = idx === 0
                const isLast = idx === copy.timeline.length - 1
                return (
                  <motion.div
                    key={item.year}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className={[
                      'relative grid items-center gap-4 pl-14 sm:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] sm:gap-8 sm:pl-0',
                      isLeft ? '' : '',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'sm:col-start-1',
                        isLeft ? 'sm:block' : 'sm:hidden',
                      ].join(' ')}
                    />

                    <div
                      className={[
                        'relative z-10 order-2 sm:order-none sm:col-start-2 flex items-center justify-center',
                      ].join(' ')}
                    >
                      {!isFirst && (
                        <div
                          aria-hidden
                          className="absolute left-1/2 top-[-2.25rem] h-[2.25rem] w-px -translate-x-1/2 sm:top-[-2.65rem] sm:h-[2.65rem]"
                          style={{
                            background:
                              'linear-gradient(to bottom, rgba(54,125,217,0.08), rgba(54,125,217,0.55))',
                          }}
                        />
                      )}
                      {!isLast && (
                        <div
                          aria-hidden
                          className="absolute left-1/2 top-full h-[2.25rem] w-px -translate-x-1/2 sm:h-[2.65rem]"
                          style={{
                            background:
                              'linear-gradient(to bottom, rgba(242,174,46,0.55), rgba(242,174,46,0.08))',
                          }}
                        />
                      )}
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(54,125,217,0.28),rgba(242,174,46,0.24))] shadow-[0_0_0_6px_rgba(7,13,26,0.95),0_0_20px_rgba(54,125,217,0.2)]"
                      >
                        <div className="h-3 w-3 rounded-full bg-white/95" />
                      </div>
                    </div>

                    <div
                      className={[
                        'order-1 sm:order-none',
                        isLeft ? 'sm:col-start-1 sm:text-right' : 'sm:col-start-3 sm:text-left',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'glow-card rounded-[1.8rem] p-6 sm:p-7',
                          'border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]',
                        ].join(' ')}
                      >
                        <span className="text-gradient block text-[1.85rem] font-black tracking-[-0.05em] sm:text-[2.15rem]">
                          {item.year}
                        </span>
                        <h3 className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.26em] text-white/72 sm:text-[0.82rem]">
                          {item.event}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-white/64 sm:text-[0.97rem]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#030712' }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="stars pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              className="text-gradient mb-3 text-xs font-semibold uppercase tracking-[0.25em]"
            >
              {copy.ctaEyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              {copy.ctaTitle} <span className="highlight">{copy.ctaHighlight}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-10 text-sm leading-relaxed text-gray-400">
              {copy.ctaDescription}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contato"
                className="btn-orange inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm"
              >
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
