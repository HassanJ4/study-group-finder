import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";
import NavBar from "../components/NavBar";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "StudyBuddies",
  description: "Find study groups and connect with fellow students to enhance your learning experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <NavBar />

          <main className="flex-1 flex items-center justify-center">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
