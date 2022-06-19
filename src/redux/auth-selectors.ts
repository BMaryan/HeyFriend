import { StateType } from "./store";

export const setAuthSelector = (state: StateType) => state.auth.auth;

export const authLoadingSelector = (state: StateType) => state.auth.loading;

export const authErrorSelector = (state: StateType) => state.auth.authError;
