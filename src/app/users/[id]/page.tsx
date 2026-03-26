import { getUserProfile, getUserGroups, getUserPosts } from "@/lib/actions/getUserProfile";
import PublicProfileInfo from "@/components/PublicProfileInfo";
import GroupsList from "@/components/GroupsList";
import PostsSection from "@/components/PostsSection";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log("params.id =", id);

  const user = await getUserProfile(id);
  if (!user) return (
    <p
      className="text-center mt-20 text-sm"
      style={{ color: "var(--sn-body)" }}
    >
      User not found
    </p>
  );

  const groups = await getUserGroups(user.id);
  const posts = await getUserPosts(user.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">

      <div
        className="rounded-3xl px-8 py-8 shadow-sm"
        style={{ backgroundColor: "var(--sn-surface)" }}
      >
        <PublicProfileInfo user={user} />
      </div>

      <div
        className="rounded-3xl px-8 py-8 shadow-sm"
        style={{ backgroundColor: "var(--sn-surface)" }}
      >
        <h2
          className="text-lg font-extrabold mb-5"
          style={{ color: "var(--sn-heading-dark)" }}
        >
          Groups
        </h2>
        <GroupsList groups={groups} />
      </div>

      <div
        className="rounded-3xl px-8 py-8 shadow-sm"
        style={{ backgroundColor: "var(--sn-surface)" }}
      >
        <h2
          className="text-lg font-extrabold mb-5"
          style={{ color: "var(--sn-heading-dark)" }}
        >
          Posts
        </h2>
        <PostsSection posts={posts} />
      </div>
    </div>
  );
}
