import type { SupabaseClient } from '@supabase/supabase-js'

type AuditLogInput = {
  userId?: string | null
  action: string
  resource: string
  resourceId?: string | null
  ip?: string | null
  metadata?: Record<string, unknown> | null
}

type MinimalSupabase = Pick<SupabaseClient, 'from'>

export async function writeAuditLog(
  supabase: MinimalSupabase,
  {
    userId = null,
    action,
    resource,
    resourceId = null,
    ip = null,
    metadata = null,
  }: AuditLogInput,
) {
  try {
    const { error } = await supabase.from('audit_logs').insert({
      user_id: userId,
      action,
      resource,
      resource_id: resourceId,
      ip,
      metadata: metadata ?? {},
    })

    if (error) {
      console.error('[audit] Failed to write audit log:', error)
    }
  } catch (error) {
    console.error('[audit] Unexpected audit log error:', error)
  }
}
