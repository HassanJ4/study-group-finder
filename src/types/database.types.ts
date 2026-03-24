export interface User {
  id: string;
  clerk_id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  subject: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
}

export interface Post {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface PostWithUser extends Post {
  users: {
    username: string;
    avatar_url: string | null;
  };
}

export interface GroupMemberWithGroup extends GroupMember {
  groups: Group;
}