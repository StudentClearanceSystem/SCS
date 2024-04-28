import { Metadata } from 'next';
import SideNav from '@/app/components/SideNav'; // adjust the import path as per your project structure
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchInvoicesPages } from '@/app/lib/data';

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

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="flex flex-col bg-blue-300">
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
        <div className="h-full w-full overflow-y-auto">
          {/* Container covering the entire space */}
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-1">
            <Search placeholder="Search..." />
          </div>
          <Suspense
            key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
          >
            <div className="min-h-40 overflow-hidden">
              {/* Ensure table fills the container */}
              <Table query={query} currentPage={currentPage} />
            </div>
          </Suspense>
          <div className="mt-3 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
