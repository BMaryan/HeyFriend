import React from "react";
import App from "./App";
import navigation, { signInConstant, signUpConstant } from "./core/constants/constants";
import { setAccount, setAccountsThunk, setAccountThunk } from "./redux/account-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/account-selectors";
import { getChatsSelector, getMessagesSelector } from "./redux/chat-selectors";
import { getCommentsSelector, setPostsSelector } from "./redux/post-selectors";
import { setCommentsThunk, setPostsThunk } from "./redux/post-reducer";
import { setChatsThunk, setMessagesThunk } from "./redux/chat-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, withRouter } from "react-router-dom";
import { setAuthSelector } from "./redux/auth-selectors";
import { onAuthStateChanged } from "firebase/auth";
import { setAuth } from "./redux/auth-reducer";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "./firebase";
import { compose } from "redux";

const AppContainer = (props) => {
  const history = useHistory();
  const { id } = useParams();

  // set account to redux and redirect if you aren't auth
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.setAuth(user);
        props.setAccountThunk(user);
      } else {
        props.setAuth(null);
        props.setAccount(null);

        if (history.location.pathname === signUpConstant.path) history.push(signUpConstant.path);
        else if (history.location.pathname !== signInConstant.path) history.push(signInConstant.path);
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

  React.useEffect(() => props.accounts && props.setAccountsThunk()[props?.accounts?.length]);

  React.useEffect(() => props.posts && props.setPostsThunk()[props?.posts?.length]);

  React.useEffect(() => props.chats && props.setChatsThunk()[props.chats.length]);

  React.useEffect(() => props.messages && props.setMessagesThunk()[props.messages.length]);

  React.useEffect(() => props.comments && props.setCommentsThunk()[props.comments.length]);

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

  return <App {...props} id={id.id} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    auth: setAuthSelector(state),
    posts: setPostsSelector(state),
    comments: getCommentsSelector(state),
    chats: getChatsSelector(state),
    messages: getMessagesSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setAuth,
    setAccount,
    setAccountsThunk,
    setAccountThunk,
    setPostsThunk,
    setChatsThunk,
    setMessagesThunk,
    setCommentsThunk,
  }),
  withRouter
)(AppContainer);
