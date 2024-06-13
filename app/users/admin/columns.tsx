import { TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';
import DropdownComponent from './components/Dropdown';
import { updateUserRole } from '@/app/lib/utils';

export type user = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const columns = [
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'SET ROLE', uid: 'set role', sortable: false },
];

export const renderCell = (
  user: user,
  columnKey: React.Key,
  deleteUserHandler: (userEmail: string) => Promise<void>,
) => {
  const cellValue = user[columnKey as keyof user];
  const handleRoleChange = async (email: string, newRole: string) => {
    console.log(`Updating user ${email} role to ${newRole}`);
    const success = await updateUserRole(email, newRole);
    if (success) {
      // Optionally, you can update the UI or perform any additional actions here
    }
  };

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
          <p className="text-bold text-small">
            {String(cellValue).toUpperCase()}
          </p>
        </div>
      );
    case 'set role':
      return (
        <div className="flex items-center justify-center">
          <DropdownComponent
            role={user.role}
            onSelect={(newRole) => handleRoleChange(user.email, newRole)}
          />
          <Tooltip color="danger" content={`Delete ${user.name}`}>
            <span
              className="cursor-pointer text-sm text-danger active:opacity-50"
              onClick={() => deleteUserHandler(user.email)}
            >
              <TrashIcon className="h-5 w-5" />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
