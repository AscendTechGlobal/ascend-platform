import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'
import { writeAuditLog } from '@/lib/security/audit'

export async function POST(request: NextRequest) {
  const contactSchema = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(40).optional().or(z.literal('')),
    message: z.string().trim().min(10).max(4000),
    type: z.enum(['contact', 'budget']),
  })

  try {
    const ip = getClientIp(request)
    const rateLimit = await checkRateLimit({
      key: ip,
      limit: 8,
      windowMs: 15 * 60 * 1000,
      prefix: 'contact',
    })

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))),
          },
        },
      )
    }

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
    }

    const { name, email, phone, message, type } = parsed.data
    const supabase = await createClient()

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone: phone ?? null,
      message,
      type,
      status: 'new',
    })

    if (error) {
      console.error('[contact/route] Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 })
    }

    await writeAuditLog(supabase, {
      action: 'contact.submission.created',
      resource: 'contact_submission',
      ip,
      metadata: {
        email,
        type,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Submission received' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[contact/route] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
