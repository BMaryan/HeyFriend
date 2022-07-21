import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { Auth, AuthError, User, UserInfo } from "firebase/auth";
import { FirebaseError } from "firebase/app";

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
  coverPhoto?: string;
  avatar?: string;
  status?: string;
  aboutMe?: string;
  isOnline?: string | null;
  metadata?: MetadataOfAccountType;
  followers?: Array<FollowersOfAccountType>;
  following?: Array<FollowingOfAccountType>;
}

// chat
export interface ParticipantsOfChatType {
  id: string;
}

export interface ChatType {
  id: string;
  participants?: Array<ParticipantsOfChatType>;
}

export interface MessageType {
  id: string;
  accountId?: string;
  chatId?: string;
  message: string;
  date: Timestamp;
}

// post
export interface LikedOfPostType {
  id: string;
}

export interface SavedOfPostType {
  id: string;
}

export interface PostType {
  id: string;
  accountId?: string;
  dateCreated: Timestamp;
  description: string;
  postPhoto?: string;
  liked?: Array<LikedOfPostType>;
  saved?: Array<SavedOfPostType>;
}

export interface LikedOfCommentType {
  id: string;
}

export interface AnsweredOfCommentType {
  id: string;
}

export interface CommentType {
  id: string;
  accountId?: string;
  postId?: string;
  dateCreated?: Timestamp;
  comment: string;
  liked?: Array<LikedOfPostType>;
  answered?: Array<AnsweredOfCommentType>;
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
