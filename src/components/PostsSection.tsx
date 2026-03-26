import Link from "next/link";

type Post = {
  id: string;
  content: string;
  group_id: string;
  group_name: string;
};

export default function PostsSection({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">Your Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">You havent posted anything yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border-b pb-2">
              <p>{post.content}</p>
              <small className="text-gray-500">
                In{" "}
                <Link
                  href={`/groups/${post.group_id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.group_name}
                </Link>
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
