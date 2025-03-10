"use server";

import { db } from "@/db/index";
import { tasks, users, roles } from "@/db/schema";
import { requireLeadRole } from "@/utils/authRole";
import { eq } from "drizzle-orm";

export const getRoles = async () => {
  return await db.select().from(roles);
};

export const assignTaskToTeam = async (formData: FormData) => {
  const taskId = formData.get("taskId") as string;
  const teamMemberId = formData.get("teamMemberId") as string;

  const userRecord = await requireLeadRole();

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  });
  if (!task) {
    throw new Error("Task tidak ditemukan");
  }

  if (task.created_by === userRecord.id) {
    throw new Error("Tidak dapat assign task yang dibuat sendiri");
  }

  const teamMember = await db.query.users.findFirst({
    where: eq(users.id, teamMemberId),
  });
  if (!teamMember) {
    throw new Error("Team member tidak ditemukan");
  }

  const teamMemberRole = await db.query.roles.findFirst({
    where: eq(roles.id, teamMember.role_id),
  });
  if (!teamMemberRole || teamMemberRole.name !== "Team") {
    throw new Error("User yang dipilih bukan merupakan anggota Team");
  }

  await db
    .update(tasks)
    .set({ assigned_to: teamMemberId })
    .where(eq(tasks.id, taskId));

  return { message: "Task berhasil di-assign ke team member" };
};
