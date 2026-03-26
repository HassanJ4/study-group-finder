import EditBio from "./EditBio";

type Props = {
  user: {
    username: string;
    avatar_url: string | null;
    bio: string | null;
  };
  updateBio: (formData: FormData) => void;
};

export default function ProfileInfo({ user, updateBio }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{user.username}</h1>

      {user.avatar_url && (
        <img
          src={user.avatar_url ?? ""}
          alt={`${user.username}'s avatar`}
          className="w-20 h-20 rounded-full object-cover"
        />
      )}

      <p className="text-gray-700">{user.bio || "No bio yet."}</p>

      <EditBio currentBio={user.bio} action={updateBio} />
    </div>
  );
}
