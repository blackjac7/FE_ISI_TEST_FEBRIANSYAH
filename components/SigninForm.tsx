/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { signinUser } from '@/actions/auth';
import Link from 'next/link';
import SubmitButton from './SubmitButton';

const SigninForm = () => {
  const [formState, setFormState] = useState<{
    message: string | null;
    errors: any;
  }>({ message: null, errors: null });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signinUser(formState, formData);
    if (result) {
      setFormState({
        message: result.message || null,
        errors: result.errors || null,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl"
    >
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <div className="text-center">
        <SubmitButton label="Sign In" />
      </div>

      {formState?.message && (
        <p className="text-red-500 text-sm mt-2">{formState.message}</p>
      )}
      {formState?.errors && (
        <ul className="text-red-500 text-sm mt-2">
          {formState.errors.map((error: any, index: number) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 text-center">
        <Link href="/signup" className="text-blue-600 hover:underline">
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </form>
  );
};

export default SigninForm;
