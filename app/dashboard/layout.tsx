import { getCurrentUser } from '@/utils/users';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      {children}
    </div>
  );
}
