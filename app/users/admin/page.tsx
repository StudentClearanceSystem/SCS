import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav';

import SetUserRoleTable from '@/app/users/admin/TableSetUserRole';
import { getUser } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin',
};

interface Button {
  label: string;
  href: string;
  subItems?: Button[];
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
    label: 'MIS',
    href: '/users/admin/mis',
  },
  {
    label: 'PROGRAM HEAD',
    href: '/users/admin/program_head',
  },
  {
    label: 'PURCHASING',
    href: '/users/admin/purchasing',
  },
  {
    label: 'REGISTRAR',
    href: '/users/admin/registrar',
    subItems: [
      {
        label: 'Clearance',
        href: '/users/admin/registrar',
      },
      {
        label: 'Modify Students',
        href: '/users/admin/registrar/modify_student',
      },
    ],
  },
];

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  const users = await getUser();

  return (
    <div className="flex min-h-screen flex-col bg-blue-bg">
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
