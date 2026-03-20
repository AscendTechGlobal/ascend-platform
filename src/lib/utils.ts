import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(dateString: string, locale = 'pt-BR'): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (!cleaned) return '#'
  const base = `https://wa.me/${cleaned}`
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`
  }
  return base
}

export function normalizeText(value?: string | null): string | null {
  const normalized = value?.trim()
  return normalized ? normalized : null
}

export function normalizeEmail(value?: string | null): string | null {
  const normalized = normalizeText(value)
  return normalized ? normalized.toLowerCase() : null
}

export function normalizePhone(value?: string | null): string | null {
  return normalizeText(value)
}

export function normalizeExternalUrl(value?: string | null): string | null {
  const normalized = normalizeText(value)
  if (!normalized) return null

  if (/^https?:\/\//i.test(normalized)) {
    return normalized
  }

  return `https://${normalized}`
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
