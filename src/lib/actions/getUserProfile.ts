"use server";

import { sql } from "@/lib/db";
import type { PublicUser, SimpleGroup, PostWithGroup } from "@/types/database.types";

export async function getUserProfile(id: string) {
  const [user] = await sql<PublicUser[]>`
    SELECT id, username, avatar_url, bio
    FROM users
    WHERE id = ${id}
  `;
  return user || null;
}

export async function getUserGroups(id: string) {
  return await sql<SimpleGroup[]>`
    SELECT g.id, g.name
    FROM groups g
    JOIN group_members gm ON g.id = gm.group_id
    WHERE gm.user_id = ${id}
  `;
}

export async function getUserPosts(id: string) {
  return await sql<PostWithGroup[]>`
    SELECT p.id, p.group_id, p.user_id, p.content, p.created_at,
           g.name AS group_name
    FROM posts p
    JOIN groups g ON p.group_id = g.id
    WHERE p.user_id = ${id}
  `;
}
