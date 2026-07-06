import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/agape/adminAuth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage =
    pathname.startsWith('/agape/admin') && pathname !== '/agape/admin/login';

  const isPublicViewPing =
    request.method === 'POST' &&
    /^\/api\/products\/[^/]+\/(view|comments)$/.test(pathname);

  const isProtectedApi =
    !isPublicViewPing &&
    ((pathname.startsWith('/api/products') && request.method !== 'GET') ||
      (pathname.startsWith('/api/blog') && request.method !== 'GET') ||
      (pathname.startsWith('/api/pepas') && request.method !== 'GET') ||
      (pathname.startsWith('/api/orders') && request.method === 'GET'));

  if (!isAdminPage && !isProtectedApi) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (valid) return NextResponse.next();

  if (isProtectedApi) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const loginUrl = new URL('/agape/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/agape/admin/:path*',
    '/agape/admin',
    '/api/products/:path*',
    '/api/products',
    '/api/blog/:path*',
    '/api/blog',
    '/api/pepas/:path*',
    '/api/pepas',
    '/api/orders',
  ],
};
