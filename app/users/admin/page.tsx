import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav'; // adjust the import path as per your project structure

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
  //   // If want to add another button
  //   {
  //     label: 'Assign Task 2',
  //     href: '/users', // Provide the href for the Link component
  //   },
];

export default function Page() {
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
