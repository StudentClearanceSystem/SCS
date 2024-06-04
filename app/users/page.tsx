import { Metadata } from 'next';
import SideNav from '../components/SideNav';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'users',
};
interface Button {
  label: string;
  href: string; // Adjust the type to accept a string for href
}

const assignTaskBtns: Button[] = [];

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className=" h-screen bg-blue-200">
      <SideNav title={'User'} assignTaskBtns={assignTaskBtns} />
      <div className=" p-20 text-center">
        <h1>you are now logined</h1>
        <h1>please contact admin to set your role then refresh this page</h1>
      </div>
    </main>
  );
}
