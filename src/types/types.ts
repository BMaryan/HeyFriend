import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { User, UserInfo } from "firebase/auth";

// firebase
export interface FirebaseType<T> extends QueryDocumentSnapshot<T> {}

// account
export interface FollowersOfAccountType {
  id: string;
}

export interface FollowingOfAccountType {
  id: string;
}

export interface AccountType {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  coverPhoto?: string;
  avatar?: string;
  status?: string;
  aboutMe?: string;
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
  dateCreated?: Date;
  comment: string;
  liked?: Array<LikedOfPostType>;
  answered?: Array<AnsweredOfCommentType>;
}

// auth
export interface AuthType extends User, UserInfo {}

export interface CredentialType {}

// CredentialType
// AuthError name check

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
