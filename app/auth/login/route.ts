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
  if (userRole === 'admin') {
    return NextResponse.redirect(new URL('/users/admin', req.url));
  } else if (userRole === 'cashier') {
    return NextResponse.redirect(new URL('/users/cashier', req.url));
  } else if (userRole === 'discipline') {
    return NextResponse.redirect(new URL('/users/discipline', req.url));
  } else if (userRole === 'guidance') {
    return NextResponse.redirect(new URL('/users/guidance', req.url));
  } else if (userRole === 'librarian') {
    return NextResponse.redirect(new URL('/users/librarian', req.url));
  } else if (userRole === 'mis') {
    return NextResponse.redirect(new URL('/users/mis', req.url));
  } else if (userRole === 'programHead') {
    return NextResponse.redirect(new URL('/users/program-head', req.url));
  } else if (userRole === 'purchasing') {
    return NextResponse.redirect(new URL('/users/purchasing', req.url));
  } else if (userRole === 'registrar') {
    return NextResponse.redirect(new URL('/users/registrar', req.url));
  }

  // Default case if role does not match any known role
  return NextResponse.redirect(new URL('/users', req.url));
}
