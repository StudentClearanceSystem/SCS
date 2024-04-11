import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav'; // adjust the import path as per your project structure

export const metadata: Metadata = {
  title: 'Admin',
};

export default function Page() {
  return (
    <div className="flex h-screen bg-blue-300">
      <SideNav />
      <div className="flex-grow p-8">
        <header>
          <h1 className="font-arimo text-6xl font-bold">Role Setter</h1>
        </header>
      </div>
    </div>
  );
}
