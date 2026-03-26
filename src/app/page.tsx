import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-8">

      <Image
        src="/logo.png"
        alt="Study Buddies"
        width={420}
        height={160}
        className="object-contain"
      />

      <p
        className="text-lg text-center max-w-md"
        style={{ color: "var(--sn-body)" }}
      >
        Connect with students who share your subjects and goals.
      </p>

      <div className="flex gap-4">
        <Link href="/sign-up">
          <button>Sign Up</button>
        </Link>
        <Link href="/sign-in">
          <button className="btn-outline">Sign In</button>
        </Link>
      </div>

    </div>
  );
}

