import { NextRequest, NextResponse } from 'next/server'
import { isExemptPath, shouldBlockForServiceExpiry } from '@/lib/service-expiry-guard'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isExemptPath(pathname)) {
    return NextResponse.next()
  }
  const blocked = await shouldBlockForServiceExpiry()
  if (blocked) {
    const url = request.nextUrl.clone()
    url.pathname = '/service-expired'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
