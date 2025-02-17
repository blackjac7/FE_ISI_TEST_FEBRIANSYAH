import { getTasks } from '@/actions/task';
import TaskCard from '@/components/TaskCard';

export default async function DashboardPage() {
  const tasks = await getTasks();
  if (!tasks || tasks.length === 0) {
    return <p>Tidak ada tugas yang tersedia.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      {tasks && tasks.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task: any) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Belum ada task, silakan buat task baru.</p>
      )}
    </div>
  );
}
