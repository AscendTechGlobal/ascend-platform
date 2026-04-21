-- ============================================================
-- Ascend Tech Global — Supabase Database Schema
-- Execute this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── PROJECTS (Portfolio) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  full_description  TEXT,
  cover_image       TEXT,
  gallery           TEXT[],
  technologies      TEXT[] DEFAULT '{}',
  client            TEXT,
  url               TEXT,
  featured          BOOLEAN NOT NULL DEFAULT false,
  published         BOOLEAN NOT NULL DEFAULT false,
  seo_title         TEXT,
  seo_description   TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── BLOG POSTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT,
  content         TEXT NOT NULL DEFAULT '',
  cover_image     TEXT,
  author          TEXT NOT NULL DEFAULT 'Ascend Tech Global',
  tags            TEXT[] DEFAULT '{}',
  published       BOOLEAN NOT NULL DEFAULT false,
  featured        BOOLEAN NOT NULL DEFAULT false,
  seo_title       TEXT,
  seo_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SERVICES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  published   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── TESTIMONIALS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  role       TEXT,
  company    TEXT,
  content    TEXT NOT NULL,
  avatar     TEXT,
  rating     INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  published  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── FAQS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.faqs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  published   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SITE SETTINGS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp_number TEXT,
  email          TEXT,
  phone          TEXT,
  hero_title     TEXT DEFAULT 'Empowering Your Business to Reach New Heights',
  hero_subtitle  TEXT DEFAULT 'Innovative Technology Solutions for Businesses Worldwide',
  hero_cta_text  TEXT DEFAULT 'Get Started',
  about_text     TEXT,
  social_links   JSONB DEFAULT '{}',
  footer_text    TEXT DEFAULT '© 2025 Ascend Tech Global. All rights reserved.',
  logo_url       TEXT,
  favicon_url    TEXT,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO public.site_settings (id)
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- ─── CONTACT SUBMISSIONS (Leads) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  company    TEXT,
  message    TEXT NOT NULL,
  type       TEXT NOT NULL DEFAULT 'contact' CHECK (type IN ('contact', 'budget')),
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'spam')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── AUDIT LOGS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action     TEXT NOT NULL,
  resource   TEXT NOT NULL,
  resource_id TEXT,
  ip         TEXT,
  metadata   JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── UPDATED_AT TRIGGER ───────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(order_index);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs         ENABLE ROW LEVEL SECURITY;

-- Helper: check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ── profiles RLS ──
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ── projects RLS ──
CREATE POLICY "Anyone can read published projects"
  ON public.projects FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL
  USING (public.is_admin());

-- ── blog_posts RLS ──
CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can manage posts"
  ON public.blog_posts FOR ALL
  USING (public.is_admin());

-- ── services RLS ──
CREATE POLICY "Anyone can read published services"
  ON public.services FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can manage services"
  ON public.services FOR ALL
  USING (public.is_admin());

-- ── testimonials RLS ──
CREATE POLICY "Anyone can read published testimonials"
  ON public.testimonials FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL
  USING (public.is_admin());

-- ── faqs RLS ──
CREATE POLICY "Anyone can read published FAQs"
  ON public.faqs FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can manage FAQs"
  ON public.faqs FOR ALL
  USING (public.is_admin());

-- ── site_settings RLS ──
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR ALL
  USING (public.is_admin());

-- ── contact_submissions RLS ──
CREATE POLICY "Anyone can insert contact submission"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage submissions"
  ON public.contact_submissions FOR ALL
  USING (public.is_admin());

-- ── audit_logs RLS ──
CREATE POLICY "Admins can read audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Authenticated users can insert own audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
    OR (auth.uid() IS NULL AND user_id IS NULL)
  );

-- ─── SEED DATA ────────────────────────────────────────────────
INSERT INTO public.services (title, description, icon, order_index) VALUES
  ('Tech Consulting', 'Expert guidance to optimize your business with cutting-edge technology solutions tailored to your needs.', 'Lightbulb', 1),
  ('Software Development', 'Custom software and applications built to your exact specifications with modern technologies.', 'Code2', 2),
  ('Cybersecurity', 'Protect your data and systems with future-proof security solutions and continuous monitoring.', 'Shield', 3),
  ('Cloud Solutions', 'Scalable and secure cloud services to streamline your operations and reduce infrastructure costs.', 'Cloud', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.testimonials (name, role, company, content, rating) VALUES
  ('Carlos Mendes', 'CEO', 'TechStart Brasil', 'A Ascend Tech Global transformou nossa infraestrutura tecnológica. Profissionalismo e competência acima da média.', 5),
  ('Ana Paula Costa', 'Diretora de TI', 'Grupo Nexus', 'Excelente trabalho na implementação da nossa solução cloud. Equipe dedicada e altamente qualificada.', 5),
  ('Roberto Silva', 'Fundador', 'InovaCom', 'Aumentamos nossa eficiência operacional em 40% após a consultoria da Ascend. Resultados reais e mensuráveis.', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.faqs (question, answer, order_index) VALUES
  ('Quanto tempo leva um projeto de desenvolvimento?', 'O prazo varia conforme a complexidade. Projetos simples levam 2-4 semanas, enquanto plataformas completas podem levar 3-6 meses. Fornecemos um cronograma detalhado na proposta.', 1),
  ('Vocês oferecem suporte após a entrega?', 'Sim! Oferecemos planos de suporte e manutenção contínuos para garantir que sua solução continue funcionando perfeitamente.', 2),
  ('Quais tecnologias vocês utilizam?', 'Trabalhamos com as tecnologias mais modernas: Next.js, React, TypeScript, Node.js, Python, AWS, Google Cloud, entre outras.', 3),
  ('Como funciona o processo de orçamento?', 'Entre em contato via formulário ou WhatsApp. Fazemos uma reunião de diagnóstico gratuita e enviamos uma proposta detalhada em até 48h.', 4)
ON CONFLICT DO NOTHING;
