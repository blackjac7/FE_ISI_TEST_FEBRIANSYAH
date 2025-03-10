import RegisterForm from "@/components/RegisterForm";
import { getCurrentUser } from "@/utils/users";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) redirect("/dashboard");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-lg border border-white/20 max-w-4xl w-full text-white">
        {/* Form Section */}
        <div className="w-full sm:w-1/2 sm:mr-8 mb-8 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Register
          </h2>
          <RegisterForm />
        </div>

        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <Image
            src="/undraw_sign-up.svg"
            alt="Sign up image"
            width={400}
            height={400}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
