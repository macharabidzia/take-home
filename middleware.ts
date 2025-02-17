// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('visitorToken');
  if (req.nextUrl.pathname.startsWith('/api') && token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }
  return NextResponse.next();
}
