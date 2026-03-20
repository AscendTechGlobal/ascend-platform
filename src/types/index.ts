// ─── Database Types ──────────────────────────────────────────────────────────

export interface Profile {
  id: string
  full_name: string | null
  email: string
  role: 'admin' | 'editor' | 'viewer'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string | null
  cover_image: string | null
  gallery: string[] | null
  technologies: string[]
  client: string | null
  url: string | null
  featured: boolean
  published: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author: string
  tags: string[]
  published: boolean
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  order_index: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  content: string
  avatar: string | null
  rating: number
  published: boolean
  created_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order_index: number
  published: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  whatsapp_number: string | null
  email: string | null
  phone: string | null
  hero_title: string | null
  hero_subtitle: string | null
  hero_cta_text: string | null
  about_text: string | null
  social_links: Record<string, string> | null
  footer_text: string | null
  logo_url: string | null
  favicon_url: string | null
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  type: 'contact' | 'budget'
  status: 'new' | 'in_progress' | 'resolved' | 'spam'
  created_at: string
}

// ─── Form Types ──────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  type: 'contact' | 'budget'
}

// ─── Nav Types ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ─── Dashboard Types ─────────────────────────────────────────────────────────

export interface DashboardStats {
  total_leads: number
  new_leads: number
  total_projects: number
  total_posts: number
  published_projects: number
  published_posts: number
}
