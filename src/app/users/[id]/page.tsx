import { getUserProfile, getUserGroups, getUserPosts } from "@/lib/actions/getUserProfile";
import PublicProfileInfo from "@/components/PublicProfileInfo";
import GroupsList from "@/components/GroupsList";
import PostsSection from "@/components/PostsSection";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const user = await getUserProfile(id);
  if (!user) return <p>User not found</p>;

  const groups = await getUserGroups(user.id);
  const posts = await getUserPosts(user.id);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <PublicProfileInfo user={user} />
      <GroupsList groups={groups} />
      <PostsSection posts={posts} />
    </div>
  );
}
