import { getTasks } from "@/server/actions/task";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";
import { getUserNameById } from "@/server/actions/task";
import { getCurrentUser } from "@/utils/users";
import { db } from "@/db/index";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const tasks = await getTasks();
  const currentUser = (await getCurrentUser()) as {
    id: string;
    created_at: Date;
    email: string;
    name: string;
    role_id: string;
  };

  const userRole = await db.query.roles.findFirst({
    where: eq(roles.id, currentUser.role_id),
  });

  const tasksWithAssignees = await Promise.all(
    tasks.map(async (task) => {
      const assignedName = task.assigned_to
        ? await getUserNameById(task.assigned_to)
        : "Not Assigned";
      return {
        ...task,
        created_by: { id: task.created_by, name: "Unknown" },
        userRole: userRole?.name,
        assignedName,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      {currentUser ? (
        <p className="text-xl text-center text-gray-700 mb-6">
          Hello, {currentUser.name}!{" "}
          {userRole && userRole.name === "Lead" ? (
            <span className="text-green-600 font-semibold">
              {userRole.name}
            </span>
          ) : (
            <span className="text-blue-600 font-semibold">
              {userRole?.name}
            </span>
          )}
        </p>
      ) : null}

      {tasks && tasks.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={{
                ...task,
                created_by: { id: task.created_by, name: "Unknown" },
                userRole: userRole?.name,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <Image
            src="/undraw_no-data.svg"
            alt="Empty"
            width={200}
            height={200}
          />
          <p className="block text-xl text-gray-600 mt-4">
            Tidak ada tugas yang tersedia.
          </p>
        </div>
      )}
    </div>
  );
}
