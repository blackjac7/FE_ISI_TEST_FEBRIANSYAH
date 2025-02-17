'use client';

import { useState, useEffect, useTransition, FormEvent } from 'react';
import {
  updateTask,
  deleteTask,
  updateTaskStatus,
  getUserNameById,
  getTeamMembers,
} from '@/actions/task';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'Not Started' | 'On Progress' | 'Done' | 'Reject';
  created_by: string;
  assigned_to?: string | null; // ID user
  created_at: string;
  updated_at: string;
}

interface TaskDetailFormProps {
  task: Task;
  userRole: string | null;
}

export default function TaskDetailForm({
  task,
  userRole,
}: TaskDetailFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to || '');
  const [assignedName, setAssignedName] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<
    { id: string; name: string }[]
  >([]);
  const [, startTransition] = useTransition();

  // Ambil nama user berdasarkan assigned_to (ID) dari server action
  useEffect(() => {
    async function fetchAssignedName() {
      if (task.assigned_to) {
        const name = await getUserNameById(task.assigned_to);
        setAssignedName(name);
      }
    }
    fetchAssignedName();
  }, [task.assigned_to]);

  // Ambil daftar team member jika user adalah Lead
  useEffect(() => {
    async function fetchTeamMembers() {
      if (userRole === 'Lead') {
        const members = await getTeamMembers();
        setTeamMembers(members);
      }
    }
    fetchTeamMembers();
  }, [userRole]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const formData = new FormData(e.currentTarget);
      formData.set('assignedTo', assignedTo);
      updateTask(formData);
    });
  };

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus task ini?')) return;
    startTransition(() => {
      const formData = new FormData();
      formData.append('taskId', task.id);
      deleteTask(formData);
    });
  };

  const handleStatusUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const formData = new FormData(e.currentTarget);
      updateTaskStatus(formData);
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detail Task</h1>
      <div className="mb-6">
        <p className="mb-2">
          <span className="font-semibold">Status:</span> {task.status}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Created At:</span>{' '}
          {new Date(task.created_at).toLocaleString()}
        </p>
        {userRole === 'Lead' && task.assigned_to && (
          <p className="mb-2">
            <span className="font-semibold">Currently Assigned To:</span>{' '}
            {assignedName ? assignedName : 'Loading...'}
          </p>
        )}
      </div>

      {userRole === 'Lead' ? (
        <>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input type="hidden" name="taskId" value={task.id} />
            <div>
              <label htmlFor="title" className="block text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={4}
              ></textarea>
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-gray-700">
                Assigned To
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">-- Pilih Team Member --</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Task
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Task
          </button>
        </>
      ) : (
        <>
          {/* Untuk anggota Team: hanya form update status */}
          <form onSubmit={handleStatusUpdate} className="space-y-4">
            <input type="hidden" name="taskId" value={task.id} />
            <div>
              <label htmlFor="status" className="block text-gray-700">
                Update Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | 'Not Started'
                      | 'On Progress'
                      | 'Done'
                      | 'Reject'
                  )
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Not Started">Not Started</option>
                <option value="On Progress">On Progress</option>
                <option value="Done">Done</option>
                <option value="Reject">Reject</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">
                Keterangan
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Status
            </button>
          </form>
        </>
      )}
    </div>
  );
}
