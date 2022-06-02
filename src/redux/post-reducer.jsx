import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const SET_POSTS = "heyfriend/postPage/SET_POSTS";
const CREATE_POST = "heyfriend/postPage/CREATE_POST";
const DELETE_POST = "heyfriend/postPage/DELETE_POST";

const initialState = {
  posts: [],
};

const PostPage = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case CREATE_POST: {
      let newPost = { ...action.data };

      return {
        ...state,
        posts: [...state.posts, newPost],
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

export const deletePost = (post) => ({ type: DELETE_POST, post });

// thunk
export const setPostsThunk = () => async (dispatch) =>
  await onSnapshot(collection(db, "posts"), (snapshot) => {
    // console.log(snapshot.docs);
    dispatch(setPosts(snapshot.docs));
  });

export const createPostThunk =
  ({ id, data }) =>
  async (dispatch) => {
    await addDoc(collection(db, "posts"), { ...data, accountId: id });

    dispatch(createPost({ ...data }));
  };

export const deletePostThunk = (post) => async (dispatch) => {
  await deleteDoc(doc(db, "posts", post.id));

  dispatch(deletePost(post));
};

export default PostPage;
