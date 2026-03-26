"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateBio(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const bio = formData.get("bio")?.toString() || "";

  await sql`
    UPDATE users
    SET bio = ${bio}
    WHERE clerk_user_id = ${userId}
  `;

  revalidatePath("/users/you");
}
