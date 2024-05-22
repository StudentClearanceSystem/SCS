import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav';

import SetUserRoleTable from '@/app/users/admin/SetUserRoleTable';
import { getUser } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Admin',
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
  const users = await getUser();

  return (
    <div className="flex min-h-screen flex-col bg-blue-300">
      {/* Flex container covering the entire screen */}
      {/* Side navigation */}
      <SideNav title={'Admin'} assignTaskBtns={assignTaskBtns} />

      {/* Main content area */}
      <div className="flex-grow p-8">
        {/* Flex item growing to fill remaining space */}
        <header>
          <h1 className="ml-16 font-arimo text-4xl font-bold">Role Setter</h1>
        </header>
      </div>
      {/* Content area with scrolling */}
      <div className="flex-grow px-4 sm:px-6 lg:px-8">
        {/* Flex item with horizontal padding */}
        {/* Container covering the entire space */}
        <SetUserRoleTable users={users} />
      </div>
    </div>
  );
}
