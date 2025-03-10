import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <header className="row-start-1 text-4xl font-bold text-white drop-shadow-lg">
        Welcome to DevTodo
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white/10 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-lg border border-white/20 max-w-xl text-white">
        <div className="flex items-center justify-center gap-4 self-center">
          <Image
            className="drop-shadow-md"
            src="/todolist-amico.svg"
            alt="DevTodo logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <p className="text-lg text-center sm:text-left">
          DevTodo is your ultimate task management tool. Organize your tasks,
          collaborate with your team, and stay productive.
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Create and manage tasks with ease.</li>
          <li className="mb-2">
            Assign tasks to team members and track progress.
          </li>
          <li className="mb-2">
            Update task statuses: Not Started, On Progress, Done, Reject.
          </li>
          <li className="mb-2">Keep a log of all changes and updates.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row self-center">
          <a
            className="rounded-full border border-white/30 transition-all duration-300 ease-in-out flex items-center justify-center bg-white/20 hover:bg-indigo-500 text-white hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 shadow-lg transform hover:scale-105 backdrop-blur-md"
            href="/login"
          >
            <Image
              className="dark:invert mr-1"
              src="/icon-login.png"
              alt="Login icon"
              width={20}
              height={20}
            />
            <span>Login</span>
          </a>
        </div>
      </main>

      <footer className="row-start-3 text-sm text-white text-center opacity-80">
        &copy; 2025 DevTodo. All rights reserved.
      </footer>
    </div>
  );
}
