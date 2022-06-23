import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// account
export interface FollowersOfAccountType {
  id: string;
}

export interface FollowingOfAccountType {
  id: string;
}

export interface AccountType extends QueryDocumentSnapshot<DocumentData> {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  coverPhoto?: string;
  avatar?: string;
  status?: string;
  about?: string;
  followers?: Array<FollowersOfAccountType>;
  following?: Array<FollowingOfAccountType>;
}

// chat
export interface ParticipantsOfChatType {
  id: string;
}

export interface ChatType extends QueryDocumentSnapshot<DocumentData> {
  id: string;
  participants?: ParticipantsOfChatType[];
}

export interface MessageType extends QueryDocumentSnapshot<DocumentData> {
  id: string;
  chatId?: string;
  message?: string;
  date?: Date;
}

// post
export interface LikedOfPostType {
  id: string;
}

export interface SavedOfPostType {
  id: string;
}

export interface PostType extends QueryDocumentSnapshot<DocumentData> {
  id: string;
  accountId?: string;
  dateCreated?: Date;
  description?: string;
  postPhoto?: string;
  liked?: Array<LikedOfPostType>;
  saved?: Array<SavedOfPostType>;
}

export interface CommentOfPostType {
  id: string;
}

export interface CommentType extends QueryDocumentSnapshot<DocumentData> {
  id: string;
  accountId?: string;
  postId?: string;
  dateCreated?: Date;
  comment?: string;
  liked?: Array<CommentOfPostType>;
}

// auth
// CredentialType also here
// AuthError name check
