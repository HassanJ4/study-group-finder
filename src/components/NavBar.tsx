import Link from "next/link";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function NavBar() {
    return (
        <header className="bg-white border-b shadow-sm mb-6">
      <div className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">

        <h1 className="text-2xl font-bold">Studdy Buddies</h1>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-blue-600">
          <Link href="/">Home</Link>
          <Link href="/groups">View All Groups</Link>
          <Link href="/groups/new">Create Group</Link>
          <Link href="/users/you">My Profile</Link>
        </nav>

       <div className="flex gap-3 text-blue-600">
          <Show when="signed-out">
            <SignInButton>
              <button className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="bg-purple-600 text-white rounded-full px-4 py-2 text-sm hover:bg-purple-700">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

      </div>
    </header>
  );
}