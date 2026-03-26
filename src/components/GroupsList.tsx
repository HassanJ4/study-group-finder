import Link from "next/link";

type Group = {
  id: string;
  name: string;
};

export default function GroupsList({ groups }: { groups: Group[] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">Your Groups</h2>

      {groups.length === 0 ? (
        <p className="text-gray-600">You havent joined any groups yet.</p>
      ) : (
        <ul className="space-y-1">
          {groups.map((group) => (
            <li key={group.id}>
              <Link
                href={`/groups/${group.id}`}
                className="text-blue-600 hover:underline"
              >
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
