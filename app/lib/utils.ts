import { supabase } from './supabase';

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */

// Fetch the initial data from the profiles table
export const getUser = async () => {
  const { data: UserTable, error } = await supabase
    .from('profiles')
    .select('*');
  if (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
  return UserTable; // Return the fetched data
};

// Function to handle real-time updates
const handleRealtimeUpdatesForUserRole = (callback: () => Promise<void>) => {
  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles',
      },
      (payload) => {
        console.log('Change received:', payload);
        // Re-fetch data or handle updates as necessary
        callback();
      },
    )
    .subscribe();

  return channel;
};

// Fetch initial data and set up a listener for real-time updates
export const fetchDataAndListenForUpdatesForUserRole = async (
  setUsers: (users: any) => void,
) => {
  const data = await getUser();
  console.log('Initial data:', data);
  setUsers(data);

  handleRealtimeUpdatesForUserRole(async () => {
    const updatedData = await getUser();
    console.log('Updated data:', updatedData);
    setUsers(updatedData);
  });
};

export const deleteUser = async (email: string) => {
  const { data: deletedUserData, error: deleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('email', email);

  if (deleteError) {
    console.error(`Error deleting user: ${email}`, deleteError);
    return false;
  }

  console.log(`User deleted: ${email}`, deletedUserData);

  const { data: updatedUserData, error: fetchError } = await supabase
    .from('profiles')
    .select('*');
  if (fetchError) {
    console.error('Error fetching updated user table:', fetchError);
    return false;
  }

  return updatedUserData;
};

export const updateUserRole = async (userEmail: string, newRole: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('email', userEmail)
    .select();
  console.log(userEmail + ' = ' + newRole);

  if (error) {
    console.error(`Error updating user ${userEmail} role:`, error);
    return false;
  }

  console.log(`User ${userEmail} role updated to ${newRole}`);
  return true;
};

// Fetch the initial data from the table_students table
export const getStudentsTable = async () => {
  try {
    const { data, error } = await supabase.from('table_students').select();
    if (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of error
    }
    return data; // Return the fetched data
  } catch (err) {
    console.error('Unexpected error:', err);
    return []; // Return an empty array in case of unexpected error
  }
};

// Function to handle real-time updates
const handleRealtimeUpdates = (callback: () => Promise<void>) => {
  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'table_students',
      },
      (payload) => {
        console.log('Change received:', payload);
        // Re-fetch data or handle updates as necessary
        callback();
      },
    )
    .subscribe();

  return channel;
};

// Fetch initial data and set up a listener for real-time updates
export const fetchDataAndListenForUpdates = async (
  setStudents: (students: any) => void,
) => {
  const data = await getStudentsTable();
  console.log('Initial data:', data);
  setStudents(data);

  handleRealtimeUpdates(async () => {
    const updatedData = await getStudentsTable();
    console.log('Updated data:', updatedData);
    setStudents(updatedData);
  });
};

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
