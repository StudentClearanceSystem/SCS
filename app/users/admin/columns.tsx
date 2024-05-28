import { TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@nextui-org/react';
import DropdownComponent from './components/Dropdown';
import { deleteUser, updateUserRole } from '@/app/lib/utils';

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

export const renderCell = (
  user: user, // Changed from 'users' to 'user' to match the type
  columnKey: React.Key,
  deleteUserHandler: (userId: string) => Promise<void>,
) => {
  const cellValue = user[columnKey as keyof user]; // Changed 'users' to 'user'
  const handleRoleChange = async (id: string, newRole: string) => {
    console.log(`Updating user ${id} role to ${newRole}`);
    const success = await updateUserRole(id, newRole);
    if (success) {
      // Optionally, you can update the UI or perform any additional actions here
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove user: ${userName}?`,
    ); // Added confirmation prompt
    if (confirmed) {
      const success = await deleteUser(userId);
      if (success) {
        deleteUserHandler(userId);
      }
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
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'set role':
      return (
        <div className="flex items-center justify-center">
          <DropdownComponent
            role={user.role} // Changed 'users' to 'user'
            onSelect={(newRole) => handleRoleChange(user.id, newRole)} // Changed 'users' to 'user'
          />
          <Tooltip color="danger" content={`Remove ${user.name}`}>
            <span
              className="cursor-pointer text-sm text-danger active:opacity-50"
              onClick={() => handleDeleteUser(user.id, user.name)} // Modified to pass user name
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
