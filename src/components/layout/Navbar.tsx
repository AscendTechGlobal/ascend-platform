'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useTranslations } from '@/lib/i18n'
import { Link, usePathname } from '@/i18n/navigation'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import BrandWordmark from '@/components/layout/BrandWordmark'

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 select-none">
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_12px_30px_rgba(88,28,135,0.22)]">
        <Image
          src="/file_000.png"
          alt="Ascend Tech Global"
          width={80}
          height={100}
          priority
          className="h-[120%] w-[120%] object-contain"
        />
      </span>
      <BrandWordmark className="text-base sm:text-lg" />
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('nav')

  const navLinks = [
    { label: t('home'), href: '/' as const },
    { label: t('about'), href: '/sobre' as const },
    { label: t('services'), href: '/servicos' as const },
    { label: t('portfolio'), href: '/portfolio' as const },
    { label: t('blog'), href: '/blog' as const },
    { label: t('contact'), href: '/contato' as const },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={[
          'mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-[1.35rem] border px-4 sm:px-5',
          'backdrop-blur-2xl transition-all duration-300',
          scrolled
            ? 'border-white/12 bg-[rgba(8,10,18,0.78)] shadow-[0_18px_60px_rgba(4,9,28,0.28)]'
            : 'border-white/8 bg-[rgba(8,10,18,0.55)]',
        ].join(' ')}
      >
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'relative rounded-full px-4 py-2 text-sm font-medium tracking-[-0.01em] transition-all duration-200',
                isActive(link.href)
                  ? 'text-white'
                  : 'text-white/58 hover:text-white',
              ].join(' ')}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <Link href="/login" className="hidden md:block">
            <span className="btn-orange rounded-2xl px-5 py-2.5 text-sm">{t('login')}</span>
          </Link>

          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-2xl border border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:text-white"
                  />
                }
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('openMenu')}</span>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 border-l border-white/10 bg-[rgba(8,10,18,0.94)] p-0 text-white backdrop-blur-2xl"
                showCloseButton={true}
              >
                <SheetHeader className="border-b border-white/8 p-6">
                  <SheetTitle className="sr-only">{t('menuTitle')}</SheetTitle>
                  <Logo />
                </SheetHeader>

                <nav className="flex flex-col gap-2 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        'rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                        isActive(link.href)
                          ? 'border-white/12 bg-white/[0.08] text-white'
                          : 'border-transparent bg-white/[0.02] text-white/62 hover:border-white/10 hover:bg-white/[0.05] hover:text-white',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="px-4 pb-3">
                  <LanguageSwitcher />
                </div>

                <div className="px-4 pb-6">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="block">
                    <span className="btn-orange flex w-full rounded-2xl px-5 py-3 text-sm">
                      {t('login')}
                    </span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
