'use client'

import { useLocale } from 'next-intl'
import { motion, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import {
  Target,
  Eye,
  Heart,
  Linkedin,
  Twitter,
  Github,
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
    label: 'Missão',
    title: 'Nossa Missão',
    text: 'Elevar negócios ao próximo nível através de tecnologia inovadora, soluções digitais de alta performance e parcerias estratégicas que geram resultados mensuráveis e duradouros.',
    color: '#00d4ff',
    border: 'rgba(0,212,255,0.2)',
    bg: 'rgba(0,212,255,0.05)',
  },
  {
    icon: Eye,
    label: 'Visão',
    title: 'Nossa Visão',
    text: 'Ser a referência global em consultoria e desenvolvimento tecnológico, reconhecida por transformar ambição em resultado e por colocar nossos clientes na vanguarda digital.',
    color: '#f59e0b',
    border: 'rgba(245,158,11,0.2)',
    bg: 'rgba(245,158,11,0.05)',
  },
  {
    icon: Heart,
    label: 'Valores',
    title: 'Nossos Valores',
    text: 'Inovação contínua, excelência técnica, transparência radical, foco no cliente e responsabilidade ética guiam cada decisão e cada linha de código que entregamos.',
    color: '#00d4ff',
    border: 'rgba(0,212,255,0.2)',
    bg: 'rgba(0,212,255,0.05)',
  },
]

