import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <header className="row-start-1 text-4xl font-bold text-white">
        Welcome to DevTodo
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/todo-logo.svg"
          alt="DevTodo logo"
          width={180}
          height={38}
          priority
        />
        <p className="text-lg text-center sm:text-left text-white">
          DevTodo is your ultimate task management tool. Organize your tasks,
          collaborate with your team, and stay productive.
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-white">
          <li className="mb-2">Create and manage tasks with ease.</li>
          <li className="mb-2">
            Assign tasks to team members and track progress.
          </li>
          <li className="mb-2">
            Update task statuses: Not Started, On Progress, Done, Reject.
          </li>
          <li className="mb-2">Keep a log of all changes and updates.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/signup"
          >
            <Image
              className="dark:invert"
              src="/signup-icon.svg"
              alt="Sign Up icon"
              width={20}
              height={20}
            />
            Sign Up
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/login"
          >
            <Image
              className="dark:invert"
              src="/login-icon.svg"
              alt="Login icon"
              width={20}
              height={20}
            />
            Login
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/learn-more"
        >
          <Image
            aria-hidden
            src="/learn-icon.svg"
            alt="Learn icon"
            width={16}
            height={16}
          />
          Learn More
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/examples"
        >
          <Image
            aria-hidden
            src="/examples-icon.svg"
            alt="Examples icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
