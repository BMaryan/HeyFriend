import { StateType } from "./store";

export const getAccountsSelector = (state: StateType) => state.profilePage.accounts;

export const getAccountSelector = (state: StateType) => state.profilePage.account;
