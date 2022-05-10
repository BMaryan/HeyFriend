import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { getUserSignInSelector, getUserSignUpSelector, setAuthSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addAccount, setAccounts, isAccount, setAccount, setAccountsThunk, setAccountThunk, createPostThunk } from "./redux/profile-reducer";
import { getAccountSelector, getAccountsSelector, setPostsSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import navigation, { signInConstant, signUpConstant, editConstant, mainConstant } from "./core/constants/constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setAuth } from "./redux/auth-reducer";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const AppContainer = (props) => {
  const id = Number(props.match.params.id);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  // set account to redux and redirect if you aren't auth
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.setAuth(user);

        props.setAccountsThunk();
        props.setAccountThunk(user);
      } else {
        props.setAuth(null);
        props.setAccount(null);
        props.setAccounts([]);

        if (!props.auth && history.location.pathname === signUpConstant.path) {
          history.push(signUpConstant.path);
        } else if (!props.auth && history.location.pathname !== signInConstant.path) {
          history.push(signInConstant.path);
        }
      }
    });
  }, [props.auth]);

  // name of page in title
  React.useEffect(() => {
    let namePage = props.location.pathname;

    navigation.forEach((item) => (namePage === item.path ? (namePage = item.title) : "Hey Friend"));

    document.title = namePage[0].toUpperCase() + namePage.slice(1);
  }, [props.location]);

  if (loading) {
    return (
      <div className="wrapper_loading">
        <CircularProgress />
      </div>
    );
  }

  return <App {...props} id={id} />;
};

const mapStateToProps = (state) => {
  return {
    chats: getChatsSelector(state),
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    userSignIn: getUserSignInSelector(state),
    userSignUp: getUserSignUpSelector(state),
    auth: setAuthSelector(state),
    posts: setPostsSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    isAccount,
    setSignUpDataToLocalStorage,
    helpCheckAuthorization,
    getProfileData,
    deleteAuthorizationUser,
    setProfileChats,
    addAccount,
    setAccounts,
    setAuth,
    setAccount,
    setAccountsThunk,
    setAccountThunk,
    createPostThunk,
  }),
  withRouter
)(AppContainer);
