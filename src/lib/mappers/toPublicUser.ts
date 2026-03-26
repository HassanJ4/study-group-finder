import type { PublicUser } from "@/types/database.types";
import { syncUser } from "@/lib/actions/syncUser";

export function toPublicUser(user: unknown): PublicUser {
  if (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    "username" in user &&
    "avatar_url" in user &&
    "bio" in user
  ) {
    return {
      id: user.id as string,
      username: user.username as string,
      avatar_url: user.avatar_url as string | null,
      bio: user.bio as string | null,
    };
  }

  throw new Error("Invalid user shape returned from syncUser()");
}
