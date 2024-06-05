import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase client with your Supabase project URL and API key
const supabase = createClient(
  'https://okfyjbcuaylkviibcbnv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZnlqYmN1YXlsa3ZpaWJjYm52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzE0MTMwOCwiZXhwIjoyMDMyNzE3MzA4fQ.vgTptaS-ec2MLj--xmXMraubsRuL2slqwcGFV28edps',
);

export async function POST(req: NextRequest) {
  const formData = await req.json(); // Assuming you're sending JSON data from the frontend
  const { name, email, password, role } = formData;

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
