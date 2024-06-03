import { supabase } from './supabase';

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */

export const getUser = async () => {
  const { data: UserTable, error } = await supabase
    .from('profiles')
    .select('*');
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

export const deleteUser = async (email: string) => {
  // Delete the user from the profiles table
  const { data: deletedUserData, error: deleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('email', email);

  if (deleteError) {
    console.error(`Error deleting user: ${email}`, deleteError);
    return false;
  }

  console.log(`User deleted: ${email}`, deletedUserData);

  // Fetch updated user data after deletion
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

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
