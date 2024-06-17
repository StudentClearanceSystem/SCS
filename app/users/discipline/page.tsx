import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Discipline Office',
};

import { getStudentsTable } from '@/app/lib/utils';
import TableDiscipline from './TableDiscipline';

import SideNav from '@/app/components/SideNav';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface Button {
  label: string;
  href: string; // Adjust the type to accept a string for href
}

// const assignTaskBtns: Button[] = [];

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  const students = await getStudentsTable();

  return (
    <main className="no-scrollbar bg-blue-bg relative flex min-h-screen flex-col">
      <SideNav title={'DISCIPLINE'} assignTaskBtns={[]} />
      <div className="flex-grow p-8">
        <header>
          <h3 className="ml-16 font-arimo text-2xl">Student Progress</h3>
          <h1 className="ml-16 font-arimo text-4xl font-bold">
            Discipline Office Dashboard
          </h1>
        </header>
      </div>
      {/* Content area with scrolling */}
      <div className=" flex-grow px-4 sm:px-6 lg:px-8">
        {/* Flex item with horizontal padding */}
        {/* Container covering the entire space */}
        <TableDiscipline students={students} />
      </div>
    </main>
  );
}
