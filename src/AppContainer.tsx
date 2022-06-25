import React from "react";
import { AccountType, ChatType, CommentType, MessageType, PostType } from "./types/types";
import navigation, { signInConstant, signUpConstant } from "./core/constants/constants";
import { setAccount, setAccountsThunk, setAccountThunk } from "./redux/account-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/account-selectors";
import { getChatsSelector, getMessagesSelector } from "./redux/chat-selectors";
import { getCommentsSelector, setPostsSelector } from "./redux/post-selectors";
import { setCommentsThunk, setPostsThunk } from "./redux/post-reducer";
import { setChatsThunk, setMessagesThunk } from "./redux/chat-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import { setAuthSelector } from "./redux/auth-selectors";
import { onAuthStateChanged } from "firebase/auth";
import { setAuth } from "./redux/auth-reducer";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { StateType } from "./redux/store";
import { connect } from "react-redux";
import { auth } from "./firebase";
import App from "./App";

type OwnPropsType = {
  id: string;
};

type MapStateToPropsType = {
  accounts: Array<AccountType>;
  account: AccountType | null;
  auth: object | null;
  posts: Array<PostType>;
  comments: Array<CommentType>;
  chats: Array<ChatType>;
  messages: Array<MessageType>;
};

// fix
type MapDispatchToPropsType = {
  setAuth: any;
  setAccount: any;
  setAccountsThunk: any;
  setAccountThunk: any;
  setPostsThunk: any;
  setChatsThunk: any;
  setMessagesThunk: any;
  setCommentsThunk: any;
};

export type AppContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const AppContainer = (props: AppContainerPropsType) => {
  const { id } = useParams<OwnPropsType>();
  const history = useHistory();

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

  React.useEffect(() => {
    if (props.accounts) {
      props.setAccountsThunk();
    }
  }, [props?.accounts?.length]);

  React.useEffect(() => {
    if (props.posts) {
      props.setPostsThunk();
    }
  }, [props?.posts?.length]);

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

  React.useEffect(() => {
    if (props.comments) {
      props.setCommentsThunk();
    }
  }, [props.comments.length]);

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
    let namePage = history.location.pathname;
    navigation.forEach((item) => (namePage === item.path ? (namePage = item.title) : "Hey Friend"));
    document.title = namePage[0].toUpperCase() + namePage.slice(1);
  }, [history.location]);

  if (history.location.pathname !== signInConstant.path && history.location.pathname !== signUpConstant.path) {
    if (!props.account) {
      return (
        <div className="wrapper_loading">
          <CircularProgress className="loading" />
        </div>
      );
    }
  }

  return <App {...props} id={id} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), auth: setAuthSelector(state), posts: setPostsSelector(state), comments: getCommentsSelector(state), chats: getChatsSelector(state), messages: getMessagesSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { setAuth, setAccount, setAccountsThunk, setAccountThunk, setPostsThunk, setChatsThunk, setMessagesThunk, setCommentsThunk })(AppContainer);
