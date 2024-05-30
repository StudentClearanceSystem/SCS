import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function LogOutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/'); // Redirect to login page after logout
    } else {
      console.error('Failed to log out');
    }
  };

  return (
    <div className="absolute bottom-10 left-0 flex w-full items-center justify-center">
      <button
        onClick={handleLogout}
        className="hover:bg-sky-150 flex h-[40px] w-[60%] items-center justify-center gap-2 rounded-md p-3 text-sm font-bold hover:text-blue-600 md:flex-none md:justify-center md:p-2 md:px-3"
      >
        <PowerIcon className="w-6 flex-shrink-0" />
        <div className="flex items-center md:block">Log Out</div>
      </button>
    </div>
  );
}
