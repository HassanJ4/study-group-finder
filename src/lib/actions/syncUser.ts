'use server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { sql } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await sql`
    SELECT * FROM users WHERE clerk_user_id = ${userId}
  `;
  if (existing.length > 0) return existing[0];

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

 const username: string =
  (clerkUser.username ??
  `${clerkUser.firstName ?? ''}${clerkUser.lastName ?? ''}`.trim()) ||
  'user';

  const avatarUrl: string | null = clerkUser.imageUrl ?? null;

  const [newUser] = await sql`
    INSERT INTO users (clerk_user_id, username, avatar_url)
    VALUES (${userId}, ${username}, ${avatarUrl})
    RETURNING *
  `;
  return newUser;
}