'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Function to handle POST requests
export async function POST(req: Request) {
  const formData = await req.formData();
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return NextResponse.redirect('/error');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user?.role);

  if (!user) {
    return NextResponse.redirect('/');
  }

  const userRole = user.role;

  // Redirect based on user role
  switch (userRole) {
    case 'admin':
      return NextResponse.redirect(new URL('/users/admin', req.url));
    case 'cashier':
      return NextResponse.redirect(new URL('/users/cashier', req.url));
    case 'discipline':
      return NextResponse.redirect(new URL('/users/discipline', req.url));
    case 'guidance':
      return NextResponse.redirect(new URL('/users/guidance', req.url));
    case 'librarian':
      return NextResponse.redirect(new URL('/users/librarian', req.url));
    case 'mis':
      return NextResponse.redirect(new URL('/users/mis', req.url));
    case 'programhead':
      return NextResponse.redirect(new URL('/users/program-head', req.url));
    case 'purchasing':
      return NextResponse.redirect(new URL('/users/purchasing', req.url));
    case 'registrar':
      return NextResponse.redirect(new URL('/users/registrar', req.url));
    // Default case if role does not match any known role

    default:
      return NextResponse.redirect(new URL('/users', req.url));
  }
}
