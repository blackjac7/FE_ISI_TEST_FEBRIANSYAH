// app/task/[taskId]/page.tsx
import { db } from "@/db/index";
import { tasks, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import TaskDetailForm from "@/components/TaskDetailForm";
import { getCurrentUser } from "@/utils/users";

interface TaskDetailPageProps {
  params: Promise<{ taskId?: string }>;
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const resolvedParams = await params;
  if (!resolvedParams?.taskId) {
    notFound();
  }

  const [task, currentUser] = await Promise.all([
    db.query.tasks.findFirst({ where: eq(tasks.id, resolvedParams.taskId) }),
    getCurrentUser(),
  ]);

  if (!task) notFound();

  const userWithRole = currentUser
    ? await db.query.users.findFirst({
        where: eq(users.id, currentUser.id),
        with: { role: true },
      })
    : null;

  const userRole = userWithRole?.role?.name ?? null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <TaskDetailForm task={task} userRole={userRole} />
    </div>
  );
}
