import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

/**
 * next-intl plugin — points to the server-side request config.
 * This wires up the i18n/request.ts getRequestConfig export so that
 * every server request gets the correct locale + messages.
 */
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
const distDir = process.env.NEXT_DIST_DIR
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : ''

const csp = [
  "default-src 'self'",
  `connect-src 'self' ${supabaseOrigin} https://*.supabase.co wss://*.supabase.co`,
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  // Next.js relies on inline scripts for bootstrapping; allow in dev and
  // keep production functional until we introduce a nonce-based CSP.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== 'production' ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  process.env.NODE_ENV === 'production' ? 'upgrade-insecure-requests' : '',
]
  .filter(Boolean)
  .join('; ')

const nextConfig: NextConfig = {
  ...(distDir ? { distDir } : {}),
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
