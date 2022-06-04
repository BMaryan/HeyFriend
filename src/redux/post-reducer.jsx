import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const CREATE_POST = "heyfriend/postPage/CREATE_POST";
const UPDATE_POST = "heyfriend/postPage/UPDATE_POST";
const DELETE_POST = "heyfriend/postPage/DELETE_POST";

const initialState = {
  posts: [],
};

const PostPage = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.posts ? action.posts : [],
      };
    }
    case CREATE_POST: {
      let newPost = { ...action.data };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case UPDATE_POST: {
      return {
        ...state,
        posts: state?.posts ? state?.posts?.map((item) => (item?.id === action?.post?.id ? (item = { ...action?.post }) : [...state.posts])).flat() : [],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state?.posts ? state.posts.filter((item) => item.id !== action.post.id) : [],
      };
    }
    default: {
      return state;
    }
  }
};

export const setPosts = (posts) => ({ type: SET_POSTS, posts });

export const createPost = (data) => ({ type: CREATE_POST, data });

export const updatePost = (post) => ({ type: UPDATE_POST, post });

export const deletePost = (post) => ({ type: DELETE_POST, post });

// thunk
export const setPostsThunk = () => async (dispatch) => await onSnapshot(collection(db, "posts"), (snapshot) => !snapshot.empty && dispatch(setPosts(snapshot.docs)));

export const createPostThunk = (data) => async (dispatch) => {
  let res = await addDoc(collection(db, "posts"), { ...data });

  await updateDoc(doc(db, "posts", res.id), { ...data, id: res.id });

  // dispatch(createPost({ ...data }));
};

export const updatePostThunk = (post) => async (dispatch) => {
  await updateDoc(doc(db, "posts", post.id), post);

  // dispatch(updatePost(post));
};

export const deletePostThunk = (post) => async (dispatch) => {
  await deleteDoc(doc(db, "posts", post.id));

  // dispatch(deletePost(post));
};

export default PostPage;
