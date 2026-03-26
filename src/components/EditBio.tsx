"use client";

import { useState } from "react";

export default function EditBio({
  currentBio,
  action,
}: {
  currentBio: string | null;
  action: (formData: FormData) => void;
}) {
  const [value, setValue] = useState(currentBio || "");

  return (
    <form action={action} className="space-y-2">
      <textarea
        name="bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border p-2 rounded resize-none"
        rows={4}
        placeholder="Write something about yourself..."
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save Bio
      </button>
    </form>
  );
}
