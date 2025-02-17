import SignupForm from '@/components/SignupForm';
import { getCurrentUser } from '@/utils/users';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) redirect('/dashboard');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignupForm />
    </div>
  );
}
