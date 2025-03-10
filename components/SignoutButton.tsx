"use client";

import { logoutUser } from "@/server/actions/auth";
import { useTransition } from "react";

export default function SignoutButton() {
  const [, startTransition] = useTransition();

  const handleSignout = () => {
    startTransition(() => {
      logoutUser();
    });
  };

  return (
    <button
      onClick={handleSignout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors "
    >
      Sign Out
    </button>
  );
}
