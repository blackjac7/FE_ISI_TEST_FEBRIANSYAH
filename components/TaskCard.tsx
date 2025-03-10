"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: "Not Started" | "On Progress" | "Done" | "Reject";
  created_by: { id: string; name: string };
  assigned_to?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  userRole?: string | null;
  assignedName?: string | null;
}

interface TaskCardProps {
  task: Task;
}

const statusColors = {
  "Not Started": "bg-gray-200 text-gray-800",
  "On Progress": "bg-yellow-200 text-yellow-800",
  Done: "bg-green-200 text-green-800",
  Reject: "bg-red-200 text-red-800",
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow rounded p-4 hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-700">{task.description}</p>

      <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-600">
        {task.userRole === "Lead" && (
          <p>
            <span className="font-semibold">Assigned To:</span>{" "}
            {task.assignedName}
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded text-sm ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
        <Link
          href={`/task/${task.id}`}
          className="text-blue-500 hover:underline text-sm"
        >
          Detail
        </Link>
      </div>
    </motion.div>
  );
}
