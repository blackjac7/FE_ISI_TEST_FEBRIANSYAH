import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { getCurrentUser } from "@/utils/users";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6 sm:p-12">
      <Image
        src="/undraw_welcome-cats.svg"
        alt="Logo"
        width={260}
        height={260}
        className="mb-6 drop-shadow-lg"
      />

      <div className="backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-xl shadow-xl border border-white/20 max-w-md w-full text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Welcome Back!
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
