'use server';

import { sql } from '@/lib/db';
import { syncUser } from './syncUser';
import { redirect } from 'next/navigation';
import type { Group } from '@/types/database.types';

export async function getGroupById(id: string): Promise<Group | null> {
  const [group] = await sql<Group[]>`
    SELECT id, name, description, subject, created_by, created_at
    FROM groups
    WHERE id = ${id}
  `;
  return group || null;
}

export async function getAllGroups() {
  return await sql`
    SELECT * FROM groups
    ORDER BY created_at DESC
  `;
}

export async function getGroupsBySubject(subject: string) {
  return await sql`
    SELECT * FROM groups
    WHERE subject = ${subject}
    ORDER BY created_at DESC
  `;
}

export async function createGroup({
  name,
  description,
  subject,
}: {
  name: string;
  description: string;
  subject: string;
}) {
  const user = await syncUser();
  if (!user) redirect('/');

  const [group] = await sql`
    INSERT INTO groups (name, description, subject, created_by)
    VALUES (${name}, ${description}, ${subject}, ${user.id})
    RETURNING *
  `;

  await sql`
    INSERT INTO group_members (group_id, user_id)
    VALUES (${group.id}, ${user.id})
  `;

  return group;
}

export async function joinGroup(groupId: string) {
  const user = await syncUser();
  if (!user) redirect('/');

  await sql`
    INSERT INTO group_members (group_id, user_id)
    VALUES (${groupId}, ${user.id})
    ON CONFLICT (user_id, group_id) DO NOTHING
  `;
}

export async function leaveGroup(groupId: string) {
  const user = await syncUser();
  if (!user) redirect('/');

  await sql`
    DELETE FROM group_members
    WHERE user_id = ${user.id}
    AND group_id = ${groupId}
  `;
}

export async function deleteGroup(groupId: string) {
  const user = await syncUser();
  if (!user) redirect('/');

  const [group] = await sql`
    SELECT created_by FROM groups WHERE id = ${groupId}
  `;

  if (!group) throw new Error('Group not found');
  if (group.created_by !== user.id) throw new Error('Only the group creator can delete this group');

  await sql`
    DELETE FROM groups WHERE id = ${groupId}
  `;

  redirect('/groups');
}

export async function getMembershipStatus(groupId: string, userId: string) {
  const membership = await sql`
    SELECT id FROM group_members
    WHERE group_id = ${groupId}
    AND user_id = ${userId}
  `;
  return membership.length > 0;
}
