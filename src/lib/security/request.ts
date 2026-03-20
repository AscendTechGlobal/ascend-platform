import type { NextRequest } from 'next/server'

export function getClientIp(request: NextRequest | Request) {
  const headers = request.headers

  const forwardedFor =
    headers.get('cf-connecting-ip') ??
    headers.get('x-real-ip') ??
    headers.get('x-forwarded-for') ??
    ''

  const ip = forwardedFor.split(',')[0]?.trim()

  return ip || 'unknown'
}
