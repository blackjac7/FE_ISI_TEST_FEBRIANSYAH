'use client';

import { useActionState } from 'react';
import { useEffect, useState } from 'react';
import { registerUser } from '@/actions/auth';
import { getRoles } from '@/actions/roles';
import SubmitButton from './SubmitButton';
import Link from 'next/link';

const SignupForm = () => {
  const [formState, formAction] = useActionState(registerUser, {
    message: null,
    errors: {},
  });
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  return (
    <form
      action={formAction}
      className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto"
    >
      {/* Name Field */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          type="text"
          placeholder="Enter your name"
          defaultValue={formState?.values?.name as string}
        />
        {formState.errors?.name?._errors && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.name._errors[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={formState?.values?.email as string}
        />
        {formState.errors?.email?._errors && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.email._errors[0]}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          type="password"
          placeholder="Create a password"
          defaultValue={formState?.values?.password as string}
        />
        {formState.errors?.password?._errors && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.password._errors[0]}
          </p>
        )}
      </div>

      {/* Role Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="role_id"
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {formState.errors?.role?._errors && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.role._errors[0]}
          </p>
        )}
      </div>

      <div className="text-center">
        <SubmitButton label="Sign Up" />
      </div>

      {formState.message && (
        <p className="text-red-500 text-sm mt-2">{formState.message}</p>
      )}

      <div className="mt-4 text-center">
        <Link href="/signin" className="text-blue-600 hover:underline">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
