import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Discipline Office',
};

import SideNav from '@/app/components/SideNav';

interface Button {
  label: string;
  href: string; // Adjust the type to accept a string for href
}

// const assignTaskBtns: Button[] = [];

export default function Page() {
  return (
    <div className="flex h-screen" style={{ backgroundColor: '#A094AE' }}>
      <SideNav title={'DISCIPLINE'} assignTaskBtns={[]} />
      <div className="flex-grow p-8">
        <header>
          <h3 className="ml-16 font-arimo text-2xl">Student Progress</h3>
          <h1 className="ml-16 font-arimo text-4xl font-bold">
            Discipline Office Dashboard
          </h1>
        </header>
      </div>
    </div>
  );
}
