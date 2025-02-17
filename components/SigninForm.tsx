'use client';

import { useActionState } from 'react';
import { signinUser } from '@/actions/auth';
import Link from 'next/link';
import SubmitButton from './SubmitButton';

const initState = { message: null, errors: null };

const SigninForm = () => {
  const [formState, action] = useActionState<{
    message: string | null;
    errors: any;
  }>(signinUser, initState);

  return (
    <form
      action={action}
      className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-4 text-center">Sign In</h3>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
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
          required
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <SubmitButton label="Sign In" />

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
