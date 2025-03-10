'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <p className="text-lg text-red-600">Error: {error.message}</p>
    </div>
  );
}
