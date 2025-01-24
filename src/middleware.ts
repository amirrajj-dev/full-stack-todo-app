import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//we use this custom function cause The edge runtime does not support Node.js 'crypto' module .
function decodeJwt(token: string) {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

export function middleware(request: NextRequest) {
  console.log('middleware executed:', request.nextUrl.pathname);

  const token = request.cookies.get('todo-app-token');

  if (token) {
    try {
      const decodedToken = decodeJwt(token.value);
      console.log(decodedToken);

      // Check if the token is expired
      const expiration = decodedToken.exp * 1000;
      if (Date.now() > expiration) {
        console.log('Token is expired');
        // Allow access to signin/signup pages if token is expired
        return NextResponse.next();
      }

      // If the token is valid, redirect from signin and signup pages
      if (request.nextUrl.pathname.startsWith('/sign')) {
        console.log('Redirecting to /');
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.log('Failed to decode token:', error);
      // Allow access to signin/signup pages if decoding fails
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/signup', '/signin'],
};