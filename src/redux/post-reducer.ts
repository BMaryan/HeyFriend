import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const SET_COMMENTS = "heyfriend/postPage/SET_COMMENTS";

type PostType = {
  id: string;
  accountId: string;
  dateCreated: Date;
  description: string;
  postPhoto: string;
  liked: { id: string }[];
  saved: { id: string }[];
};

type CommentType = {
  id: string;
  accountId: string;
  postId: string;
  dateCreated: Date;
  comment: string;
  postPhoto: string;
  liked: { id: string }[];
};

const initialState = { posts: [] as Array<PostType>, comments: [] as Array<CommentType> };

export type InitialStateType = typeof initialState;

const PostPage = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...state, posts: action.posts ? action.posts : [] };
    }
    case SET_COMMENTS: {
      return { ...state, comments: action.comments ? action.comments : [] };
    }
    default: {
      return state;
    }
  }
};

type SetPostsActionType = { type: typeof SET_POSTS; posts: Array<PostType> };

export const setPosts = (posts: Array<PostType>): SetPostsActionType => ({ type: SET_POSTS, posts });

type SetCommentsActionType = { type: typeof SET_COMMENTS; comments: Array<CommentType> };

export const setComments = (comments: Array<CommentType>): SetCommentsActionType => ({ type: SET_COMMENTS, comments });

// thunk
export const setPostsThunk = () => async (dispatch: any) => await onSnapshot(collection(db, "posts"), (snapshot: any) => !snapshot.empty && dispatch(setPosts(snapshot.docs)));

export const setCommentsThunk = () => async (dispatch: any) => await onSnapshot(collection(db, "comments"), (snapshot: any) => !snapshot.empty && dispatch(setComments(snapshot.docs)));

export const createPostThunk = (post: PostType) => async (dispatch: any) => {
  let res = await addDoc(collection(db, "posts"), { ...post });

  await updateDoc(doc(db, "posts", res.id), { ...post, id: res.id });
};

export const createCommentThunk = (comment: CommentType) => async (dispatch: any) => {
  let res = await addDoc(collection(db, "comments"), { ...comment });

  await updateDoc(doc(db, "comments", res.id), { ...comment, id: res.id });
};

export const updatePostThunk = (post: PostType) => async (dispatch: any) => await updateDoc(doc(db, "posts", post.id), post);

export const updateCommentThunk = (comment: CommentType) => async (dispatch: any) => await updateDoc(doc(db, "comments", comment.id), comment);

export const deletePostThunk = (post: PostType) => async (dispatch: any) => await deleteDoc(doc(db, "posts", post.id));

export const deleteCommentThunk = (comment: CommentType) => async (dispatch: any) => await deleteDoc(doc(db, "comments", comment.id));

export default PostPage;
