'use server';

import { db } from '@/db/db';
import { tasks, users, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/utils/users';

export const getRoles = async () => {
  return await db.select().from(roles);
};

export const assignTaskToTeam = async (formData: FormData) => {
  const taskId = formData.get('taskId') as string;
  const teamMemberId = formData.get('teamMemberId') as string;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('Unauthorized: User tidak ditemukan');
  }

  const userDetail = await db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
  });
  if (!userDetail) {
    throw new Error('User tidak ditemukan dalam database');
  }

  const userRole = await db.query.roles.findFirst({
    where: eq(roles.id, userDetail.role_id),
  });
  if (!userRole || userRole.name !== 'Lead') {
    throw new Error('Unauthorized: Hanya Lead yang dapat meng-assign task');
  }

  const teamMember = await db.query.users.findFirst({
    where: eq(users.id, teamMemberId),
  });
  if (!teamMember) {
    throw new Error('Team member tidak ditemukan');
  }

  const teamMemberRole = await db.query.roles.findFirst({
    where: eq(roles.id, teamMember.role_id),
  });
  if (!teamMemberRole || teamMemberRole.name !== 'Team') {
    throw new Error('User yang dipilih bukan merupakan anggota Team');
  }

  await db
    .update(tasks)
    .set({ assigned_to: teamMemberId })
    .where(eq(tasks.id, taskId));

  return { message: 'Task berhasil di-assign ke team member' };
};
