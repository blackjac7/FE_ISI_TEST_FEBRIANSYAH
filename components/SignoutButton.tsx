'use client';

import { logoutUser } from '@/actions/auth';

const SignoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default SignoutButton;
