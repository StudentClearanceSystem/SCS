import SideNav from '@/app/components/SideNav';

import { Metadata } from 'next';
import TableCashier from './TableCashier';
import { getStudentsTable } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Cashier',
};

interface Button {
  label: string;
  href: string; // Adjust the type to accept a string for href
}

const assignTaskBtns: Button[] = [
  // {
  //   label: 'Role Setter',
  //   href: '/users/admin', // Provide the href for the Link component
  // },
  // If want to add another button
  {
    label: 'cashier',
    href: '/users/cashier', // Provide the href for the Link component
  },
];

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  const students = await getStudentsTable();

  return (
    <main
      className="no-scrollbar flex min-h-screen flex-col"
      style={{ backgroundColor: '#7DA4AE' }}
    >
      <SideNav title={'Cashier'} assignTaskBtns={assignTaskBtns} />
      <div className="flex-grow p-8">
        <header>
          <h3 className="ml-16 font-arimo text-2xl">Student Progress</h3>
          <h1 className="ml-16 font-arimo text-4xl font-bold">
            Cashier’s Office Dashboard
          </h1>
        </header>
      </div>
      {/* Content area with scrolling */}
      <div className=" flex-grow px-4 sm:px-6 lg:px-8">
        {/* Flex item with horizontal padding */}
        {/* Container covering the entire space */}
        <TableCashier students={students} />
      </div>
    </main>
  );
}
