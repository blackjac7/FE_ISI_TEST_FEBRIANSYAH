"use client";

import { createTask } from "@/server/actions/task";
import { useTransition, FormEvent, useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
}

interface NewTaskFormProps {
  teamMembers: TeamMember[];
}

export default function NewTaskForm({ teamMembers }: NewTaskFormProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedMember, setSelectedMember] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      const formData = new FormData(e.currentTarget);
      formData.set("assignedTo", selectedMember);
      createTask(formData);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white p-6 rounded shadow w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Buat Task Baru
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium"
                >
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
                >
                  <option value="">Pilih Team Member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors hover:shadow-lg hover:scale-105 hover:cursor-pointer"
              >
                {isPending ? "Loading..." : "Buat Task"}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <Image
            src="/undraw_add-tasks.svg"
            alt="New Task"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
