import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { SUBJECTS } from "@/lib/constants";

export const metadata = {
  title: "Create New Group",
};

export async function createGroup(formData: FormData) {
  "use server";

  const user = await currentUser();
  if (!user) throw new Error("You must be signed in to create a group");

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString() || null;
  const subject = formData.get("subject")?.toString() || null;

  if (!name) throw new Error("Group name is required");

  await sql`
    INSERT INTO groups (name, description, subject, created_by)
    VALUES (${name}, ${description}, ${subject}, ${user.id})
  `;

  revalidatePath("/groups");
  redirect("/groups");
}

export default async function NewGroupPage() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Group</h1>

      <form action={createGroup} className="flex flex-col gap-4">
        <label>
          Group Name:
          <input
            type="text"
            name="name"
            placeholder="Enter group name"
            required
            className="border p-2 rounded w-full"
          />
        </label>

        <label>
          Description (optional):
          <textarea
            name="description"
            placeholder="Enter group description"
            className="border p-2 rounded w-full"
          />
        </label>

        <label>
          Subject:
          <select name="subject" required className="border p-2 rounded w-full">
            <option value="">Select a subject</option>
            {SUBJECTS.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}