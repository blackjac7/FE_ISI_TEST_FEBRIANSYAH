import SignupForm from '@/components/SignupForm';
import { getCurrentUser } from '@/utils/users';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) redirect('/dashboard');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl w-full mt-90 sm:mt-0">
        <div className="w-full sm:w-1/2 sm:mr-8 mb-8 sm:mb-0 sm:mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Sign Up
          </h2>
          <SignupForm />
        </div>
        <div className="w-full sm:w-1/2">
          <Image
            src="/undraw_sign-up.svg"
            alt="Sign up image"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
