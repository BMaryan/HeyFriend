import React from "react";
import { connect } from "react-redux";
import { authSuccess, signIn } from "../../../redux/auth-reducer";
import { authErrorSelector, authLoadingSelector, getUserSignInSelector } from "../../../redux/auth-selectors";
import { helpCheckAuthorization } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import { isAccount } from "../../../redux/profile-reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";

const SignInContainer = (props) => {
  let history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("main");

        history.push(`/`);
      }
    });
  });

  return <SignIn {...props} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    userSignIn: getUserSignInSelector(state),
    authError: authErrorSelector(state),
    loading: authLoadingSelector(state),
  };
};

export default connect(mapStateToProps, {
  helpCheckAuthorization,
  isAccount,
  signIn,
  authSuccess,
})(SignInContainer);
