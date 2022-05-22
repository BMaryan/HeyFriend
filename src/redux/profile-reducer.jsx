import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ADD_ACCOUNT = "heyfriend/profilePage/ADD_ACCOUNT";
const IS_ACCOUNT = "heyfriend/auth/IS_ACCOUNT";
const GET_PROFILE_DATA = "heyfriend/profilePage/GET_PROFILE_DATA";
const SET_PROFILE_POSTS = "heyfriend/profilePage/SET_PROFILE_POSTS";
const SET_PROFILE_CHATS = "heyfriend/profilePage/SET_PROFILE_CHATS";
const GET_AUTHORIZATION_ID = "heyfriend/profilePage/GET_AUTHORIZATION_ID";
const GET_PARAMS_ID = "heyfriend/profilePage/GET_PARAMS_ID";
const PUT_LIKE = "heyfriend/profilePage/PUT_LIKE";
const TAKE_LIKE = "heyfriend/profilePage/TAKE_LIKE";
const FOLLOWING = "heyfriend/profilePage/FOLLOWING";
const UNFOLLOWING = "heyfriend/profilePage/UNFOLLOWING";
const SAVE_POST = "heyfriend/profilePage/SAVE_POST";
const DELETE_SAVED_POST = "heyfriend/profilePage/DELETE_SAVED_POST";
const DELETE_POST = "heyfriend/profilePage/DELETE_POST";
const ADD_COMMENT = "heyfriend/profilePage/ADD_COMMENT";

//
const SET_ACCOUNTS = "heyfriend/profilePage/SET_ACCOUNTS";
const SET_ACCOUNT = "heyfriend/profilePage/SET_ACCOUNT";
const UPDATE_ACCOUNT = "heyfriend/profilePage/UPDATE_ACCOUNT";

const initialState = {
  accounts: [],
  account: null,
  //
  authorizationId: null,
  paramsId: null,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT: {
      let newProfile = {
        id: action.id,
        profile: { ...action.profile },
      };

      return {
        ...state,
        accounts: state.accounts && newProfile && newProfile.id ? [...state.accounts, { ...newProfile }] : [...state.accounts],
      };
    }
    case IS_ACCOUNT: {
      return {
        ...state,
        account: action.profile ? { ...action.profile } : null,
      };
    }
    case GET_PROFILE_DATA: {
      return {
        ...state,
        account: {
          ...state.account,
          profile: state.account && state.account.profile && action.profile ? { ...state.account.profile, ...action.profile } : { ...state.account.profile },
        },
      };
    }
    case SET_PROFILE_POSTS: {
      let newPost = {
        id: action.data.id,
        photo: action.data.photo,
        likes: action.data.likes,
        comments: action.data.comments,
        dateCreated: action.data.dateCreated,
        description: action.data.description,
      };

      return {
        ...state,
        account: {
          ...state.account,
          profile:
            state.account && state.account.profile
              ? {
                  ...state.account.profile,
                  posts: state.account && state.account.profile && state.account.profile.posts ? [...state.account.profile.posts, { ...newPost }] : [{ ...newPost }],
                }
              : { ...state.account.profile },
        },
      };
    }
    case SET_PROFILE_CHATS: {
      return {
        ...state,
        account:
          state.account && state.account.profile
            ? {
                ...state.account,
                profile:
                  state.account && state.account.profile
                    ? {
                        ...state.account.profile,
                        chats: state.account && state.account.profile && state.account.profile.chats ? [...state.account.profile.chats, ...action.chats] : [...action.chats],
                      }
                    : null,
              }
            : null,
      };
    }
    case GET_AUTHORIZATION_ID: {
      return {
        ...state,
        authorizationId: action.id,
      };
    }
    case GET_PARAMS_ID: {
      return {
        ...state,
        paramsId: action.id,
      };
    }
    case FOLLOWING: {
      return {
        ...state,
        accounts: state.accounts.map((account) => (account.id === action.currentAccountId ? { ...account, profile: { ...account.profile, followers: account.profile.followers && account.profile.followers.length > 0 ? [...account.profile.followers, { id: state.account.id }] : [{ id: state.account.id }] } } : { ...account })),
        account: {
          ...state.account,
          profile:
            state.account && state.account.profile && action.currentAccountId
              ? {
                  ...state.account.profile,
                  following: state.account && state.account.profile && state.account.profile.following ? [...state.account.profile.following, { id: action.currentAccountId }] : [{ id: action.currentAccountId }],
                }
              : { ...state.account.profile },
        },
      };
    }
    case UNFOLLOWING: {
      return {
        ...state,
        accounts: state.accounts.map((account) => (account.id === action.currentAccountId ? { ...account, profile: { ...account.profile, followers: account.profile.followers && account.profile.followers.length > 0 ? account.profile.followers.filter((follower) => follower.id !== state.account.id) : [{ id: state.account.id }] } } : { ...account })),
        account: {
          ...state.account,
          profile:
            state.account && state.account.profile && action.currentAccountId
              ? {
                  ...state.account.profile,
                  following: state.account && state.account.profile && state.account.profile.following ? state.account.profile.following.filter((followingAc) => followingAc.id !== action.currentAccountId) : [],
                }
              : { ...state.account.profile },
        },
      };
    }
    case SAVE_POST: {
      return {
        ...state,
        account: {
          ...state.account,
          profile:
            state.account && state.account.profile
              ? {
                  ...state.account.profile,
                  savedPosts: state.account && state.account.profile && state.account.profile.savedPosts ? [...state.account.profile.savedPosts, action.id] : [action.id],
                }
              : { ...state.account.profile },
        },
      };
    }
    case DELETE_SAVED_POST: {
      return {
        ...state,
        account: {
          ...state.account,
          profile:
            state.account && state.account.profile
              ? {
                  ...state.account.profile,
                  savedPosts: state.account && state.account.profile && state.account.profile.savedPosts ? state.account.profile.savedPosts.filter((idPost) => idPost !== action.id) : [],
                }
              : { ...state.account.profile },
        },
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        account: {
          ...state.account,
          profile: {
            ...state.account.profile,
            posts: state.account && state.account.profile && state.account.profile.posts ? state.account.profile.posts.filter((post) => post.id !== action.id) : [],
          },
        },
      };
    }
    case PUT_LIKE: {
      let currentAccount = state.accounts.find((account) => account?.profile?.posts.find((post) => post.id === action.postId));

      return {
        ...state,
        accounts: state.accounts.map((account) => (account.id === currentAccount.id ? { ...account, profile: { ...account.profile, posts: account.profile.posts.map((post) => (post.id === action.postId ? { ...post, likes: post.likes && post.likes.length > 0 ? [...post.likes, { id: state.account.id }] : [{ id: state.account.id }] } : { ...post })) } } : { ...account })),
        account: {
          ...state.account,
          profile: { ...state.account.profile, likedPosts: state.account.profile.likedPosts && state.account.profile.likedPosts.length > 0 ? [...state.account.profile.likedPosts, { id: action.postId }] : [{ id: action.postId }] },
        },
      };
    }
    case TAKE_LIKE: {
      let currentAccount = state.accounts.find((account) => account?.profile?.posts.find((post) => post.id === action.postId));

      return {
        ...state,
        accounts: state.accounts.map((account) => (account.id === currentAccount.id ? { ...account, profile: { ...account.profile, posts: account?.profile?.posts.map((post) => (post.id === action.postId ? { ...post, likes: post.likes && post.likes.length > 0 ? post.likes.filter((like) => like.id !== state.account.id) : [] } : { ...post })) } } : { ...account })),
        account: {
          ...state.account,
          profile: { ...state.account.profile, likedPosts: state.account.profile.likedPosts && state.account.profile.likedPosts.length > 0 ? state.account.profile.likedPosts.filter((like) => like.id !== action.postId) : [] },
        },
      };
    }
    case ADD_COMMENT: {
      let currentAccount = state.accounts.find((account) => account?.profile?.posts.find((post) => post.id === action.postId));
      console.log(currentAccount);

      return {
        ...state,
        accounts: state.accounts.map((account) => (account.id === currentAccount.id ? { ...account, profile: { ...account.profile, posts: account.profile.posts.map((post) => (post.id === action.postId ? { ...post, comments: post.comments && post.comments.length > 0 ? [...post.comments, { comment: action.comment }] : [{ comment: action.comment }] } : { ...post })) } } : { ...account })),
      };
    }

    // ------------------------------------------

    case SET_ACCOUNTS: {
      return {
        ...state,
        accounts: [...action.accounts],
      };
    }
    case SET_ACCOUNT: {
      return {
        ...state,
        account: action.account,
      };
    }
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        account: action.account,
      };
    }
    default: {
      return state;
    }
  }
};

