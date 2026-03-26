type Props = {
  user: {
    username: string;
    avatar_url: string | null;
    bio: string | null;
  };
};

export default function PublicProfileInfo({ user }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{user.username}</h1>

      {user.avatar_url && (
        <img
          src={user.avatar_url}
          alt={`${user.username}'s avatar`}
          className="w-20 h-20 rounded-full object-cover"
        />
      )}

      <p className="text-gray-700">{user.bio || "No bio yet."}</p>
    </div>
  );
}
