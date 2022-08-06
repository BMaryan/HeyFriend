/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AccountType, AuthType, ChatType, CommentType, FirebaseType, MessageType, ParamsOfMatchType, PostType } from "./types/types";
import { accountActions, setAccountsThunk, setAccountThunk, updateAccountThunk } from "./redux/account-reducer";
import navigation, { signInConstant, signUpConstant } from "./core/constants/constants";
import { getAccountSelector, getAccountsSelector } from "./redux/account-selectors";
import { getCommentsSelector, setPostsSelector } from "./redux/post-selectors";
import { getChatsSelector, getMessagesSelector } from "./redux/chat-selectors";
import { setCommentsThunk, setPostsThunk } from "./redux/post-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import { setAuthSelector } from "./redux/auth-selectors";
import { onAuthStateChanged, User } from "firebase/auth";
import { authActions } from "./redux/auth-reducer";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { StateType } from "./redux/store";
import { connect } from "react-redux";
import { auth } from "./firebase";
import App from "./App";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  auth: AuthType | null;
  posts: Array<FirebaseType<PostType>>;
  comments: Array<FirebaseType<CommentType>>;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
};

type MapDispatchToPropsType = {
  setAuth: (credentials: AuthType | null) => void;
  setAccount: (account: AccountType | null) => void;
  setAccountsThunk: () => void;
  setAccountThunk: (user: User) => void;
  setPostsThunk: () => void;
  setCommentsThunk: () => void;
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
    if (props.comments) {
      props.setCommentsThunk();
    }
  }, [props.comments.length]);

  // React.useEffect(() => {
  //   if (!props.auth || !props.account) {
  //     props.setAuth(null);
  //     props.setAccount(null);

  //     history.push(signInConstant.path);
  //   }
  // }, [props.auth, props.account]);

  // name of page in title
  React.useEffect(() => {
    let namePage = history.location.pathname;
    navigation.forEach((item) => (namePage === item.path ? (namePage = item.title) : "Hey Friend"));
    document.title = namePage[0].toUpperCase() + namePage.slice(1);
  }, [history.location]);

  // first visitthe site

  // React.useEffect(() => {
  //   if (props.account) {
  //     props.account && props.updateAccountThunk({ ...props?.account, isOnline: online });
  //   }
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("onload", function () {
  //     setIsOnlineToSessionStorage({ value: "online" });
  //     props.account && props.updateAccountThunk({ ...props?.account, isOnline: getOnlineInSessionStorage() });
  //   });

  //   return () => {
  //     window.addEventListener("beforeunload", function () {
  //       removeOnlineInSessionStorage();
  //       props.account && props.updateAccountThunk({ ...props?.account, isOnline: getOnlineInSessionStorage() });
  //     });
  //   };
  // }, [getOnlineInSessionStorage()]);

  // const setOnline = () => {
  //   // alert("We are online!");
  //   setOnlineStatus(true);
  //   props.account && props.updateAccountThunk({ ...props?.account, isOnline: onlineStatus });
  // };
  // const setOffline = () => {
  //   // alert("We are offline!");
  //   props.account && props.updateAccountThunk({ ...props?.account, isOnline: onlineStatus });
  //   setOnlineStatus(false);
  // };

  // console.log(navigator);

  // React.useEffect(() => {
  //   props.account && props.updateAccountThunk({ ...props?.account, isOnline: navigator.onLine });
  //   // window.addEventListener("offline", setOffline);
  //   // window.addEventListener("online", setOnline);

  //   // cleanup if we unmount
  //   // return () => {
  //   //   window.removeEventListener("offline", setOffline);
  //   //   window.removeEventListener("online", setOnline);
  //   // };

  //   return () => {
  //     window.addEventListener("beforeunload", function () {
  //       props.account && props.updateAccountThunk({ ...props?.account, isOnline: navigator.onLine });
  //     });
  //   };
  // }, [navigator.onLine]);

  // console.log(navigator);

  // React.useEffect(() => {
  //   navigator. .addEventListener("disconnect", (event: any) => {
  //     console.log(`HID disconnected: ${event.device.productName}`);
  //     console.dir(event);
  //   });
  // });

  // React.useEffect(() => {
  //   // props.account && props.updateAccountThunk({ ...props?.account, isOnline: isOnline });

  //   // window.addEventListener("onload", updateMethodTrue);
  //   // window.addEventListener("beforeunload", updateMethodFalse);
  //   console.log("yes");
  //   setIsOnline(true);

  //   return () => {
  //     console.log("false");
  //     // props.account && props.updateAccountThunk({ ...props?.account, isOnline: isOnline });

  //     setIsOnline(false);

  //     // window.removeEventListener("onload", updateMethodTrue);
  //     // window.removeEventListener("beforeunload", updateMethodFalse);
  //   };
  // });

  // React.useEffect(() => {
  //   test && props.updateAccountThunk({ ...test.data(), isOnline: true });

  //   return () => {
  //     test && props.updateAccountThunk({ ...test.data(), isOnline: false });
  //   };
  // }, [navigator.onLine]);

  // to show progress when account doesn't have
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

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), auth: setAuthSelector(state), chats: getChatsSelector(state), posts: setPostsSelector(state), messages: getMessagesSelector(state), comments: getCommentsSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { setAuth: authActions.setAuth, setAccount: accountActions.setAccount, setAccountsThunk, setAccountThunk, setPostsThunk, setCommentsThunk, updateAccountThunk })(AppContainer);
