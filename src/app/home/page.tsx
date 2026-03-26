import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-6 py-12">
      <div
        className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl flex"
        style={{ backgroundColor: "var(--sn-surface)" }}
      >
       
        <div className="flex-1 flex flex-col gap-6 px-12 py-16">
          
          
          <Image
            src="/logo.png"
            alt="Study Buddies"
            width={320}
            height={120}
            className="object-contain self-start"
          />

          <p className="text-base leading-relaxed max-w-xs" style={{ color: "var(--sn-body)" }}>
            Connect with students who share your subjects and goals. Join
            existing groups or create your own study community today.
          </p>

          <div className="flex items-center gap-3 rounded-full px-5 py-3 shadow-sm border border-gray-100 bg-white max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm flex-1" style={{ color: "var(--sn-body)" }}>
              What do you want to study?
            </span>
            <Link href="/groups">
              <button className="btn-dark text-sm px-4 py-1.5">
                Find Groups
              </button>
            </Link>
          </div>
        </div>

        
        <div className="relative flex-1 flex items-center justify-center h-[440px]">
          <div
            className="absolute top-8 right-8 w-64 h-80 rounded-3xl"
            style={{ backgroundColor: "var(--sn-brand-light)" }}
          />
          <div
            className="absolute bottom-8 left-8 w-56 h-72 rounded-3xl shadow-md flex flex-col justify-end p-5 gap-3"
            style={{ backgroundColor: "var(--sn-brand-mid)" }}
          >
            <div className="text-4xl">📚</div>
            <div
              className="rounded-2xl px-5 py-4 flex flex-col gap-2 shadow-lg"
              style={{ backgroundColor: "var(--sn-cta)" }}
            >
              {["Join groups instantly", "Filter by subject"].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "var(--sn-brand)", color: "#fff" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-16 right-16 text-5xl select-none">🧑‍💻</div>
        </div>
      </div>
    </div>
  );
}
