import type { Group } from "@/types/database.types";

export default function GroupHeader({ group }: { group: Group }) {
  return (
    <div className="space-y-3">
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
        <p>
  Created on:{" "}
  {new Date(group.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}
</p>
      </div>
    </div>
  );
}
