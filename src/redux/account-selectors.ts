import { StateType } from "./store";

export const getAccountsSelector = (state: StateType) => state.accountPage.accounts;

export const getAccountSelector = (state: StateType) => state.accountPage.account;
