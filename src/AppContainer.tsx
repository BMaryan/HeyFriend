/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AccountType, AuthType, ChatType, CommentType, FirebaseType, MessageType, ParamsOfMatchType, PostType, ReplyType } from "./types/types";
import { accountActions, setAccountsThunk, setAccountThunk, updateAccountThunk } from "./redux/account-reducer";
import { getCommentsSelector, setPostsSelector, setRepliesSelector } from "./redux/post-selectors";
import { mainConstant, signInConstant, signUpConstant } from "./core/constants/constants";
import { setCommentsThunk, setPostsThunk, setRepliesThunk } from "./redux/post-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/account-selectors";
import { getChatsSelector, getMessagesSelector } from "./redux/chat-selectors";
import { setAuthSelector } from "./redux/auth-selectors";
import { onAuthStateChanged, User } from "firebase/auth";
import { setChatsThunk } from "./redux/chat-reducer";
import { authActions } from "./redux/auth-reducer";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Logo from "./assets/images/Logo.png";
import { StateType } from "./redux/store";
import { connect } from "react-redux";
import { auth, fb } from "./firebase";
import App from "./App";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  auth: AuthType | null;
  posts: Array<FirebaseType<PostType>>;
  comments: Array<FirebaseType<CommentType>>;
  replies: Array<FirebaseType<ReplyType>>;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
};

type MapDispatchToPropsType = {
  setAuth: (credentials: AuthType | null) => void;
  setAccount: (account: AccountType | null) => void;
  setAccountsThunk: () => void;
  setAccountThunk: (user: User) => void;
  setChatsThunk: () => void;
  setPostsThunk: () => void;
  setCommentsThunk: () => void;
  setRepliesThunk: () => void;
  updateAccountThunk: (account: AccountType) => void;
};

export type AppContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const AppContainer = (props: AppContainerPropsType) => {
  const { id } = useParams<ParamsOfMatchType>();
  const history = useHistory();

  // set account to redux and redirect if you aren't auth
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.setAuth(auth);
        props.setAccountThunk(user);
      } else {
        props.setAuth(null);
        props.setAccount(null);

        if (history.location.pathname === signUpConstant.path) history.push(signUpConstant.path);
        else if (history.location.pathname !== signInConstant.path) history.push(signInConstant.path);
      }
    });
  }, [props.auth]);

  // set accounts data
  React.useEffect(() => {
    if (props.accounts) {
      props.setAccountsThunk();
    }
  }, [props?.accounts?.length]);

  // set posts data
  React.useEffect(() => {
    if (props.posts) {
      props.setPostsThunk();
    }
  }, [props?.posts?.length]);

  // set comments data
  React.useEffect(() => {
    if (props.comments) {
      props.setCommentsThunk();
    }
  }, [props.comments.length]);

  // set replies data
  React.useEffect(() => {
    if (props.replies) {
      props.setRepliesThunk();
    }
  }, [props.replies.length]);

  // set chats data
  React.useEffect(() => {
    if (props.chats) {
      props.setChatsThunk();
    }
  }, [props.chats.length]);

  // name of page in title
  React.useEffect(() => {
    const test = history.location.pathname.split("/");
    const nameOfPage = test[test.length - 1];

    // const test = navigation.find((item) => {
    //   if (history.location.pathname.includes(item.path)) {
    //     document.title = item.title;
    //   }
    // });

    if (history.location.pathname === mainConstant.path) {
      document.title = mainConstant.title;
    } else {
      document.title = nameOfPage[0]?.toUpperCase() + nameOfPage?.slice(1);
    }
  }, [history.location.pathname]);

  // func that updates data of account
  const updateDataOfAccount = (value: boolean) => {
    props.account &&
      props.updateAccountThunk({
        ...props.account,
        isOnline: value,
        metadata: {
          ...props.account.metadata,
          lastSignInTime: fb.Timestamp.now(),
        },
      });
  };

  // set status of online and set the last visit
  React.useEffect(() => {
    updateDataOfAccount(true);

    window.addEventListener("beforeunload", () => updateDataOfAccount(false));

    return () => {
      // if (props.account?.isOnline) {
      // updateDataOfAccount(false);
      // }
      window.removeEventListener("beforeunload", () => updateDataOfAccount(false));
    };
  }, [props.account?.isOnline]);

  // to show progress when account doesn't have
  if (history.location.pathname !== signInConstant.path && history.location.pathname !== signUpConstant.path) {
    if (!props.account) {
      return (
        <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={Logo} alt="" style={{ height: "50px", width: "50px", objectFit: "contain" }} />
        </div>
      );
    }
  }

  return <App {...props} id={id} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), auth: setAuthSelector(state), chats: getChatsSelector(state), posts: setPostsSelector(state), messages: getMessagesSelector(state), comments: getCommentsSelector(state), replies: setRepliesSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { setAuth: authActions.setAuth, setAccount: accountActions.setAccount, setAccountsThunk, setAccountThunk, setChatsThunk, setPostsThunk, setCommentsThunk, setRepliesThunk, updateAccountThunk })(AppContainer);
