/**
 * Locale-aware navigation helpers.
 *
 * Use these instead of next/link and next/navigation in public/auth pages
 * so that locale is automatically prepended to all paths.
 *
 * Example:
 *   import { Link, usePathname, useRouter } from '@/i18n/navigation'
 *   <Link href="/sobre">Sobre</Link>  →  renders as /pt-BR/sobre (or /en/sobre etc.)
 *
 * Note: Admin pages (outside [locale]) should still use next/link directly.
 */
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
