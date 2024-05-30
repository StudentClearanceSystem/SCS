import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session?.user.role);

  if (!session) {
    return NextResponse.rewrite(new URL('/', req.url));
  }

  const userRole = session.user.role;

  // Redirect based on user role
  if (userRole === 'admin') {
    return NextResponse.rewrite(new URL('users/admin', req.url));
  } else if (userRole === 'cashier') {
    return NextResponse.rewrite(new URL('users/cashier', req.url));
  } else if (userRole === 'discipline') {
    return NextResponse.rewrite(new URL('users/discipline', req.url));
  } else if (userRole === 'guidance') {
    return NextResponse.rewrite(new URL('users/guidance', req.url));
  } else if (userRole === 'librarian') {
    return NextResponse.rewrite(new URL('users/librarian', req.url));
  } else if (userRole === 'mis') {
    return NextResponse.rewrite(new URL('users/mis', req.url));
  } else if (userRole === 'programHead') {
    return NextResponse.rewrite(new URL('users/program-head', req.url));
  } else if (userRole === 'purchasing') {
    return NextResponse.rewrite(new URL('users/purchasing', req.url));
  } else if (userRole === 'registrar') {
    return NextResponse.rewrite(new URL('users/registrar', req.url));
  }

  // Default case if role does not match any known role
  return NextResponse.rewrite(new URL('/users', req.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|auth|users|.*\\.png$|favicon\\.ico$).*)',
  ],
};
