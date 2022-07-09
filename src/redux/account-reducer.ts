import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { AccountType, FirebaseType } from "../types/types";
import { InferActionsType, StateType } from "./store";
import { accountAPI } from "../api/account-api";
import { ThunkAction } from "redux-thunk";
import { db } from "../firebase";

const SET_ACCOUNTS = "heyfriend/accountPage/SET_ACCOUNTS";
const SET_ACCOUNT = "heyfriend/accountPage/SET_ACCOUNT";
const UPDATE_ACCOUNT = "heyfriend/accountPage/UPDATE_ACCOUNT";

const initialState = { accounts: [] as Array<FirebaseType<AccountType>>, account: null as AccountType | null };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof accountActions>;

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

// actions
export const accountActions = {
  setAccounts: (accounts: Array<FirebaseType<AccountType>>) => ({ type: SET_ACCOUNTS, accounts } as const),
  setAccount: (account: AccountType | null) => ({ type: SET_ACCOUNT, account } as const),
  updateAccount: (account: AccountType) => ({ type: UPDATE_ACCOUNT, account } as const),
};

// thunks
export const setAccountsThunk = (): ThunkAction<Promise<DocumentData<AccountType>>, StateType, unknown, ActionsType> => async (dispatch) => await onSnapshot(collection(db, "accounts"), (snapshot) => dispatch(accountActions.setAccounts(snapshot.docs)));

export const setAccountThunk =
  (user: { uid: string }): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const resp = await accountAPI.setAccount(user);

    if (resp.exists()) {
      dispatch(accountActions.setAccount({ ...resp.data(), id: user.uid } as AccountType));
    }
  };

export const updateAccountThunk =
  (account: AccountType): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch, getState) => {
    await accountAPI.updateAccount(account);

    if (getState()?.accountPage?.account?.id === account.id) {
      dispatch(accountActions.updateAccount(account));
    }
  };

export default AccountReducer;
