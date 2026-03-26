import Link from 'next/link';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#EEF0FB] flex items-center justify-center p-6">
      <div className="bg-[#F7F7F5] rounded-[28px] w-full max-w-5xl px-9 pt-7 pb-10">

       
        <nav className="flex items-center justify-between mb-12">
          <Image
            src="/logo.png"
            alt="Study Buddies"
            width={160}
            height={60}
            className="object-contain"
          />
          <ul className="flex gap-8 list-none">
            <li>
              <Link href="/" className="text-gray-700 text-sm font-medium hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/groups" className="text-gray-700 text-sm font-medium hover:text-indigo-600">
                Groups
              </Link>
            </li>
            <li>
              <Link href="/home" className="text-gray-700 text-sm font-medium hover:text-indigo-600">
                Subjects
              </Link>
            </li>
          </ul>
          <div className="flex gap-3">
  <Link
    href="/sign-in"
    className="border border-indigo-600 text-indigo-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50"
  >
    Sign In
  </Link>
  <Link
    href="/sign-up"
    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700"
  >
    Sign Up
  </Link>
</div>
        </nav>

        
        <div className="grid grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl leading-tight mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="text-gray-400 font-semibold">Find Your Perfect</span><br />
              <span className="text-gray-900 font-bold">Study Buddy</span><br />
              <span className="text-indigo-600 font-bold">For Free</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              Connect with students who share your subjects and goals. Join existing
              groups or create your own study community today.
            </p>
            <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200 max-w-md">
              <span className="pl-4 flex items-center text-gray-400">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="What do you want to study?"
                className="flex-1 py-3.5 px-3 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              <Link href="/home">
                <button className="bg-indigo-600 text-white px-5 py-3.5 text-sm font-semibold hover:bg-indigo-700 whitespace-nowrap">
                  Find Groups
                </button>
              </Link>
            </div>
          </div>

       
          <div className="relative h-80">
            <div className="absolute top-0 right-0 w-72 h-64 rounded-2xl bg-indigo-50 overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Study Buddies"
                width={240}
                height={180}
                className="object-contain p-4"
              />
            </div>
            <div className="absolute bottom-7 right-1 bg-indigo-600 text-white rounded-2xl px-4 py-3.5 text-xs font-medium leading-relaxed">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[10px]">
                  ✓
                </span>
                Join groups instantly
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[10px]">
                  ✓
                </span>
                Filter by subject
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}