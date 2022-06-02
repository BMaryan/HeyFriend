import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { getUserSignInSelector, getUserSignUpSelector, setAuthSelector } from "./redux/auth-selectors";
import { getChatsSelector, getMessagesSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addAccount, setAccounts, isAccount, setAccount, setAccountsThunk, setAccountThunk } from "./redux/profile-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import navigation, { signInConstant, signUpConstant } from "./core/constants/constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setAuth } from "./redux/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { createPostThunk, setPostsThunk } from "./redux/post-reducer";
import { setPostsSelector } from "./redux/post-selectors";
import { setChatsThunk, setMessagesThunk } from "./redux/chat-reducer";

const AppContainer = (props) => {
  const id = props.match.params.id;
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

        if (history.location.pathname === signUpConstant.path) {
          history.push(signUpConstant.path);
        } else if (history.location.pathname !== signInConstant.path) {
          history.push(signInConstant.path);
        }
      }
    });
  }, [props.auth]);

  // React.useEffect(() => {
  //   if ((!props.auth || !props.account || (!props.auth && !props.account)) && history.location.pathname === signUpConstant.path) {
  //     history.push(signUpConstant.path);
  //   } else if ((!props.auth || !props.account || (!props.auth && !props.account)) && history.location.pathname !== signInConstant.path) {
  //     history.push(signInConstant.path);
  //   }
  // }, [props.auth, props.account]);

  React.useEffect(() => {
    if (props.posts) {
      props.setPostsThunk();
    }
  }, [props.posts.length]);

  React.useEffect(() => {
    if (props.chats) {
      props.setChatsThunk();
    }
  }, [props.chats.length]);

  React.useEffect(() => {
    if (props.messages) {
      props.setMessagesThunk();
    }
  }, [props.messages.length]);

  // React.useEffect(() => {
  //   if (!props.auth || !props.account) {
  //     props.setAuth(null);
  //     props.setAccount(null);

  //     history.push(signInConstant.path);

  //     return;
  //   }
  // }, [props.auth, props.account]);

  // name of page in title
  React.useEffect(() => {
    let namePage = props.location.pathname;
    navigation.forEach((item) => (namePage === item.path ? (namePage = item.title) : "Hey Friend"));
    document.title = namePage[0].toUpperCase() + namePage.slice(1);
  }, [props.location]);

  if (history.location.pathname !== signInConstant.path && history.location.pathname !== signUpConstant.path) {
    if (!props.account) {
      return (
        <div className="wrapper_loading">
          <CircularProgress className="loading" />
        </div>
      );
    }
  }

  return <App {...props} id={id} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    chats: getChatsSelector(state),
    messages: getMessagesSelector(state),
    //
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
    setPostsThunk,
    createPostThunk,
    setChatsThunk,
    setMessagesThunk,
  }),
  withRouter
)(AppContainer);
