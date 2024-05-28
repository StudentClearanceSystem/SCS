import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export function AddNewUser() {
  return (
    <Link href="/users/admin/addUser">
      <Button
        className="bg-primary text-background"
        endContent={<PlusIcon className="h-5 md:ml-4" />}
        size="sm"
      >
        <span className="hidden md:block">Add new</span>
      </Button>
    </Link>
  );
}
