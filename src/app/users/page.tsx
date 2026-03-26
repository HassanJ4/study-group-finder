import { getAllUsers } from "@/lib/actions/getAllUsers";
import Link from "next/link";

export default async function UsersIndex() {
  const users = await getAllUsers();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">All Users</h1>

      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/users/${u.id}`} className="text-blue-600 hover:underline">
              {u.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
