import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (token) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (supabaseUrl && serviceKey) {
        const sb = createClient(supabaseUrl, serviceKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
        await sb.from('admin_user_sessions').delete().eq('token', token)
      }
    } catch {
      // Best-effort session cleanup
    }
  }

  const res = NextResponse.redirect(new URL('/admin/login', req.url), 303)
  res.cookies.delete(SESSION_COOKIE)
  res.cookies.delete(TENANT_COOKIE)
  return res
}
