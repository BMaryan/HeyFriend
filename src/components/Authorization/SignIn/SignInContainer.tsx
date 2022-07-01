import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../../redux/account-selectors";
import { authErrorSelector, authLoadingSelector } from "../../../redux/auth-selectors";
import { authSuccess, signIn } from "../../../redux/auth-reducer";
import { onAuthStateChanged } from "firebase/auth";
import { AccountType } from "../../../types/types";
import { StateType } from "../../../redux/store";
import { useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import { connect } from "react-redux";
import SignIn from "./SignIn";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<AccountType>;
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
};

type MapDispatchToPropsType = {
  signIn: any;
  authSuccess: any;
};

export type SignInContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const SignInContainer = (props: SignInContainerPropsType) => {
  const history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push(`/`);
      }
    });
  });

  return <SignIn {...props} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), authError: authErrorSelector(state), loading: authLoadingSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { signIn, authSuccess })(SignInContainer);
