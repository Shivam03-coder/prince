import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white px-4 relative">
      {/* User profile button */}
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>

      {/* Centered Content */}
      <div className="flex flex-1 flex-col justify-center items-center text-center gap-6 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          Smart Plan Manager
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl">
          Plan smarter, get more done. Create, edit, and manage your tasks seamlessly.
          Stay organized and boost your productivity with ease.
        </p>

        {/* Features List */}
        <div className="grid gap-4 sm:grid-cols-3 w-full mt-8">
          <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition">
            <h3 className="text-xl font-semibold">Create Tasks</h3>
            <p className="text-gray-400 text-sm mt-2">
              Easily add new tasks with due dates, priorities, and descriptions.
            </p>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition">
            <h3 className="text-xl font-semibold">Edit Tasks</h3>
            <p className="text-gray-400 text-sm mt-2">
              Update task details anytime to keep things accurate and current.
            </p>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition">
            <h3 className="text-xl font-semibold">Delete Tasks</h3>
            <p className="text-gray-400 text-sm mt-2">
              Clean up your plan by removing tasks you no longer need.
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <Link
          href="/task"
          className="mt-10 inline-block px-8 py-4 rounded-md bg-white text-black text-lg font-medium hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-6">
        &copy; {new Date().getFullYear()} Smart Plan Manager. All rights reserved.
      </footer>
    </main>
  );
}
