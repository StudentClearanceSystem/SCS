import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav';

import SetUserRoleTable from '@/app/users/admin/TableSetUserRole';
import { getUser } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Admin',
};

interface Button {
  label: string;
  href: string;
}

const assignTaskBtns: Button[] = [
  {
    label: 'Role Setter',
    href: '/users/admin',
  },
  {
    label: 'Cashier',
    href: '/users/cashier',
  },
  {
    label: 'Assign Task 2',
    href: '/users',
  },
];

export default async function Page() {
  const users = await getUser();

  return (
    <div className="flex min-h-screen flex-col bg-blue-300">
      <SideNav title={'Admin'} assignTaskBtns={assignTaskBtns} />

      <div className="flex-grow p-8">
        <header>
          <h1 className="ml-16 font-arimo text-4xl font-bold">Role Setter</h1>
        </header>
      </div>

      <div className="flex-grow px-4 sm:px-6 lg:px-8">
        <SetUserRoleTable initialUsers={users} />
      </div>
    </div>
  );
}
