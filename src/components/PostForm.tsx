"use client";

import { useState } from "react";

export default function PostForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      action={async (formData) => {
        await action(formData);
        setValue("");
      }}
      className="space-y-2"
    >
      <textarea
        name="content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a post..."
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
}
