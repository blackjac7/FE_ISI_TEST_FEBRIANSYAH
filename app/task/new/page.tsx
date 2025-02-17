'use client';

import { createTask, getTeamMembers } from '@/actions/task';
import { useTransition, FormEvent, useState, useEffect } from 'react';

export default function NewTaskPage() {
  const [isPending, startTransition] = useTransition();
  const [teamMembers, setTeamMembers] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedMember, setSelectedMember] = useState<string>('');

  // Fetch team members saat komponen pertama kali dirender
  useEffect(() => {
    async function fetchTeamMembers() {
      const members = await getTeamMembers();
      setTeamMembers(members);
    }
    fetchTeamMembers();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      const formData = new FormData(e.currentTarget);
      formData.set('assignedTo', selectedMember); // Menambahkan assigned_to ke formData
      createTask(formData);
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Buat Task Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              rows={4}
            ></textarea>
          </div>

          {/* Assigned To Dropdown */}
          <div>
            <label
              htmlFor="assignedTo"
              className="block text-gray-700 font-medium"
            >
              Assign To
            </label>
            <select
              name="assignedTo"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Pilih Team Member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
          >
            {isPending ? 'Loading...' : 'Buat Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
