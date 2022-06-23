import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { AccountType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { StateType } from "./store";
import { db } from "../firebase";

const SET_ACCOUNTS = "heyfriend/accountPage/SET_ACCOUNTS";
const SET_ACCOUNT = "heyfriend/accountPage/SET_ACCOUNT";
const UPDATE_ACCOUNT = "heyfriend/accountPage/UPDATE_ACCOUNT";

const initialState = { accounts: [] as Array<AccountType>, account: null as AccountType | null };

export type InitialStateType = typeof initialState;
type ActionsType = SetAccountsActionType | SetAccountActionType | UpdateAccountActionType;

const AccountReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_ACCOUNTS: {
      return { ...state, accounts: [...action.accounts] };
    }
    case SET_ACCOUNT: {
      return { ...state, account: action.account };
    }
    case UPDATE_ACCOUNT: {
      return { ...state, account: action.account };
    }
    default: {
      return state;
    }
  }
};

type SetAccountsActionType = { type: typeof SET_ACCOUNTS; accounts: Array<AccountType> };

export const setAccounts = (accounts: Array<AccountType>): SetAccountsActionType => ({ type: SET_ACCOUNTS, accounts });

type SetAccountActionType = { type: typeof SET_ACCOUNT; account: AccountType };

export const setAccount = (account: AccountType): SetAccountActionType => ({ type: SET_ACCOUNT, account });

type UpdateAccountActionType = { type: typeof UPDATE_ACCOUNT; account: AccountType };

export const updateAccount = (account: AccountType): UpdateAccountActionType => ({ type: UPDATE_ACCOUNT, account });

// thunks
export const setAccountsThunk = (): ThunkAction<Promise<object>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "accounts"), (snapshot) => dispatch(setAccounts(snapshot.docs)));

export const setAccountThunk =
  (user: { uid: string }): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const resp = await getDoc(doc(db, "accounts", user.uid));

    if (resp.exists()) {
      dispatch(setAccount({ ...resp.data(), id: user.uid } as AccountType));
    }
  };

export const updateAccountThunk =
  (account: AccountType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch, getState) => {
    const docRef = await doc(db, "accounts", account.id);

    await setDoc(docRef, account);

    if (getState()?.accountPage?.account?.id === account.id) {
      dispatch(updateAccount(account));
    }
  };

export default AccountReducer;
