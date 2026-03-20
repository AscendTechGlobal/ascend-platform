/**
 * Combined middleware: next-intl locale routing + Supabase auth protection.
 *
 * Execution order per request:
 *  1. /api/**    → pass-through (no i18n, no auth overhead)
 *  2. /admin/**  → Supabase session check only (admin lives outside locale routing)
 *                  unauthenticated → redirect to /{preferredLocale}/login
 *  3. Everything else → next-intl handles locale detection + URL rewriting
 *                        + sets NEXT_LOCALE cookie automatically
 *     - Auth pages already under locale → redirect logged-in users to /admin
 *
 * Locale detection order (managed by next-intl):
 *  1. NEXT_LOCALE cookie  (persisted manual preference)
 *  2. Accept-Language header  (browser preference)
 *  3. Fallback: pt-BR
 */
import createMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { routing, locales, defaultLocale, type Locale } from '@/i18n/routing'

// ── next-intl locale routing handler ─────────────────────────────────────────
const handleI18nRouting = createMiddleware(routing)

// ── Detect the user's preferred locale (for admin → login redirect) ───────────
function getPreferredLocale(req: NextRequest): Locale {
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }
  const acceptLang = req.headers.get('accept-language') ?? ''
  const primary = acceptLang.split(',')[0]?.trim().toLowerCase() ?? ''
  if (primary.startsWith('en')) return 'en'
  if (primary.startsWith('es')) return 'es'
  return defaultLocale
}

// ── Main middleware ───────────────────────────────────────────────────────────
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ① API routes — skip everything
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // ② Admin routes — Supabase auth only, no locale prefix
  if (pathname.startsWith('/admin')) {
    let res = NextResponse.next({ request: req })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),
          setAll: (toSet) => {
            toSet.forEach(({ name, value }) => req.cookies.set(name, value))
            res = NextResponse.next({ request: req })
            toSet.forEach(({ name, value, options }) =>
              res.cookies.set(name, value, options),
            )
          },
        },
      },
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const locale = getPreferredLocale(req)
      const url = req.nextUrl.clone()
      url.pathname = `/${locale}/login`
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.role !== 'admin') {
      const locale = getPreferredLocale(req)
      const url = req.nextUrl.clone()
      url.pathname = `/${locale}`
      return NextResponse.redirect(url)
    }

    return res
  }

  // ③ All public/auth routes — let next-intl handle locale routing
  const i18nRes = handleI18nRouting(req)

  // If next-intl is redirecting (e.g. / → /pt-BR/), return immediately.
  if (i18nRes.status >= 300 && i18nRes.status < 400) {
    return i18nRes
  }

  // ④ Auth pages inside locale → redirect already-authenticated users to /admin
  const isAuthPage = /^\/(pt-BR|en|es)\/(login|recuperar-senha)/.test(pathname)
  if (isAuthPage) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),
          setAll: () => {},
        },
      },
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
