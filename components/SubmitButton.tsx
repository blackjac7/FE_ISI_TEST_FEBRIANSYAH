"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  label,
  className,
  ...props
}: {
  label: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 ${className} hover:shadow-lg transition-shadow hover:cursor-pointer`}
      disabled={pending}
      {...props}
    >
      {pending ? "Processing..." : label}
    </button>
  );
};

export default SubmitButton;