const baseTeamMembers = [
  {
    initials: 'RS',
    name: 'Rafael Silva',
    role: 'CEO & Co-fundador',
    bio: 'Visionário em tecnologia com mais de 10 anos liderando times de alta performance em startups e grandes corporações.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    initials: 'AC',
    name: 'Ana Costa',
    role: 'CTO & Co-fundadora',
    bio: 'Arquiteta de software apaixonada por sistemas escaláveis, cloud-native e inteligência artificial aplicada a negócios.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    initials: 'ML',
    name: 'Marcos Lima',
    role: 'Head of Design',
    bio: 'Especialista em UX/UI com foco em experiências digitais que convertem, encantam e geram impacto real para o usuário final.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    initials: 'JP',
    name: 'Julia Pereira',
    role: 'Head of Security',
    bio: 'Especialista em cibersegurança certificada (CISSP, CEH) com foco em proteção de infraestrutura crítica e compliance.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
]

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
      'Somos uma empresa de tecnologia focada em transformar negócios com soluções inovadoras, times de alta performance e uma abordagem centrada em resultados reais. Desde 2019, elevamos negócios ao próximo nível com tecnologia de ponta e parceria genuína.',
    pillarsEyebrow: 'O Que Nos Move',
    pillarsTitle: 'NOSSOS',
    pillarsHighlight: 'PILARES',
    teamEyebrow: 'Nosso Time',
    teamTitle: 'AS PESSOAS POR TRÁS DA',
    teamHighlight: 'ASCEND',
    teamDescription: 'Profissionais apaixonados por tecnologia, inovação e pelo sucesso dos nossos clientes.',
    timelineEyebrow: 'Nossa Evolucao',
    timelineTitle: 'A TRAJETORIA DA',
    timelineHighlight: 'ASCEND',
    timelineDescription:
      'Uma leitura clara da nossa evolucao, mostrando como a Ascend saiu da execucao inicial para uma operacao mais estrategica, robusta e pronta para crescer com consistencia.',
    ctaEyebrow: 'Próximos Passos',
    ctaTitle: 'VAMOS TRABALHAR',
    ctaHighlight: 'JUNTOS?',
    ctaDescription:
      'Estamos prontos para entender seus desafios e construir a solução tecnológica ideal para o seu negócio. Entre em contato e descubra como a Ascend pode elevar sua empresa.',
    ctaButton: 'Falar com Especialista',
    pillars: basePillars,
    teamMembers: baseTeamMembers,
    timeline: baseTimeline,
  },
  en: {
    home: 'Home',
    page: 'About',
    heroEyebrow: 'Who We Are',
    heroTitle: 'ABOUT',
    heroHighlight: 'ASCEND TECH GLOBAL',
    heroDescription:
      'We are a technology company focused on transforming businesses through innovative solutions, high-performance teams and a results-driven mindset. Since 2019, we have been helping companies level up through cutting-edge technology and genuine partnership.',
    pillarsEyebrow: 'What Drives Us',
    pillarsTitle: 'OUR',
    pillarsHighlight: 'PILLARS',
    teamEyebrow: 'Our Team',
    teamTitle: 'THE PEOPLE BEHIND',
    teamHighlight: 'ASCEND',
    teamDescription: 'Professionals passionate about technology, innovation and the success of our clients.',
    timelineEyebrow: 'Our Journey',
    timelineTitle: 'THE STORY OF',
    timelineHighlight: 'ASCEND',
    timelineDescription:
      'A clearer view of our evolution, showing how Ascend moved from early execution into a stronger, more strategic and growth-ready operation.',
    ctaEyebrow: 'Next Steps',
    ctaTitle: "LET'S WORK",
    ctaHighlight: 'TOGETHER?',
    ctaDescription:
      'We are ready to understand your challenges and build the ideal technology solution for your business. Get in touch and discover how Ascend can take your company further.',
    ctaButton: 'Talk to a Specialist',
    pillars: [
      { ...basePillars[0], label: 'Mission', title: 'Our Mission', text: 'To elevate businesses through innovative technology, high-performance digital solutions and strategic partnerships that generate measurable, lasting results.' },
      { ...basePillars[1], label: 'Vision', title: 'Our Vision', text: 'To become a global reference in technology consulting and development, recognized for turning ambition into results and placing our clients at the digital forefront.' },
      { ...basePillars[2], label: 'Values', title: 'Our Values', text: 'Continuous innovation, technical excellence, radical transparency, customer focus and ethical responsibility guide every decision and every line of code we deliver.' },
    ],
    teamMembers: [
      { ...baseTeamMembers[0], role: 'CEO & Co-founder', bio: 'Technology visionary with over 10 years leading high-performance teams in startups and large enterprises.' },
      { ...baseTeamMembers[1], role: 'CTO & Co-founder', bio: 'Software architect passionate about scalable systems, cloud-native platforms and artificial intelligence applied to business.' },
      { ...baseTeamMembers[2], role: 'Head of Design', bio: 'UX/UI specialist focused on digital experiences that convert, delight and create real impact for end users.' },
      { ...baseTeamMembers[3], role: 'Head of Security', bio: 'Certified cybersecurity specialist focused on protecting critical infrastructure and compliance.' },
    ],
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
      'Somos una empresa de tecnología enfocada en transformar negocios con soluciones innovadoras, equipos de alto desempeño y un enfoque centrado en resultados reales. Desde 2019, llevamos empresas al siguiente nivel con tecnología de punta y una colaboración genuina.',
    pillarsEyebrow: 'Lo Que Nos Mueve',
    pillarsTitle: 'NUESTROS',
    pillarsHighlight: 'PILARES',
    teamEyebrow: 'Nuestro Equipo',
    teamTitle: 'LAS PERSONAS DETRÁS DE',
    teamHighlight: 'ASCEND',
    teamDescription: 'Profesionales apasionados por la tecnología, la innovación y el éxito de nuestros clientes.',
    timelineEyebrow: 'Nuestra Evolucion',
    timelineTitle: 'LA TRAYECTORIA DE',
    timelineHighlight: 'ASCEND',
    timelineDescription:
      'Una lectura clara de nuestra evolucion, mostrando como Ascend paso de la ejecucion inicial a una operacion mas estrategica, solida y lista para crecer con consistencia.',
    ctaEyebrow: 'Próximos Pasos',
    ctaTitle: 'VAMOS A TRABAJAR',
    ctaHighlight: 'JUNTOS?',
    ctaDescription:
      'Estamos listos para entender sus desafíos y construir la solución tecnológica ideal para su negocio. Contáctenos y descubra cómo Ascend puede impulsar su empresa.',
    ctaButton: 'Hablar con un Especialista',
    pillars: [
      { ...basePillars[0], label: 'Misión', title: 'Nuestra Misión', text: 'Elevar negocios a un nuevo nivel mediante tecnología innovadora, soluciones digitales de alto rendimiento y alianzas estratégicas que generen resultados medibles y duraderos.' },
      { ...basePillars[1], label: 'Visión', title: 'Nuestra Visión', text: 'Ser la referencia global en consultoría y desarrollo tecnológico, reconocida por transformar la ambición en resultados y colocar a nuestros clientes en la vanguardia digital.' },
      { ...basePillars[2], label: 'Valores', title: 'Nuestros Valores', text: 'La innovación continua, la excelencia técnica, la transparencia radical, el enfoque en el cliente y la responsabilidad ética guían cada decisión y cada línea de código que entregamos.' },
    ],
    teamMembers: [
      { ...baseTeamMembers[0], role: 'CEO y Cofundador', bio: 'Visionario tecnológico con más de 10 años liderando equipos de alto rendimiento en startups y grandes corporaciones.' },
      { ...baseTeamMembers[1], role: 'CTO y Cofundadora', bio: 'Arquitecta de software apasionada por sistemas escalables, plataformas cloud-native e inteligencia artificial aplicada a negocios.' },
      { ...baseTeamMembers[2], role: 'Head of Design', bio: 'Especialista en UX/UI enfocada en experiencias digitales que convierten, encantan y generan impacto real en el usuario final.' },
      { ...baseTeamMembers[3], role: 'Head of Security', bio: 'Especialista certificada en ciberseguridad enfocada en la protección de infraestructura crítica y cumplimiento.' },
    ],
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

      {/* ── TEAM ─────────────────────────────────────────── */}
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
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {copy.teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="glow-card rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-black text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(0,212,255,0.06) 100%)',
                    border: '2px solid rgba(0,212,255,0.35)',
                    boxShadow: '0 0 24px rgba(0,212,255,0.15)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {member.initials}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{member.name}</h3>
                  <p className="text-gradient mt-1 text-[11px] font-semibold uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>

                <p className="flex-1 text-xs leading-relaxed text-gray-400">{member.bio}</p>

                <div className="flex items-center gap-3">
                  {[
                    { icon: Linkedin, href: member.linkedin, label: 'LinkedIn' },
                    { icon: Twitter, href: member.twitter, label: 'Twitter' },
                    { icon: Github, href: member.github, label: 'GitHub' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                      style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}
                    >
                      <Icon size={14} color="rgba(0,212,255,0.7)" strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
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
