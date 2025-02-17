import SigninForm from '@/components/SigninForm';
import { getCurrentUser } from '@/utils/users';
import { redirect } from 'next/navigation';

export default async function SigninPage() {
  const user = await getCurrentUser();

  if (user) redirect('/dashboard');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SigninForm />
    </div>
  );
}
