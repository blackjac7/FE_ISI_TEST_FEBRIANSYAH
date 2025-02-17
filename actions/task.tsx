'use server';

import { db } from '@/db/db';
import { tasks, users, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/utils/users';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { requireLeadRole } from '@/utils/authRole';

const createTaskSchema = z.object({
  title: z.string().min(1, { message: 'Title wajib diisi' }),
  description: z.string().optional(),
});

export const createTask = async (formData: FormData) => {
  const userRecord = await requireLeadRole();

  if (!userRecord) {
    throw new Error('User tidak ditemukan');
  }

  // Validation
  const data = createTaskSchema.parse({
    title: formData.get('title'),
    description: formData.get('description') || '',
  });

  // Insert task baru, status default 'Not Started'
  const newTask = await db
    .insert(tasks)
    .values({
      title: data.title,
      description: data.description,
      created_by: userRecord.id,
      status: 'Not Started',
    })
    .returning();

  redirect('/dashboard');
};

const updateTaskSchema = z.object({
  taskId: z.string().nonempty({ message: 'Task ID wajib diisi' }),
  title: z.string().min(1, { message: 'Title wajib diisi' }),
  description: z.string().optional(),
});

export const updateTask = async (formData: FormData) => {
  const userRecord = await requireLeadRole();

  if (!userRecord) {
    throw new Error('User tidak ditemukan');
  }

  const data = updateTaskSchema.parse({
    taskId: formData.get('taskId'),
    title: formData.get('title'),
    description: formData.get('description') || '',
  });

  await db
    .update(tasks)
    .set({
      title: data.title,
      description: data.description,
      updated_at: new Date(),
    })
    .where(eq(tasks.id, data.taskId));

  redirect('/dashboard');
};

const updateTaskStatusSchema = z.object({
  taskId: z.string().nonempty({ message: 'Task ID wajib diisi' }),
  status: z.enum(['Not Started', 'On Progress', 'Done', 'Reject']),
  description: z.string().optional(),
});

export const updateTaskStatus = async (formData: FormData) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('Unauthorized: User tidak login');
  }

  const userRecord = await db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
  });
  if (!userRecord) throw new Error('User tidak ditemukan');
  const userRole = await db.query.roles.findFirst({
    where: eq(roles.id, userRecord.role_id),
  });
  if (!userRole || userRole.name !== 'Team') {
    throw new Error('Hanya anggota Team yang dapat mengupdate status task');
  }

  const data = updateTaskStatusSchema.parse({
    taskId: formData.get('taskId'),
    status: formData.get('status'),
    description: formData.get('description') || '',
  });

  const taskRecord = await db.query.tasks.findFirst({
    where: eq(tasks.id, data.taskId),
  });
  if (!taskRecord) throw new Error('Task tidak ditemukan');

  if (taskRecord.assigned_to !== currentUser.id) {
    throw new Error('Anda tidak di-assign pada task ini');
  }

  await db
    .update(tasks)
    .set({
      status: data.status,
      description: data.description,
      updated_at: new Date(),
    })
    .where(eq(tasks.id, data.taskId));

  redirect('/dashboard');
};

const deleteTaskSchema = z.object({
  taskId: z.string().nonempty({ message: 'Task ID wajib diisi' }),
});

export const deleteTask = async (formData: FormData) => {
  const userRecord = await requireLeadRole();

  if (!userRecord) {
    throw new Error('User tidak ditemukan');
  }

  const data = deleteTaskSchema.parse({
    taskId: formData.get('taskId'),
  });

  await db.delete(tasks).where(eq(tasks.id, data.taskId));

  redirect('/dashboard');
};
