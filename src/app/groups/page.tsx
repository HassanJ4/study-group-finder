import Link from "next/link";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server"
import { sql } from "@/lib/db";

type Group = { 
    id:string;
    name:string;
    description: string | null;
};

export async function handleJoin(formData: FormData) {
  "use server";

  const groupId = formData.get("groupId")?.toString();
  const { userId } = await auth(); 
  
  if (!userId) throw new Error("You must be signed in to join a group");
  if (!groupId) throw new Error("Missing group ID");


  await sql`
    INSERT INTO group_members (user_id, group_id)
    VALUES (${user.id}, ${groupId})
    ON CONFLICT (user_id, group_id) DO NOTHING
  `;

  revalidatePath("/groups");}

export default async function GroupsPage() {
  const user = await currentUser();

  const groups: Group[] = await sql<Group>`SELECT * FROM groups`;

  const joinedGroupIds =
    user?.id
      ? (await sql<{ group_id: string }[]>`
          SELECT group_id FROM group_members
          WHERE user_id = ${user.id}
        `).map((r) => r.group_id)
      : [];

  return (
    <div>
      <h1>All Groups</h1>

      {groups.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        groups.map((group) => (
          <div key={group.id}>
            <Link href={`/groups/${group.id}`}>
              <h2>{group.name}</h2>
            </Link>
            <p>{group.description}</p>

            {user ? (
              joinedGroupIds.includes(group.id) ? (
                <button disabled>Joined</button>
              ) : (
                <form action={handleJoin}>
                  <input type="hidden" name="groupId" value={group.id} />
                  <button type="submit">Join</button>
                </form>
              )
            ) : (
              <p>Sign in to join</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}