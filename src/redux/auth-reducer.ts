import { AccountType, AuthType, SignType } from "../types/types";
import { InferActionsType, StateType } from "./store";
import { authAPI } from "../api/auth-api";
import { ThunkAction } from "redux-thunk";

const SET_AUTH = "heyfriend/authPage/SET_AUTH";
const AUTH_SUCCESS = "heyfriend/authPage/AUTH_SUCCESS";
const AUTH_LOADING = "heyfriend/authPage/AUTH_LOADING";
const AUTH_ERROR = "heyfriend/authPage/AUTH_ERROR";

const initialState = { auth: null as AuthType | null, authError: null as any | null, loading: false };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof authActions>;

const AuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_AUTH: {
      return { ...state, auth: action.auth ? action.auth : null };
    }
    case AUTH_SUCCESS: {
      return { ...state, authError: null };
    }
    case AUTH_LOADING: {
      return { ...state, loading: action.loading };
    }
    case AUTH_ERROR: {
      return { ...state, authError: action.error?.message };
    }
    default: {
      return state;
    }
  }
};

// actions
export const authActions = {
  setAuth: (auth: AuthType | null) => ({ type: SET_AUTH, auth } as const),
  authSuccess: () => ({ type: AUTH_SUCCESS } as const),
  authLoading: (loading: boolean) => ({ type: AUTH_LOADING, loading } as const),
  authError: (error: any) => ({ type: AUTH_ERROR, error } as const),
};

// thunks as const
export const signUp =
  (credentials: SignType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(authActions.authLoading(true));

    try {
      await authAPI.signUp({ name: credentials.name, surname: credentials.surname, email: credentials.email, password: credentials.password });

      dispatch(authActions.authSuccess());
    } catch (error: any) {
      dispatch(authActions.authError(error));
    }

    dispatch(authActions.authLoading(false));
  };

export const signIn =
  (credentials: SignType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(authActions.authLoading(true));

    try {
      await authAPI.signIn({ email: credentials.email, password: credentials.password });

      dispatch(authActions.authSuccess());
    } catch (error: any) {
      dispatch(authActions.authError(error));
    }

    dispatch(authActions.authLoading(false));
  };

export const signOut =
  (account: AccountType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    await authAPI.signOut(account);

    dispatch(authActions.authSuccess());
  };

export default AuthReducer;
