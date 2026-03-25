'use server';
import { sql } from '@/lib/db';
import { syncUser } from './syncUser';

export async function getPostsByGroup(groupId: string) {
  const posts = await sql`
    SELECT
      posts.id,
      posts.content,
      posts.created_at,
      users.username,
      users.avatar_url
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.group_id = ${groupId}
    ORDER BY posts.created_at DESC
  `;
  return posts;
}

export async function createPost({
  groupId,
  content,
}: {
  groupId: string;
  content: string;
}) {
  const user = await syncUser();
  if (!user) return;

  await sql`
    INSERT INTO posts (group_id, user_id, content)
    VALUES (${groupId}, ${user.id}, ${content})
  `;
}