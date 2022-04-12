import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { authFb } from "../functionsFb/functionsFb";

let SET_USER_SIGN_IN = "heyfriend/auth/SET_USER_SIGN_IN";
let SET_USER_SIGN_UP = "heyfriend/auth/SET_USER_SIGN_UP";
let GET_DEFAULT_ACCOUNT = "heyfriend/auth/GET_DEFAULT_ACCOUNT";
//
let SET_AUTH = "heyfriend/auth/SET_AUTH";
let AUTH_SUCCESS = "heyfriend/auth/AUTH_SUCCESS";
let AUTH_LOADING = "heyfriend/auth/AUTH_LOADING";
let AUTH_ERROR = "heyfriend/auth/AUTH_ERROR";

let initialState = {
  userSignIn: {
    email: null,
    password: null,
    rememberMe: null,
  },
  userSignUp: {
    id: null,
    name: null,
    surname: null,
    email: null,
    password: null,
  },
  auth: null,
  authError: null,
  loading: false,
  defaultAccount: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SIGN_IN: {
      return {
        ...state,
        userSignIn: { ...action.data },
      };
    }
    case SET_USER_SIGN_UP: {
      return {
        ...state,
        userSignUp: { ...action.credentials },
      };
    }
    case GET_DEFAULT_ACCOUNT: {
      return {
        ...state,
        defaultAccount: action.account ? action.account : null,
      };
    }
    // --------------------------------
    case SET_AUTH: {
      return {
        ...state,
        auth: action.credentials ? action.credentials : null,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authError: null,
      };
    }
    case AUTH_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        authError: action.error.message,
      };
    }
    default: {
      return state;
    }
  }
};

export const setUserSignIn = ({ email, password, rememberMe = false }) => ({
  type: SET_USER_SIGN_IN,
  data: { email, password, rememberMe },
});

export const setUserSignUp = (credentials) => ({
  type: SET_USER_SIGN_UP,
  credentials: { ...credentials },
});

export const getDefaultAccount = (account) => ({
  type: GET_DEFAULT_ACCOUNT,
  account,
});

// --------------------

export const setAuth = (credentials) => ({
  type: SET_AUTH,
  credentials,
});

export const authSuccess = () => ({
  type: AUTH_SUCCESS,
});

export const authLoading = (loading) => ({
  type: AUTH_LOADING,
  loading,
});

export const authError = (error) => ({
  type: AUTH_ERROR,
  error,
});

// thunks
export const signUp = (credentials) => async (dispatch) => {
  dispatch(authLoading(true));

  try {
    const user = await authFb.signUp({ email: credentials.email, password: credentials.password });

    await setDoc(doc(db, "accounts", user.user.uid), { name: credentials.name, surname: credentials.surname, email: user.user.email });

    dispatch(authSuccess());
  } catch (error) {
    dispatch(authError(error));
  }

  dispatch(authLoading(false));
};

export const signIn = (credentials) => async (dispatch) => {
  dispatch(authLoading(true));

  try {
    await authFb.signIn({ email: credentials.email, password: credentials.password });

    dispatch(authSuccess());
  } catch (error) {
    dispatch(authError(error));
  }

  dispatch(authLoading(false));
};

export const signOut = () => async (dispatch) => {
  await authFb.signOut();

  dispatch(authSuccess());
};

export default AuthReducer;
