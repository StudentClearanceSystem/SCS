import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Program Head',
};

import { getStudentsTable } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import TableProgramHead from './TableProgramHead';
import SideNav from '@/app/components/SideNav';

interface Button {
  label: string;
  href: string;
}

// const assignTaskBtns: Button[] = [];

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
      <SideNav title={'Program head'} assignTaskBtns={[]} />
      <div className="flex-grow p-8">
        <header>
          <h3 className="ml-16 font-arimo text-2xl">Student Progress</h3>
          <h1 className="ml-16 font-arimo text-4xl font-bold">Program Head</h1>
        </header>
      </div>
      {/* Content area with scrolling */}
      <div className="flex-grow px-4 sm:px-6 lg:px-8">
        {/* Flex item with horizontal padding */}
        {/* Container covering the entire space */}
        <TableProgramHead students={students} />
      </div>
    </main>
  );
}
