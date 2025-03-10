"use server";

import { db } from "@/db/index";
import { tasks, users, roles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/utils/users";
import { z } from "zod";
import { redirect } from "next/navigation";
import { requireLeadRole } from "@/utils/authRole";

const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title wajib diisi" }),
  description: z.string().optional(),
  assignedTo: z.string().optional().nullable(),
});

export const createTask = async (formData: FormData) => {
  const userRecord = await requireLeadRole();

  if (!userRecord) {
    throw new Error("User tidak ditemukan");
  }

  // Validation
  const data = createTaskSchema.parse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    assignedTo: formData.get("assignedTo") || null,
  });

  // Insert task baru, status default 'Not Started'
  const newTask = await db
    .insert(tasks)
    .values({
      title: data.title,
      description: data.description,
      created_by: userRecord.id,
      assigned_to: data.assignedTo,
      status: "Not Started",
    })
    .returning();
  console.log("New task:", newTask);
  redirect("/dashboard");
};

export const getTasks = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized: User tidak login");
  }

  const userRecord = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, currentUser.id),
  });
  if (!userRecord) throw new Error("User tidak ditemukan");

  const userRole = await db.query.roles.findFirst({
    where: (roles, { eq }) => eq(roles.id, userRecord.role_id),
  });
  if (!userRole) throw new Error("Role tidak ditemukan");
  let tasks = [];
  try {
    if (userRole.name === "Lead") {
      tasks = await db.query.tasks.findMany({
        where: (tasks, { eq }) => eq(tasks.created_by, currentUser.id),
      });
    } else {
      tasks = await db.query.tasks.findMany({
        where: (tasks, { eq }) => eq(tasks.assigned_to, currentUser.id),
      });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  return tasks ?? [];
};

const updateTaskSchema = z.object({
  taskId: z.string().nonempty({ message: "Task ID wajib diisi" }),
  title: z.string().min(1, { message: "Title wajib diisi" }),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
});

export const updateTask = async (formData: FormData) => {
  const userRecord = await requireLeadRole();

  if (!userRecord) {
    throw new Error("User tidak ditemukan");
  }

  const data = updateTaskSchema.parse({
    taskId: formData.get("taskId"),
    title: formData.get("title"),
    description: formData.get("description") || "",
    assignedTo: formData.get("assignedTo") || null,
  });

  await db
    .update(tasks)
    .set({
      title: data.title,
      description: data.description,
      updated_at: new Date(),
      assigned_to: data.assignedTo,
    })
    .where(eq(tasks.id, data.taskId));

  redirect("/dashboard");
};

const updateTaskStatusSchema = z.object({
  taskId: z.string().nonempty({ message: "Task ID wajib diisi" }),
  status: z.enum(["Not Started", "On Progress", "Done", "Reject"]),
  description: z.string().optional(),
});

export const updateTaskStatus = async (formData: FormData) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized: User tidak login");
  }

  const userRecord = await db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
  });
  if (!userRecord) throw new Error("User tidak ditemukan");
  const userRole = await db.query.roles.findFirst({
    where: eq(roles.id, userRecord.role_id),
  });
  if (!userRole || userRole.name !== "Team") {
    throw new Error("Hanya anggota Team yang dapat mengupdate status task");
  }

  const data = updateTaskStatusSchema.parse({
    taskId: formData.get("taskId"),
    status: formData.get("status"),
    description: formData.get("description") || "",
  });

  const taskRecord = await db.query.tasks.findFirst({
    where: eq(tasks.id, data.taskId),
  });
  if (!taskRecord) throw new Error("Task tidak ditemukan");

  if (taskRecord.assigned_to !== currentUser.id) {
    throw new Error("Anda tidak di-assign pada task ini");
  }

  await db
    .update(tasks)
    .set({
      status: data.status,
      description: data.description,
      updated_at: new Date(),
    })
    .where(eq(tasks.id, data.taskId));

  redirect("/dashboard");
};

const deleteTaskSchema = z.object({
  taskId: z.string().nonempty({ message: "Task ID wajib diisi" }),
});

export const deleteTask = async (formData: FormData) => {
  const userRecord = await requireLeadRole();

  if (!userRecord) {
    throw new Error("User tidak ditemukan");
  }

  const data = deleteTaskSchema.parse({
    taskId: formData.get("taskId"),
  });

  await db.delete(tasks).where(eq(tasks.id, data.taskId));

  redirect("/dashboard");
};

export const getTeamMembers = async () => {
  const teamRole = await db.query.roles.findFirst({
    where: (roles, { eq }) => eq(roles.name, "Team"),
  });

  if (!teamRole) return [];

  const teamMembers = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.role_id, teamRole.id),
    columns: { id: true, name: true },
  });

  return teamMembers;
};

export async function getUserNameById(userId: string | null) {
  if (!userId) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { name: true },
  });

  return user?.name ?? null;
}
