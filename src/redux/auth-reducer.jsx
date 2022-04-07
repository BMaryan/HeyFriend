import { authFb } from "../functionsFb/functionsFb";

let SET_USER_SIGN_IN = "heyfriend/auth/SET_USER_SIGN_IN";
let SET_USER_SIGN_UP = "heyfriend/auth/SET_USER_SIGN_UP";
let GET_DEFAULT_ACCOUNT = "heyfriend/auth/GET_DEFAULT_ACCOUNT";
let LOGIN_SUCCESS = "heyfriend/auth/LOGIN_SUCCESS";
let LOGIN_ERROR = "heyfriend/auth/LOGIN_ERROR";

let initialState = {
  userSignIn: {
    phone_or_email: null,
    password: null,
    rememberMe: null,
  },
  userSignUp: {
    id: null,
    name: null,
    surname: null,
    phone_or_email: null,
    password: null,
  },
  authError: null,
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
    case LOGIN_SUCCESS: {
      return {
        ...state,
        authError: null,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        authError: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export const setUserSignIn = ({ phone_or_email, password, rememberMe = false }) => ({
  type: SET_USER_SIGN_IN,
  data: { phone_or_email, password, rememberMe },
});

export const setUserSignUp = (credentials) => ({
  type: SET_USER_SIGN_UP,
  credentials: { ...credentials },
});

export const getDefaultAccount = (account) => ({
  type: GET_DEFAULT_ACCOUNT,
  account,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error,
});

// thunks
export const signUp = (credentials) => async (dispatch) => {
  try {
    await authFb.signUp({ email: credentials.phone_or_email, password: credentials.password });

    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const signIn = (credentials) => async (dispatch) => {
  try {
    await authFb.signIn({ email: credentials.phone_or_email, password: credentials.password });

    dispatch(loginSuccess());

    alert("Welcome");
  } catch (error) {
    dispatch(loginError(error));

    alert("Fatal");
  }
};

export default AuthReducer;
