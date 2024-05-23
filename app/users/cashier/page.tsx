import SideNav from '@/app/components/SideNav';

import { Metadata } from 'next';
import CashierTable from './TableCashier';
import { getUser } from '@/app/lib/utils';
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
  const users = await getUser();

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
        <CashierTable users={users} />
      </div>
    </main>
  );
}
