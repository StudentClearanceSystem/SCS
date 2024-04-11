'use client';
// import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

// export const metadata: Metadata = {
//   title: 'Admin',
// };

interface Button {
  label: string;
  onClick: () => void;
}

export default function Page() {
  const router = useRouter();

  function redirectToAdminPage() {
    router.push('/users/admin');
  }

  const assignTaskBtns: Button[] = [
    {
      label: 'Role Setter',
      onClick: redirectToAdminPage,
    },
  ];

  return (
    <div className="flex h-screen bg-blue-300">
      <SideNav title={'Admin'} assignTaskBtns={assignTaskBtns} />
      <div className="flex-grow p-8">
        <header>
          <h1 className="font-arimo ml-16 text-4xl font-bold">Role Setter</h1>
        </header>
      </div>
    </div>
  );
}
