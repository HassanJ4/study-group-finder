'use server';

import { sql } from '@/lib/db';
import type { Group } from '@/types/database.types';

export async function getAllGroups(): Promise<Group[]> {
  try {
    const groups = await sql<Group[]>`
      SELECT * FROM groups
      ORDER BY created_at DESC
    `;
    return groups;
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
}