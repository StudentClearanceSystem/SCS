import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MIS',
};

import { getStudentsTable } from '@/app/lib/utils';
import TableMIS from './TableMIS';
import SideNav from '@/app/components/SideNav';

interface Button {
  label: string;
  href: string; // Adjust the type to accept a string for href
}

// const assignTaskBtns: Button[] = [];

export default async function Page() {
  const students = await getStudentsTable();

  return (
    <main
      className="no-scrollbar flex min-h-screen flex-col"
      style={{ backgroundColor: '#A2BCD3' }}
    >
      <SideNav title={'M.I.S.'} assignTaskBtns={[]} />
      <div className="flex-grow p-8">
        <header>
          <h3 className="ml-16 font-arimo text-2xl">Student Progress</h3>
          <h1 className="ml-16 font-arimo text-4xl font-bold">MIS Dashboard</h1>
        </header>
      </div>
      {/* table div to copy */}
      {/* Content area with scrolling */}
      <div className=" flex-grow px-4 sm:px-6 lg:px-8">
        {/* Flex item with horizontal padding */}
        {/* Container covering the entire space */}
        <TableMIS students={students} />
      </div>
      {/* table div to copy */}
    </main>
  );
}
