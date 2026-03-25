'use server';
import { sql } from '@/lib/db';
import { syncUser } from './syncUser';
import { redirect } from 'next/navigation';

export async function getUserGroups() {
  const user = await syncUser();
  if (!user) redirect('/');

  const groups = await sql`
    SELECT groups.*
    FROM groups
    JOIN group_members ON groups.id = group_members.group_id
    WHERE group_members.user_id = ${user.id}
    ORDER BY group_members.joined_at DESC
  `;

  return groups;
}