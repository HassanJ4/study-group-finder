"use server";

import { sql } from "@/lib/db";
import type { PublicUser } from "@/types/database.types";

export async function getAllUsers(): Promise<PublicUser[]> {
  return await sql <PublicUser[]>`
    SELECT id, username, avatar_url, bio
    FROM users
    ORDER BY username
  `;
}
