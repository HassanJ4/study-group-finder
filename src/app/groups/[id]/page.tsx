import { sql } from "@/lib/db";
import { notFound } from "next/navigation";

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
  const { id } = params;

  const groups = await sql<Group[]>`
    SELECT id, name, description, subject, created_by, created_at
    FROM groups
    WHERE id = ${id}
  `;

  const group = groups[0];

  if (!group) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{group.name}</h1>

      {group.subject && (
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
          {group.subject}
        </span>
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
