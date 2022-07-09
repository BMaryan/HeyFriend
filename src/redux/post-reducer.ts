import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { CommentType, FirebaseType, PostType } from "../types/types";
import { InferActionsType, StateType } from "./store";
import { postAPI } from "../api/post-api";
import { ThunkAction } from "redux-thunk";
import { db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const SET_COMMENTS = "heyfriend/postPage/SET_COMMENTS";

const initialState = { posts: [] as Array<FirebaseType<PostType>>, comments: [] as Array<FirebaseType<CommentType>> };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof postActions>;

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

// actions
export const postActions = {
  setPosts: (posts: Array<FirebaseType<PostType>>) => ({ type: SET_POSTS, posts } as const),
  setComments: (comments: Array<FirebaseType<CommentType>>) => ({ type: SET_COMMENTS, comments } as const),
};

// thunk
export const setPostsThunk = (): ThunkAction<Promise<DocumentData<PostType>>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "posts"), (snapshot) => dispatch(postActions.setPosts(snapshot.docs)));

export const setCommentsThunk = (): ThunkAction<Promise<DocumentData<CommentType>>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "comments"), (snapshot) => dispatch(postActions.setComments(snapshot.docs)));

export const createPostThunk =
  (post: PostType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    postAPI.createPost(post);

export const createCommentThunk =
  (comment: CommentType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    postAPI.createComment(comment);

export const updatePostThunk =
  (post: PostType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    postAPI.updatePost(post);

export const updateCommentThunk =
  (comment: CommentType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    postAPI.updateComment(comment);

export const deletePostThunk =
  (post: PostType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    postAPI.deletePost(post);

export const deleteCommentThunk =
  (comment: CommentType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) =>
    postAPI.deleteComment(comment);

export default PostPage;
