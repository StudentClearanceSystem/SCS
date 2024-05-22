import DropdownComponent from '@/app/components/Dropdown';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';

export type user = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'SET ROLE', uid: 'set role', sortable: false },
];

export const renderCell = (users: user, columnKey: React.Key) => {
  const cellValue = users[columnKey as keyof user];

  switch (columnKey) {
    case 'name':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'role':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'set role':
      return (
        <div className="relative flex items-center">
          <DropdownComponent
            onSelect={(value) => console.log(value)}
          ></DropdownComponent>
          <Tooltip color="danger" content="Delete user">
            <span className="cursor-pointer text-sm text-danger active:opacity-50">
              <TrashIcon className=" h-5 w-5" />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
