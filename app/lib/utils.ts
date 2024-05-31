import { supabase } from './supabase';

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */

export const getUser = async () => {
  const { data: UserTable, error } = await supabase.from('profile').select('*');
  if (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
  // console.log(UserTable);
  return UserTable; // Return the fetched data
};

export const getStudentsTable = async () => {
  try {
    const { data, error } = await supabase.from('table_students').select();

    if (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of error
    }

    // console.log('Fetched data:', data); // Log fetched data
    return data; // Return the fetched data
  } catch (err) {
    console.error('Unexpected error:', err);
    return []; // Return an empty array in case of unexpected error
  }
};
// getStudentsTable();

export const deleteUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('UserTable')
    .delete()
    .eq('id', userId)
    .select();

  if (error) {
    console.error(`Error deleting user: ${userId}`, error);
    return false;
  }

  console.log(`User deleted: ${userId}`, data);

  const { data: updatedData, error: fetchError } = await supabase
    .from('UserTable')
    .select('*');

  if (fetchError) {
    console.error('Error fetching updated user table:', fetchError);
    return false;
  }

  return updatedData;
};
export const updateUserRole = async (userId: string, newRole: string) => {
  const { error } = await supabase
    .from('UserTable')
    .update({ role: newRole })
    .eq('id', userId)
    .select();

  if (error) {
    console.error(`Error updating user ${userId} role:`, error);
    return false;
  }

  console.log(`User ${userId} role updated to ${newRole}`);
  return true;
};

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
