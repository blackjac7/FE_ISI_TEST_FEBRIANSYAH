import SignupForm from '@/components/SignupForm';
import { getCurrentUser } from '@/utils/users';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) redirect('/dashboard');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Sign Up
        </h2>
        <SignupForm />
      </div>
    </div>
  );
}
