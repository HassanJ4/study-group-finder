"use client";

export default function GroupActions({
  isCreator,
  isMember,
  onLeave,
  onDelete,
}: {
  isCreator: boolean;
  isMember: boolean;
  onLeave: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="space-x-3">
      {!isCreator && isMember && (
        <button onClick={onLeave} className="text-sm text-red-500 hover:underline">
          Leave Group
        </button>
      )}

      {isCreator && (
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete Group
        </button>
      )}
    </div>
  );
}
