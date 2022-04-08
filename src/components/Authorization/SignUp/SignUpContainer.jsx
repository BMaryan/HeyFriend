/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuth, setUserSignUp, signUp } from "../../../redux/auth-reducer";
import { getUserSignUpSelector, loginErrorSelector } from "../../../redux/auth-selectors";
import { addAccount, isAccount, setAccounts } from "../../../redux/profile-reducer";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignUp from "./SignUp";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import { account, accounts } from "../../../core/constants/constantsLocalStorage";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { profileConstant } from "../../../core/constants/constants";
import defaultAccounts from "../../../defaultAccounts/defaultAccounts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignUpContainer = (props) => {
  let history = useHistory();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  // console.log(createUserWithEmailAndPassword);
  console.log(user);
  console.log(loading);
  console.log(error);

  // React.useEffect(() => {
  // 	if (props.accounts && props.accounts.length > 0) {
  // 		localStorage.setItem(accounts, JSON.stringify(props.accounts));
  // 	} else {
  // 		props.setAccounts([...defaultAccounts]);
  // 	}
  // }, [props.accounts]);

  // React.useEffect(() => {
  // 	if (props.account) {
  // 		localStorage.setItem(account, JSON.stringify(props.account));
  // 	}
  // }, [props.account]);

  // if (props.account && props.account.id) {
  // 	return <Redirect to={`${profileConstant}`} />;
  // }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        history.push(`${profileConstant}`);
      }
    });
  }, []);

  return <SignUp {...props} loading={loading} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    userSignUp: getUserSignUpSelector(state),
    authError: loginErrorSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setUserSignUp,
    helpCheckAuthorization,
    addAccount,
    setAccounts,
    setSignUpDataToLocalStorage,
    isAccount,
    signUp,
    setAuth,
  }),
  withRouter
)(SignUpContainer);
