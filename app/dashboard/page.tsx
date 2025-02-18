import { getTasks } from '@/actions/task';
import TaskCard from '@/components/TaskCard';
import Image from 'next/image';
import { getCurrentUser } from '@/utils/users';

export default async function DashboardPage() {
  const tasks = await getTasks();
  const currentUser = (await getCurrentUser()) as {
    id: string;
    created_at: Date;
    email: string;
    name: string;
  };
  console.log(currentUser);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-11">
        <h1 className="text-3xl font-bold mb-2 text-center">Dashboard</h1>
        {currentUser ? (
          <p className="text-xl text-center text-gray-700 mb-4">
            Hello, {currentUser.name}!
          </p>
        ) : null}
        <Image src="/undraw_no-data.svg" alt="Empty" width={200} height={200} />
        <p className="block text-xl text-gray-600 mt-4">
          Tidak ada tugas yang tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Dashboard</h1>
      {currentUser ? (
        <p className="text-xl text-center text-gray-700 mb-4">
          Hello, {currentUser.name}!
        </p>
      ) : null}
      {tasks && tasks.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={{
                ...task,
                created_by: { id: task.created_by, name: 'Unknown' },
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Belum ada task, silakan buat task baru.</p>
      )}
    </div>
  );
}
