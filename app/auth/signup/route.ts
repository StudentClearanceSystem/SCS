import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  const formData = await req.json(); // Assuming you're sending JSON data from the frontend
  const { name, email, password, role } = formData;

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  try {
    // Create the user account in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      console.error(error);
      return NextResponse.error();
    }

    // If the user account is created successfully
    if (data) {
      console.log(data);

      // Return a success response
      return NextResponse.json({ message: 'User signed up successfully!' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
