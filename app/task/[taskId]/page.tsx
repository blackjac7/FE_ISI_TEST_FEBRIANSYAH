// app/task/[taskId]/page.tsx
import { db } from '@/db/db';
import { tasks, users, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import TaskDetailForm from '@/components/TaskDetailForm';
import { getCurrentUser } from '@/utils/users';

interface TaskDetailPageProps {
  params: Promise<{ taskId?: string }> | { taskId?: string };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const resolvedParams = await params;
  if (!resolvedParams?.taskId) {
    notFound();
  }

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, resolvedParams.taskId),
  });

  if (!task) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  let userRole = null;

  if (currentUser) {
    const userRecord = await db.query.users.findFirst({
      where: eq(users.id, currentUser.id),
    });

    if (userRecord) {
      const roleRecord = await db.query.roles.findFirst({
        where: eq(roles.id, userRecord.role_id),
      });

      userRole = roleRecord?.name;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <TaskDetailForm task={task} userRole={userRole} />
    </div>
  );
}
