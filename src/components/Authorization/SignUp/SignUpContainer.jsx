import React from "react";
import { connect } from "react-redux";
import { authSuccess, setAuth, signUp } from "../../../redux/auth-reducer";
import { authErrorSelector, authLoadingSelector } from "../../../redux/auth-selectors";
import { addAccount, isAccount } from "../../../redux/profile-reducer";
import SignUp from "./SignUp";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { profileConstant } from "../../../core/constants/constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";

const SignUpContainer = (props) => {
  let history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push(`${profileConstant.path}/${user.uid}`);
      }
    });
  }, [props.account]);

  return <SignUp {...props} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    loading: authLoadingSelector(state),
    authError: authErrorSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    addAccount,
    isAccount,
    signUp,
    setAuth,
    authSuccess,
  }),
  withRouter
)(SignUpContainer);
