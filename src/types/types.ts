import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Auth } from "firebase/auth";

// firebase
export interface FirebaseType<T> extends QueryDocumentSnapshot<T> {}

// auth
export interface AuthType extends Auth {}

export interface AuthErrorType extends FirebaseError {}

export interface SignType {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

// account
export interface FollowersOfAccountType {
  id: string;
}

export interface FollowingOfAccountType {
  id: string;
}

export interface MetadataOfAccountType {
  createdAt?: string;
  lastLoginAt?: string;
  creationTime?: string;
  lastSignInTime?: string;
}

export interface AccountType {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  avatar?: string;
  coverPhoto?: string;
  status?: string;
  aboutMe?: string;
  isOnline?: boolean;
  metadata?: MetadataOfAccountType;
  followers?: Array<FollowersOfAccountType>;
  following?: Array<FollowingOfAccountType>;
}

// chat
export interface ParticipantsOfChatType {
  id: string;
}

export interface CreateChatType {
  title?: string;
  ownerId?: string;
  dateCreated: Timestamp;
  participants: Array<ParticipantsOfChatType>;
}

export interface ChatType extends CreateChatType {
  id: string;
  typing?: string | null;
}

export interface MediaOfMessageType {
  media: string;
}

export interface MessageType {
  id: string;
  accountId?: string;
  chatId?: string;
  message: string;
  date: Timestamp;
  medias: Array<MediaOfMessageType>;
}

// post
export interface LikedOfPostType {
  id: string;
}

export interface SavedOfPostType {
  id: string;
}

export interface MediaOfPostType {
  media: string;
}

export interface PostType {
  id: string;
  accountId?: string;
  dateCreated: Timestamp;
  description: string;
  medias: Array<MediaOfPostType>;
  liked?: Array<LikedOfPostType>;
  saved?: Array<SavedOfPostType>;
}

export interface LikedOfCommentType {
  id: string;
}

export interface CommentType {
  id: string;
  accountId?: string;
  postId?: string;
  dateCreated: Timestamp;
  comment: string;
  liked?: Array<LikedOfPostType>;
  // replies?: Array<RepliesOfCommentType>;
}

export interface ReplyType {
  id: string;
  accountId?: string;
  commentId?: string;
  dateCreated: Timestamp;
  reply: string;
  liked?: Array<LikedOfPostType>;
}

// react router dom
export interface ParamsOfMatchType {
  id: string;
}

export interface MatchType {
  params: ParamsOfMatchType;
  isExact: boolean;
  path: string;
  url: string;
}

export interface LocationType {
  pathname: string;
}

export interface HistoryType {
  location: LocationType;
  push: (url: string) => void;
  goBack: () => void;
}

// navigation
export interface NavigationType {
  path: string;
  title: string;
}
