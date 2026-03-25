import Link from "next/link";
import { revalidatePath } from "next/cache";
import { syncUser } from "@/lib/actions/syncUser";
import { sql } from "@/lib/db";

type Group = {
  id: string;
  name: string;
  description: string | null;
};

export async function handleJoin(formData: FormData) {
  "use server";

  const groupId = formData.get("groupId")?.toString();
  const user = await syncUser();

  if (!user) throw new Error("You must be signed in to join a group");
  if (!groupId) throw new Error("Missing group ID");

  await sql`
    INSERT INTO group_members (user_id, group_id)
    VALUES (${user.id}, ${groupId})
    ON CONFLICT (user_id, group_id) DO NOTHING
  `;

  revalidatePath("/groups");
}

export default async function GroupsPage() {
  const user = await syncUser();

  const groups = await sql<Group[]>`
    SELECT * FROM groups
    ORDER BY created_at DESC
  `;

  const joinedGroupIds = user
    ? (await sql<{ group_id: string }[]>`
        SELECT group_id FROM group_members
        WHERE user_id = ${user.id}
      `).map((r: { group_id: string }) => r.group_id)
    : [];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">All Groups</h1>

      {groups.length === 0 ? (
        <p className="text-gray-600">No groups found.</p>
      ) : (
        <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
            <Link href={`/groups/${group.id}`}>
              <h2 className="text-xl font-semibold hover:underline">{group.name}</h2>
            </Link>
            <p className="text-gray-700 mt-1">{group.description}</p>

            <div className="mt-3">
                {user ? (
                    joinedGroupIds.includes(group.id) ? (
                    <button disabled className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded cursor-not-allowed">Joined</button>
                ) : (
                <form action={handleJoin}>
                  <input type="hidden" name="groupId" value={group.id} />
                  <button type="submit"className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Join</button>
                </form>
              )
            ) : (
              <p className="text-sm text-gray-500">Sign in to join</p>
            )}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}