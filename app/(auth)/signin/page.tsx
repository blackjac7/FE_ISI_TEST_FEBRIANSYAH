import SigninForm from '@/components/SigninForm';
import Image from 'next/image';

export default async function SigninPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-4 sm:p-8">
      <Image
        src="/undraw_welcome-cats.svg"
        alt="Logo"
        width={300}
        height={300}
      />

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Sign In
        </h2>
        <SigninForm />
      </div>
    </div>
  );
}
