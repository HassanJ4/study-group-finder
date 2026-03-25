import { sql } from "@/lib/db";
import { notFound } from "next/navigation";
import { syncUser } from '@/lib/actions/syncUser';
import { revalidatePath } from 'next/cache';
import { joinGroup, leaveGroup, deleteGroup } from '@/lib/actions/groups';

type Group = {
  id: string;
  name: string;
  description: string | null;
  subject: string | null;
  created_by: string;
  created_at: string;
};

export default async function GroupPage({
  params,
}: {
  params: { id: string };
}) {
 const { id } = await params;

  const groups = await sql<Group[]>`
    SELECT id, name, description, subject, created_by, created_at
    FROM groups
    WHERE id = ${id}
  `;

  const group = groups[0];

  if (!group) {
    return notFound();
  }

  const user = await syncUser();
if (!user) return null;

  const membership = await sql`
  SELECT id FROM group_members
  WHERE group_id = ${id}
  AND user_id = ${user.id}
`;
  const isMember = membership.length > 0;
  const isCreator = group.created_by === user.id;

  async function handleLeave() {
  'use server';
  await leaveGroup(id);
  revalidatePath(`/groups/${id}`);
}

async function handleDelete() {
  'use server';
  await deleteGroup(id);
}
console.log('created_by:', group.created_by, 'user.id:', user.id, 'isMember:', isMember, 'isCreator:', isCreator);
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{group.name}</h1>

      {group.subject && (
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
          {group.subject}
        </span>
      )}

      {!isCreator && isMember && (
  <form action={handleLeave}>
    <button className="text-sm text-red-500 hover:underline">
      Leave Group
    </button>
  </form>
)}

{isCreator && (
  <form action={handleDelete}>
    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
      Delete Group
    </button>
  </form>
)}

      {group.description && (
        <p className="text-gray-700 leading-relaxed">{group.description}</p>
      )}

      <div className="text-sm text-gray-500">
        <p>Created by: {group.created_by}</p>
        <p>Created on: {new Date(group.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

