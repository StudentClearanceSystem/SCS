import { supabase } from './supabase';

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */

export const getUser = async () => {
  const { data, error } = await supabase.from('UserTable').select('*');
  if (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
  return data; // Return the fetched data
};

const deleteUser = async (userId: any) => {
  const { data, error } = await supabase
    .from('UserTable')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  console.log('User deleted:', data);
  return true;
};

/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */
/*------------------------------------------------------------------ */

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
