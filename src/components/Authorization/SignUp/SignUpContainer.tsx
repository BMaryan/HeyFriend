/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { authErrorSelector, authLoadingSelector } from "../../../redux/auth-selectors";
import { getAccountSelector } from "../../../redux/account-selectors";
import { profileConstant } from "../../../core/constants/constants";
import { authActions, signUp } from "../../../redux/auth-reducer";
import { AccountType, SignType } from "../../../types/types";
import { onAuthStateChanged } from "firebase/auth";
import { StateType } from "../../../redux/store";
import { useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import { connect } from "react-redux";
import SignUp from "./SignUp";

type OwnPropsType = {};

type MapStateToPropsType = {
  account: AccountType | null;
  loading: boolean;
  authError: string | null;
};

type MapDispatchToPropsType = {
  authSuccess: () => void;
  signUp: (credentials: SignType) => void;
};

export type SignUpContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const SignUpContainer = (props: SignUpContainerPropsType) => {
  const history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push(`${profileConstant.path}/${user.uid}`);
      }
    });
  }, [props.account]);

  return <SignUp {...props} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ account: getAccountSelector(state), loading: authLoadingSelector(state), authError: authErrorSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { signUp, authSuccess: authActions.authSuccess })(SignUpContainer);
