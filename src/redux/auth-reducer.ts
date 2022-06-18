import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { authFb } from "../functionsFb/functionsFb";

const SET_AUTH = "heyfriend/auth/SET_AUTH";
const AUTH_SUCCESS = "heyfriend/auth/AUTH_SUCCESS";
const AUTH_LOADING = "heyfriend/auth/AUTH_LOADING";
const AUTH_ERROR = "heyfriend/auth/AUTH_ERROR";

const initialState = {
  auth: null as object | null,
  authError: null as string | null,
  loading: false,
};

export type InitialStateType = typeof initialState;

const AuthReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH: {
      return { ...state, auth: action.credentials ? action.credentials : null };
    }
    case AUTH_SUCCESS: {
      return { ...state, authError: null };
    }
    case AUTH_LOADING: {
      return { ...state, loading: action.loading };
    }
    case AUTH_ERROR: {
      return { ...state, authError: action.error.message };
    }
    default: {
      return state;
    }
  }
};

type SetAuthActionType = { type: typeof SET_AUTH; credentials: object | null };

export const setAuth = (credentials: object | null): SetAuthActionType => ({ type: SET_AUTH, credentials });

type AuthSuccessActionType = { type: typeof AUTH_SUCCESS };

export const authSuccess = (): AuthSuccessActionType => ({ type: AUTH_SUCCESS });

type AuthLoadingActionType = { type: typeof AUTH_LOADING; loading: boolean };

export const authLoading = (loading: boolean): AuthLoadingActionType => ({ type: AUTH_LOADING, loading });

type AuthErrorActionType = { type: typeof AUTH_ERROR; error: string };

export const authError = (error: string): AuthErrorActionType => ({ type: AUTH_ERROR, error });

// thunks
export const signUp = (credentials: any) => async (dispatch: any) => {
  dispatch(authLoading(true));

  try {
    const user = await authFb.signUp({ email: credentials.email, password: credentials.password });

    await setDoc(doc(db, "accounts", user.user.uid), { name: credentials.name, surname: credentials.surname, email: user.user.email, id: user.user.uid });

    dispatch(authSuccess());
  } catch (error: any) {
    dispatch(authError(error));
  }

  dispatch(authLoading(false));
};

export const signIn = (credentials: any) => async (dispatch: any) => {
  dispatch(authLoading(true));

  try {
    await authFb.signIn({ email: credentials.email, password: credentials.password });

    dispatch(authSuccess());
  } catch (error: any) {
    dispatch(authError(error));
  }

  dispatch(authLoading(false));
};

export const signOut = () => async (dispatch: any) => {
  await authFb.signOut();

  dispatch(authSuccess());
};

export default AuthReducer;
