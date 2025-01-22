import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('middleware executed:', request.nextUrl.pathname);

  const token = request.cookies.get('todo-app-token');

  if (token && request.nextUrl.pathname.startsWith('/sign')) {
    console.log('Redirecting to /');
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/signup', '/signin'],
};