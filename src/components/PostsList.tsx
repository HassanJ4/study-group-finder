import type { GroupPost } from "@/lib/actions/posts";

export default function PostsList({ posts }: { posts: GroupPost[] }) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500">No posts yet.</p>;
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.id} className="border p-3 rounded">
          <p>{post.content}</p>

          <p className="text-sm text-gray-500">
            Posted by {post.username}
          </p>
        </div>
      ))}
    </div>
  );
}
