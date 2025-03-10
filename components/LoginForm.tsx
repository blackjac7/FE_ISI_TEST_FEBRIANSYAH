/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { signinUser } from "@/server/actions/auth";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [formState, setFormState] = useState<{
    message: string | null;
    errors: any[];
  }>({ message: null, errors: [] });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signinUser(formState, formData);
    if (result) {
      setFormState({
        message: result.message || null,
        errors: result.errors || [],
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 shadow-md rounded-lg p-6 w-full max-w-md mx-auto"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      {formState?.message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center"
        >
          {formState.message}
        </motion.p>
      )}

      {formState?.errors && Array.isArray(formState.errors) && (
        <ul className="text-red-500 text-sm text-center">
          {formState.errors.map((error: any, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error.message}
            </motion.li>
          ))}
        </ul>
      )}

      <div className="text-center">
        <SubmitButton label="Login" />
      </div>

      <div className="mt-4 text-center">
        <Link href="/register" className="text-indigo-400 hover:underline">
          Don&apos;t have an account? Register here
        </Link>
      </div>
    </motion.form>
  );
};

export default LoginForm;
