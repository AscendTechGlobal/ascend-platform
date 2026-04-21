'use client'

type AuditClientPayload = {
  action: string
  resource: string
  resourceId?: string
  metadata?: Record<string, unknown>
}

export function queueAuditLog(payload: AuditClientPayload) {
  const body = JSON.stringify(payload)

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' })

      if (navigator.sendBeacon('/api/audit', blob)) {
        return
      }
    }
  } catch {
    // Fall through to fetch when sendBeacon is unavailable or rejected.
  }

  void fetch('/api/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    credentials: 'same-origin',
    keepalive: true,
  })
}
