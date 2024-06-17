import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MIS',
};

import { getStudentsTable } from '@/app/lib/utils';
import TableMIS from './TableMIS';
import SideNav from '@/app/components/SideNav';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface Button {
  label: string;
  href: string;
}

const assignTaskBtns: Button[] = [
  {
    label: 'ADMIN',
    href: '/users/admin',
  },
  {
    label: 'CASHIER',
    href: '/users/admin/cashier',
  },
  {
    label: 'DISCIPLINE',
    href: '/users/admin/discipline',
  },
  {
    label: 'GUIDANCE',
    href: '/users/admin/guidance',
  },
  {
    label: 'LIBRARIAN',
    href: '/users/admin/librarian',
  },
  {
    label: 'DISCIPLINE',
    href: '/users/admin/discipline',
  },
  {
    label: 'MIS',
    href: '/users/admin/mis',
  },
  {
    label: 'PROGRAMHEAD',
    href: '/users/admin/program_head',
  },
  {
    label: 'PURCHASING',
    href: '/users/admin/purchasing',
  },
  {
    label: 'REGISTRAR',
    href: '/users/admin/registrar',
  },
];
export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  const students = await getStudentsTable();

  // Set up real-time updates for students table
  supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'table_students',
      },
      async (payload) => {
        console.log('Change received:', payload);
        const updatedStudents = await getStudentsTable();
        console.log('Updated students:', updatedStudents);
        // You might want to send the updatedStudents data to the client side
      },
    )
    .subscribe();

  return (
    <main className="no-scrollbar relative flex min-h-screen flex-col bg-blue-bg">
      <div className=" z-50">
        <SideNav title={'ADMIN'} assignTaskBtns={assignTaskBtns} />
      </div>

      <div className="flex-grow p-8">
        <header>
          <h3 className="ml-16 font-arimo text-2xl">Student Progress</h3>
          <h1 className="ml-16 font-arimo text-4xl font-bold">MIS Dashboard</h1>
        </header>
      </div>
      {/* Content area with scrolling */}
      <div className="flex-grow px-4 sm:px-6 lg:px-8">
        {/* Flex item with horizontal padding */}
        {/* Container covering the entire space */}
        <TableMIS students={students} />
      </div>
    </main>
  );
}
