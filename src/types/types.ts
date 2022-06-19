// account
export type AccountType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  coverPhoto: string;
  avatar: string;
  followers: { id: string }[];
  following: { id: string }[];
};

// chat
export type ChatType = { id: string; participants: { id: string }[] };

export type MessageType = { id: string; chatId: string; message: string; date: Date };

// post
export type PostType = {
  id: string;
  accountId: string;
  dateCreated: Date;
  description: string;
  postPhoto: string;
  liked: { id: string }[];
  saved: { id: string }[];
};

export type CommentType = {
  id: string;
  accountId: string;
  postId: string;
  dateCreated: Date;
  comment: string;
  postPhoto: string;
  liked: { id: string }[];
};
