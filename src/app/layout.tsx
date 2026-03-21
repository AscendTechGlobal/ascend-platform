import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { getLocale } from 'next-intl/server'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ascendtechglobal.com'),
  title: 'Ascend Tech Global',
  description:
    'Automação, inteligência artificial e desenvolvimento de sistemas para empresas que querem crescer com eficiência, controle e escala.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
              background: '#0a1628',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  )
}
