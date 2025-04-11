import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Student Net</h1>
      <p className="text-xl mb-8">Connect with students globally</p>
      
      {!userId ? (
        <div className="space-x-4">
          <Link
            href="/sign-in"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">Welcome back!</p>
          <Link
            href="/dashboard"
            className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg text-center"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
} 