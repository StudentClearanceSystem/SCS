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

const assignTaskBtns: Button[] = [
  {
    label: 'Role Setter',
    href: '/users/admin', // Provide the href for the Link component
  },
  // If want to add another button
  {
    label: 'cashier',
    href: '/users/cashier', // Provide the href for the Link component
  },
  // If want to add another button
  {
    label: 'Assign Task 2',
    href: '/users', // Provide the href for the Link component
  },
];

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <>
      <SideNav title={'User'} assignTaskBtns={assignTaskBtns} />

      <h1>you are now logined</h1>
      <h1>users contact admin to set your role then refresh this page</h1>
    </>
  );
}
