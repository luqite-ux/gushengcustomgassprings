import crypto from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'
import { TENANT_ID } from '@/lib/supabase'

function redirectError(req: NextRequest, message: string) {
  const url = new URL('/admin/login', req.url)
  url.searchParams.set('error', message)
  return NextResponse.redirect(url, 303)
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let email = ''
    let password = ''

    if (contentType.includes('application/json')) {
      const body = await req.json()
      email = String(body.email || '').trim().toLowerCase()
      password = String(body.password || '')
    } else {
      const form = await req.formData()
      email = String(form.get('email') || '').trim().toLowerCase()
      password = String(form.get('password') || '')
    }

    if (!email || !password) {
      return redirectError(req, 'Email and password are required.')
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      return redirectError(req, 'Authentication service is temporarily unavailable.')
    }

    const sb = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const { data: user, error: userErr } = await sb
      .from('admin_users')
      .select('id, email, password_hash, tenant_id, is_active')
      .eq('email', email)
      .eq('tenant_id', TENANT_ID)
      .eq('is_active', true)
      .maybeSingle()

    if (userErr || !user || !user.password_hash) {
      return redirectError(req, 'Invalid email or password.')
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return redirectError(req, 'Invalid email or password.')
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const { error: sessErr } = await sb.from('admin_user_sessions').insert({
      admin_user_id: user.id,
      token,
      expires_at: expiresAt,
      user_agent: userAgent,
    })

    if (sessErr) {
      return redirectError(req, 'Could not initialize administrator session.')
    }

    const res = NextResponse.redirect(new URL('/admin', req.url), 303)
    const isProd = process.env.NODE_ENV === 'production'
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    res.cookies.set(TENANT_COOKIE, user.tenant_id || TENANT_ID, {
      httpOnly: false,
      sameSite: 'lax',
      secure: isProd,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return res
  } catch {
    return redirectError(req, 'Sign-in request failed. Please try again.')
  }
}
