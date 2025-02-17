import SigninForm from '@/components/SigninForm';

export default async function SigninPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Sign In
        </h2>
        <SigninForm />
      </div>
    </div>
  );
}
