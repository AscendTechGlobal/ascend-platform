import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getClientIp } from '@/lib/security/request'
import { checkRateLimit } from '@/lib/security/rate-limit'
import { writeAuditLog } from '@/lib/security/audit'

const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(6).max(200),
})

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rateLimit = await checkRateLimit({
      key: ip,
      limit: 5,
      windowMs: 15 * 60 * 1000,
      prefix: 'login',
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))),
          },
        },
      )
    }

    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Credenciais invalidas.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data)

    if (error || !data.user) {
      await writeAuditLog(supabase, {
        action: 'auth.login.failure',
        resource: 'session',
        ip,
        metadata: {
          email: parsed.data.email.toLowerCase(),
        },
      })

      return NextResponse.json({ error: 'Credenciais invalidas.' }, { status: 401 })
    }

    await writeAuditLog(supabase, {
      userId: data.user.id,
      action: 'auth.login.success',
      resource: 'session',
      ip,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[auth/login] Unexpected error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
