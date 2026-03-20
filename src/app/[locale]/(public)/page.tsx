import { setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import BlogSection from '@/components/sections/BlogSection'
import ContactSection from '@/components/sections/ContactSection'
import FAQSection from '@/components/sections/FAQ'
import type { Project, BlogPost, Testimonial, Service, FAQ } from '@/types'
import { getSiteSettings } from '@/lib/site-settings'

export const dynamic = 'force-dynamic'

async function getData() {
  const supabase = await createClient()
  const [projectsRes, testimonialsRes, postsRes, servicesRes, faqsRes] = await Promise.all([
    supabase.from('projects').select('*').eq('published', true).order('featured', { ascending: false }).order('created_at', { ascending: false }).limit(6),
    supabase.from('testimonials').select('*').eq('published', true).order('created_at', { ascending: false }),
    supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('services').select('*').eq('published', true).order('order_index', { ascending: true }),
    supabase.from('faqs').select('*').eq('published', true).order('order_index', { ascending: true }),
  ])
  return {
    projects: (projectsRes.data ?? []) as Project[],
    testimonials: (testimonialsRes.data ?? []) as Testimonial[],
    posts: (postsRes.data ?? []) as BlogPost[],
    services: (servicesRes.data ?? []) as Service[],
    faqs: (faqsRes.data ?? []) as FAQ[],
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [{ projects, testimonials, posts, services, faqs }, settings] = await Promise.all([
    getData(),
    getSiteSettings(),
  ])

  return (
    <>
      <section id="hero">
        <Hero settings={settings} />
      </section>

      <section id="services">
        <Services services={services} />
      </section>

      <section id="about">
        <About settings={settings} />
      </section>

      <section id="why-choose-us">
        <WhyChooseUs />
      </section>

      <section id="portfolio">
        <Portfolio projects={projects} />
      </section>

      <section id="testimonials">
        <Testimonials testimonials={testimonials} />
      </section>

      <section id="blog">
        <BlogSection posts={posts} />
      </section>

      <section id="faq">
        <FAQSection faqs={faqs} />
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
