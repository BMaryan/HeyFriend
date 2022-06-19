import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AccountType } from "../types/types";

const SET_ACCOUNTS = "heyfriend/profilePage/SET_ACCOUNTS";
const SET_ACCOUNT = "heyfriend/profilePage/SET_ACCOUNT";
const UPDATE_ACCOUNT = "heyfriend/profilePage/UPDATE_ACCOUNT";

const initialState = { accounts: [] as Array<AccountType>, account: null as AccountType | null };

export type InitialStateType = typeof initialState;

const ProfileReducer = (state = initialState, action: any): InitialStateType => {
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
export const setAccountsThunk = () => async (dispatch: any) => await onSnapshot(collection(db, "accounts"), (snapshot: any) => dispatch(setAccounts(snapshot.docs)));

export const setAccountThunk = (account: any) => async (dispatch: any) => {
  const resp = await getDoc(doc(db, "accounts", account?.uid));

  if (resp.exists()) {
    dispatch(setAccount({ ...resp.data(), id: account?.uid } as AccountType));
  }
};

export const updateAccountThunk = (account: AccountType) => async (dispatch: any, getState: any) => {
  const docRef = await doc(db, "accounts", account.id);

  await setDoc(docRef, account);

  if (getState().profilePage.account.id === account.id) {
    dispatch(updateAccount(account));
  }
};

export default ProfileReducer;
