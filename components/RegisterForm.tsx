/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { registerUser } from "@/server/actions/auth";
import { getRoles } from "@/server/actions/roles";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const [formState, setFormState] = useState<{
    message: string | null;
    errors: any;
    values?: {
      name?: string;
      email?: string;
      password?: string;
      role_id?: string;
    };
  }>({ message: null, errors: {} });
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formState, formData);

    if (result) {
      setFormState({
        message: result.message || null,
        errors: result.errors || {},
        values: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          role_id: formData.get("role_id") as string,
        },
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 shadow-md rounded-lg p-6 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 ">
        Create an Account
      </h2>

      {/* Name Field */}
      <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={formState?.values?.name}
        />
        {formState.errors?.name?._errors && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {formState.errors.name._errors[0]}
          </motion.p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={formState?.values?.email}
        />
        {formState.errors?.email?._errors && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {formState.errors.email._errors[0]}
          </motion.p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={formState?.values?.password}
        />
        {formState.errors?.password?._errors && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {formState.errors.password._errors[0]}
          </motion.p>
        )}
      </motion.div>

      {/* Role Field */}
      <motion.div className="mb-4" whileFocus={{ scale: 1.02 }}>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          name="role_id"
          defaultValue={formState?.values?.role_id}
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </motion.div>

      <div className="text-center">
        <SubmitButton label="Register Now" />
      </div>

      {formState.message && (
        <motion.p
          className="text-red-500 text-xs mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {formState.message}
        </motion.p>
      )}

      <div className="mt-4 text-center">
        <Link href="/login" className="text-blue-600 hover:underline">
          Already have an account? Login here
        </Link>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
