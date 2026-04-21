import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getClientIp } from '@/lib/security/request'
import { checkRateLimit } from '@/lib/security/rate-limit'
import { writeAuditLog } from '@/lib/security/audit'

const recoverySchema = z.object({
  email: z.string().trim().email().max(200),
  locale: z.string().trim().min(2).max(10),
  origin: z.string().trim().url(),
})

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rateLimit = await checkRateLimit({
      key: ip,
      limit: 3,
      windowMs: 15 * 60 * 1000,
      prefix: 'recovery',
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
    const parsed = recoverySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Solicitacao invalida.' }, { status: 400 })
    }

    const supabase = await createClient()
    const redirectTo = `${parsed.data.origin}/${parsed.data.locale}/redefinir-senha`
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo,
    })

    if (error) {
      return NextResponse.json({ error: 'Nao foi possivel processar a recuperacao.' }, { status: 500 })
    }

    await writeAuditLog(supabase, {
      action: 'auth.recovery.requested',
      resource: 'session',
      ip,
      metadata: {
        email: parsed.data.email.toLowerCase(),
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[auth/recovery] Unexpected error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
