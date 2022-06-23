import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { CommentType, PostType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { StateType } from "./store";
import { db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const SET_COMMENTS = "heyfriend/postPage/SET_COMMENTS";

const initialState = { posts: [] as Array<PostType>, comments: [] as Array<CommentType> };

export type InitialStateType = typeof initialState;
type ActionsType = SetPostsActionType | SetCommentsActionType;

const PostPage = (state = initialState, action: ActionsType) => {
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
export const setPostsThunk = (): ThunkAction<Promise<object>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "posts"), (snapshot) => dispatch(setPosts(snapshot.docs)));

export const setCommentsThunk = (): ThunkAction<Promise<object>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "comments"), (snapshot) => dispatch(setComments(snapshot.docs)));

export const createPostThunk =
  (post: PostType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    let res = await addDoc(collection(db, "posts"), { ...post });

    await updateDoc(doc(db, "posts", res.id), { ...post, id: res.id });
  };

export const createCommentThunk =
  (comment: CommentType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    let res = await addDoc(collection(db, "comments"), { ...comment });

    await updateDoc(doc(db, "comments", res.id), { ...comment, id: res.id });
  };

export const updatePostThunk =
  (post: PostType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    await updateDoc(doc(db, "posts", post.id), { ...post });

export const updateCommentThunk =
  (comment: CommentType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    await updateDoc(doc(db, "comments", comment.id), { ...comment });

export const deletePostThunk =
  (post: PostType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    await deleteDoc(doc(db, "posts", post.id));

export const deleteCommentThunk =
  (comment: CommentType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    await deleteDoc(doc(db, "comments", comment.id));

export default PostPage;
