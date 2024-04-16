import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth'; // Import the signOut function from your authentication library

export default function LogOutBtn() {
  const handleSignOut = async () => {
    // await signOut();
  };

  return (
    <form onSubmit={handleSignOut}>
      <div className="absolute bottom-10 left-0 flex w-full items-center justify-center">
        <button className="hover:bg-sky-150 flex h-[40px] w-[60%] items-center justify-center gap-2 rounded-md p-3 text-sm font-bold hover:text-blue-600 md:flex-none md:justify-center md:p-2 md:px-3 ">
          <PowerIcon className="w-6 flex-shrink-0" />
          <div className="flex items-center md:block">Sign Out</div>
        </button>
      </div>
    </form>
  );
}
