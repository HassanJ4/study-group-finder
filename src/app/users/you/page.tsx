import { syncUser } from "@/lib/actions/syncUser";
import { getUserGroups, getUserPosts } from "@/lib/actions/getUserProfile";

import ProfileInfo from "@/components/ProfileInfo";
import GroupsList from "@/components/GroupsList";
import PostsSection from "@/components/PostsSection";

import { updateBio } from "@/lib/actions/updateBio";
import { toPublicUser } from "@/lib/mappers/toPublicUser";

export default async function YourProfile() {
  const user = await syncUser();
  if (!user) return <p>Not signed in</p>;

  const publicUser = toPublicUser(user);

  const groups = await getUserGroups(publicUser.id);
  const posts = await getUserPosts(publicUser.id);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <ProfileInfo user={publicUser} updateBio={updateBio} />
      <GroupsList groups={groups} />
      <PostsSection posts={posts} />
    </div>
  );
}
