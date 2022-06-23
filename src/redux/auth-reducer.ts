import { authFb } from "../functionsFb/functionsFb";
import { doc, setDoc } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { StateType } from "./store";
import { db } from "../firebase";

const SET_AUTH = "heyfriend/auth/SET_AUTH";
const AUTH_SUCCESS = "heyfriend/auth/AUTH_SUCCESS";
const AUTH_LOADING = "heyfriend/auth/AUTH_LOADING";
const AUTH_ERROR = "heyfriend/auth/AUTH_ERROR";

// * fix: auth - object
const initialState = { auth: null as object | null, authError: null as string | null, loading: false };

export type InitialStateType = typeof initialState;
type ActionsType = SetAuthActionType | AuthSuccessActionType | AuthLoadingActionType | AuthErrorActionType;

const AuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

// fix: credentials, add type error and credentials
type SetAuthActionType = { type: typeof SET_AUTH; credentials: object | null };

export const setAuth = (credentials: object | null): SetAuthActionType => ({ type: SET_AUTH, credentials });

type AuthSuccessActionType = { type: typeof AUTH_SUCCESS };

export const authSuccess = (): AuthSuccessActionType => ({ type: AUTH_SUCCESS });

type AuthLoadingActionType = { type: typeof AUTH_LOADING; loading: boolean };

export const authLoading = (loading: boolean): AuthLoadingActionType => ({ type: AUTH_LOADING, loading });

type AuthErrorActionType = { type: typeof AUTH_ERROR; error: { message: string } };

export const authError = (error: { message: string }): AuthErrorActionType => ({ type: AUTH_ERROR, error });

// thunks
export const signUp =
  (credentials: any): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
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

// fix: error - any
export const signIn =
  (credentials: any): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(authLoading(true));

    try {
      await authFb.signIn({ email: credentials.email, password: credentials.password });

      dispatch(authSuccess());
    } catch (error: any) {
      dispatch(authError(error));
    }

    dispatch(authLoading(false));
  };

export const signOut = (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> => async (dispatch) => {
  await authFb.signOut();

  dispatch(authSuccess());
};

export default AuthReducer;