export const addAccount = (id, profile) => ({
  type: ADD_ACCOUNT,
  id,
  profile,
});

export const isAccount = (profile) => ({
  type: IS_ACCOUNT,
  profile,
});

export const getProfileData = (profile) => ({
  type: GET_PROFILE_DATA,
  profile,
});

export const setProfilePosts = (data) => ({
  type: SET_PROFILE_POSTS,
  data,
});

export const setProfileChats = (chats) => ({
  type: SET_PROFILE_CHATS,
  chats,
});

export const getAuthorizationId = (id) => ({
  type: GET_AUTHORIZATION_ID,
  id,
});

export const getParamsId = (id) => ({
  type: GET_PARAMS_ID,
  id,
});

export const putLike = (postId) => ({
  type: PUT_LIKE,
  postId,
});

export const takeLike = (postId) => ({
  type: TAKE_LIKE,
  postId,
});

export const following = (currentAccountId) => ({
  type: FOLLOWING,
  currentAccountId,
});

export const unFollowing = (currentAccountId) => ({
  type: UNFOLLOWING,
  currentAccountId,
});

export const savePost = (id) => ({
  type: SAVE_POST,
  id,
});

export const deleteSavedPost = (id) => ({
  type: DELETE_SAVED_POST,
  id,
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});

export const addComment = (postId, comment) => ({
  type: ADD_COMMENT,
  postId,
  comment,
});

// -----------------------------------------

export const setAccounts = (accounts) => ({ type: SET_ACCOUNTS, accounts });

export const setAccount = (account) => ({ type: SET_ACCOUNT, account });

export const updateAccount = (account) => ({ type: UPDATE_ACCOUNT, account });

// thunks
export const setAccountsThunk = () => async (dispatch) => await onSnapshot(collection(db, "accounts"), (snapshot) => dispatch(setAccounts(snapshot.docs)));

export const setAccountThunk = (user) => async (dispatch) => {
  const resp = await getDoc(doc(db, "accounts", user.uid));

  if (resp.exists()) {
    dispatch(setAccount({ ...resp.data(), id: user.uid }));
  }
};

export const updateAccountThunk = (account) => async (dispatch) => {
  const docRef = await doc(db, "accounts", account.id);

  await setDoc(docRef, account);

  dispatch(updateAccount(account));
};

export default ProfileReducer;
