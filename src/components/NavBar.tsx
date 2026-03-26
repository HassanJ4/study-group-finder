"use client";

import Link from "next/link";
import Image from "next/image";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <header
      className="w-full px-10 py-3 shadow-sm"
      style={{ backgroundColor: "var(--sn-surface)" }}
    >
      <div className="flex items-center justify-between">
       
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Study Buddies"
            width={120}
            height={45}
            className="object-contain"
          />
        </Link>

        
        <nav className="flex gap-8">
          {[
            { label: "Home",            href: "/" },
            { label: "View All Groups", href: "/groups" },
            { label: "Create Group",    href: "/groups/new" },
            { label: "All Users",       href: "/users" },
            { label: "My Profile",      href: "/users/you" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--sn-nav)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        
        <div className="flex gap-3">
          <Show when="signed-out">
            <div className="flex gap-3">
              <SignInButton>
                <button className="btn-outline">Sign In</button>
              </SignInButton>
              <SignUpButton>
                <button>Sign Up</button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}