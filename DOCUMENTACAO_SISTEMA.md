# Documentacao do Sistema

## Visao Geral

O projeto `ascend-web` e uma aplicacao Next.js 16 com App Router, internacionalizacao com `next-intl`, autenticacao e banco com Supabase, painel administrativo e site publico institucional.

O sistema foi estruturado para atender dois contextos principais:

1. Site publico multilanguage para apresentacao da Ascend Tech Global.
2. Dashboard administrativo para operacao de conteudo, configuracoes e pipeline comercial.

## Stack Principal

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Next Intl
- Supabase SSR e Supabase JS
- React Hook Form
- Zod
- Sonner

## Estrutura Criada

### Aplicacao Publica

Rotas principais em `src/app/[locale]/(public)`:

- Home
- Sobre
- Servicos
- Portfolio
- Blog
- Contato

Layout publico:

- [src/app/[locale]/(public)/layout.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/%5Blocale%5D/(public)/layout.tsx)

Secoes reutilizaveis:

- [src/components/sections/Hero.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/Hero.tsx)
- [src/components/sections/About.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/About.tsx)
- [src/components/sections/Services.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/Services.tsx)
- [src/components/sections/Portfolio.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/Portfolio.tsx)
- [src/components/sections/Testimonials.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/Testimonials.tsx)
- [src/components/sections/BlogSection.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/BlogSection.tsx)
- [src/components/sections/FAQ.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/FAQ.tsx)
- [src/components/sections/ContactSection.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/sections/ContactSection.tsx)

Componentes globais do site:

- [src/components/layout/Navbar.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/layout/Navbar.tsx)
- [src/components/layout/Footer.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/layout/Footer.tsx)
- [src/components/layout/BrandWordmark.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/layout/BrandWordmark.tsx)
- [src/components/ui/LanguageSwitcher.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/components/ui/LanguageSwitcher.tsx)

### Autenticacao

Rotas de autenticacao em `src/app/[locale]/(auth)`:

- Login
- Recuperacao de senha
- Redefinicao de senha

APIs relacionadas:

- [src/app/api/auth/login/route.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/api/auth/login/route.ts)
- [src/app/api/auth/recovery/route.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/api/auth/recovery/route.ts)

### Dashboard Administrativo

Area administrativa em `src/app/(admin)/admin` com:

- Overview
- Leads
- Projetos
- Blog
- Servicos
- Depoimentos
- FAQs
- Configuracoes

Layout administrativo:

- [src/app/(admin)/admin/layout.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/(admin)/admin/layout.tsx)

Recursos operacionais:

- Gestao de leads e contatos
- CRUD de projetos
- CRUD de blog
- CRUD de servicos
- CRUD de depoimentos
- CRUD de FAQs
- Tela de configuracoes globais do site

### APIs

Rotas de API criadas:

- [src/app/api/contact/route.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/api/contact/route.ts)
- [src/app/api/audit/route.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/api/audit/route.ts)
- Login
- Recuperacao de senha

### Internacionalizacao

Arquivos principais:

- [src/i18n/request.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/i18n/request.ts)
- [src/i18n/routing.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/i18n/routing.ts)
- [messages/pt-BR.json](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/messages/pt-BR.json)
- [messages/en.json](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/messages/en.json)
- [messages/es.json](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/messages/es.json)

Idiomas suportados:

- pt-BR
- en
- es

### Banco de Dados

Schema principal em:

- [supabase/schema.sql](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/supabase/schema.sql)

Entidades principais:

- `profiles`
- `projects`
- `blog_posts`
- `services`
- `testimonials`
- `faqs`
- `site_settings`
- `contact_submissions`
- `audit_logs`

### Seguranca e Infra de Suporte

Bibliotecas e modulos:

- [src/lib/security/rate-limit.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/security/rate-limit.ts)
- [src/lib/security/audit.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/security/audit.ts)
- [src/lib/security/audit-client.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/security/audit-client.ts)
- [src/lib/security/request.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/security/request.ts)

## Ligacao Entre Dashboard e Site

As configuracoes globais do painel sao carregadas pela tabela `site_settings` e consumidas no frontend publico por:

- [src/lib/site-settings.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/site-settings.ts)
- [src/app/[locale]/(public)/page.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/%5Blocale%5D/(public)/page.tsx)
- [src/app/[locale]/(public)/layout.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/%5Blocale%5D/(public)/layout.tsx)
- [src/app/[locale]/(public)/contato/page.tsx](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/%5Blocale%5D/(public)/contato/page.tsx)

Campos conectados:

- `hero_title`
- `hero_subtitle`
- `hero_cta_text`
- `about_text`
- `footer_text`
- `email`
- `phone`
- `whatsapp_number`
- `social_links`

## Ajustes Recentes Aplicados

### Conteudo e ligacao com dashboard

- Normalizacao de email, telefone, WhatsApp e URLs sociais.
- Correcoes para o `footer_text` ser usado no rodape final.
- Rotas publicas configuradas como dinamicas para evitar versoes desatualizadas em diferentes navegadores.

### Contato e rodape

- Correcoes em links clicaveis no rodape e na pagina de contato.
- Correcao de tipagem para links sociais que quebravam o build de producao.

### Marca e identidade visual

- Criado `BrandWordmark` para centralizar o nome da marca.
- Wordmark em gradiente aplicado ao topo e rodape.
- Imagem principal ampliada no hero.
- Mesma imagem aplicada na sidebar do admin e no logo superior do site.

## Estado Atual da Revisao

Validacoes executadas:

- `npm run build`: ok
- `npm run lint`: ainda possui pendencias em alguns arquivos administrativos e de configuracao

Pendencias identificadas na revisao:

- Ajustar warnings e erros de lint em paginas administrativas.
- Migrar `middleware` para `proxy` conforme aviso do Next.js 16.
- Revisar textos fixos em ingles que ainda podem existir como valor default salvo em banco.

## Arquivos de Apoio Importantes

- [src/types/index.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/types/index.ts)
- [src/lib/utils.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/utils.ts)
- [src/lib/site-settings.ts](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/lib/site-settings.ts)
- [src/app/globals.css](/home/weber/WEBER/PROJETOS/ASCEND%20TECH%20GLOBAL/ascend-web/src/app/globals.css)

