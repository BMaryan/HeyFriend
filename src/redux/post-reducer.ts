import { CommentType, FirebaseType, PostType } from "../types/types";
import { collection, onSnapshot } from "firebase/firestore";
import { InferActionsType, StateType } from "./store";
import { postAPI } from "../api/post-api";
import { ThunkAction } from "redux-thunk";
import { db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const SET_COMMENTS = "heyfriend/postPage/SET_COMMENTS";
const SET_SUCCESS = "heyfriend/postPage/SET_SUCCESS";
const SET_LOADING = "heyfriend/postPage/SET_LOADING";
const SET_ERROR = "heyfriend/postPage/SET_ERROR";

const initialState = { posts: [] as Array<FirebaseType<PostType>>, comments: [] as Array<FirebaseType<CommentType>>, error: null as any | null, loading: false };

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
    case SET_SUCCESS: {
      return { ...state, error: null };
    }
    case SET_LOADING: {
      return { ...state, loading: action.loading };
    }
    case SET_ERROR: {
      return { ...state, error: action.error?.message };
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
  setSuccess: () => ({ type: SET_SUCCESS } as const),
  setLoading: (loading: boolean) => ({ type: SET_LOADING, loading } as const),
  setError: (error: any) => ({ type: SET_ERROR, error } as const),
};

// thunk
export const setPostsThunk = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  dispatch(postActions.setLoading(true));

  try {
    await onSnapshot(collection(db, "posts"), (snapshot) => dispatch(postActions.setPosts(snapshot.docs)));

    dispatch(postActions.setSuccess());
  } catch (error: any) {
    dispatch(postActions.setError(error));
  }

  dispatch(postActions.setLoading(false));
};

export const setCommentsThunk = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  dispatch(postActions.setLoading(true));

  try {
    await onSnapshot(collection(db, "comments"), (snapshot) => dispatch(postActions.setComments(snapshot.docs)));

    dispatch(postActions.setSuccess());
  } catch (error: any) {
    dispatch(postActions.setError(error));
  }

  dispatch(postActions.setLoading(false));
};
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
