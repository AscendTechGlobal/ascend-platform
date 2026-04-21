import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getClientIp } from '@/lib/security/request'
import { writeAuditLog } from '@/lib/security/audit'

const auditSchema = z.object({
  action: z.string().trim().min(3).max(120),
  resource: z.string().trim().min(2).max(120),
  resourceId: z.string().trim().max(120).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = auditSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid audit payload' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: auth } = await supabase.auth.getUser()

    if (!auth.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await writeAuditLog(supabase, {
      userId: auth.user.id,
      action: parsed.data.action,
      resource: parsed.data.resource,
      resourceId: parsed.data.resourceId,
      metadata: parsed.data.metadata,
      ip: getClientIp(request),
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[audit/route] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
