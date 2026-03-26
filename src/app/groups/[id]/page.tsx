import { notFound } from "next/navigation";
import { syncUser } from "@/lib/actions/syncUser";
import { getGroupById, getMembershipStatus, leaveGroup, deleteGroup, } from "@/lib/actions/groups";
import { getPostsByGroup, createPost } from "@/lib/actions/posts";
import { revalidatePath } from "next/cache";

import GroupInfo from "@/components/GroupInfo";
import GroupActions from "@/components/GroupActions";
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";

export default async function GroupPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const group = await getGroupById(id);
  if (!group) return notFound();


  const user = await syncUser();
  if (!user) return null;

  const isMember = await getMembershipStatus(id, user.id);
  const isCreator = group.created_by === user.id;

  const posts = await getPostsByGroup(id);

  async function handleLeave() {
    "use server";
    await leaveGroup(id);
    revalidatePath(`/groups/${id}`);
  }

  async function handleDelete() {
    "use server";
    await deleteGroup(id);
  }

  async function handleCreatePost(formData: FormData) {
    "use server";
    const content = formData.get("content")?.toString();
    if (!content) return;

    await createPost({ groupId: id, content });
    revalidatePath(`/groups/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <GroupInfo group={group} />

      <GroupActions
        isCreator={isCreator}
        isMember={isMember}
        onLeave={handleLeave}
        onDelete={handleDelete}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Posts</h2>

        {isMember && <PostForm action={handleCreatePost} />}

        <PostsList posts={posts} />
      </div>
    </div>
  );
}
