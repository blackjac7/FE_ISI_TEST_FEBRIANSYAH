export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full mx-auto">{children}</div>
    </div>
  );
}
