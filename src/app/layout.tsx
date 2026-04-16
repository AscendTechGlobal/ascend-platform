import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { getLocale } from 'next-intl/server'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ascendtechglobal.com'),
  title: {
    default: 'Ascend Tech Global',
    template: '%s | Ascend Tech Global',
  },
  description:
    'Automação, inteligência artificial e desenvolvimento de sistemas para empresas que querem crescer com eficiência, controle e escala.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Ascend Tech Global',
    title: 'Ascend Tech Global',
    description:
      'Automação, inteligência artificial e desenvolvimento de sistemas para empresas que querem crescer com eficiência, controle e escala.',
    url: 'https://ascendtechglobal.com',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ascend Tech Global',
    description:
      'Automação, inteligência artificial e desenvolvimento de sistemas para empresas que querem crescer com eficiência, controle e escala.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/**
 * Root layout — wraps every route (public, auth, admin).
 * Uses getLocale() from next-intl to set <html lang> dynamically per request.
 * Admin routes (outside [locale] segment) receive the default locale (pt-BR).
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // getLocale() reads the locale resolved by next-intl's request config.
  // For admin routes (outside [locale]) it returns the fallback (pt-BR).
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="space-bg min-h-screen antialiased">
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              border: '1px solid rgba(59,130,246,0.2)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  )
}
