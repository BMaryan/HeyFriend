const SET_POSTS = "heyfriend/postPage/SET_POSTS";

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
    default: {
      return state;
    }
  }
};

export const setPosts = (posts) => ({ type: SET_POSTS, posts });

// thunks
// export const createPostThunk = (data) => async (dispatch, getState) => {
//   await onAuthStateChanged(auth, (user) => user && setDoc(doc(db, "posts", user.uid), { ...data }));

//   // onSnapshot(collection(db, "posts"), (snapshot) => console.log(snapshot.docs));
//   return onSnapshot(collection(db, "posts"), (snapshot) => dispatch(createPost(snapshot.docs)));
//   // const resp = await getDoc(doc(db, "posts"));

//   // dispatch(createPost(resp.data()));
// };

export default PostPage;
