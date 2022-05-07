import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { getUserSignInSelector, getUserSignUpSelector, setAuthSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addAccount, setAccounts, isAccount, setAccount, setAccountsThunk, setAccountThunk, createPost, createPostThunk } from "./redux/profile-reducer";
import { getAccountSelector, getAccountsSelector, setPostsSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";
// import { accounts, account } from "./core/constants/constantsLocalStorage";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { signInConstant, signUpConstant } from "./core/constants/constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { setAuth } from "./redux/auth-reducer";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import defaultAvatar from "./assets/images/DefaultAvatar.png";

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

        if (history.location.pathname !== signInConstant) history.push(signInConstant);
        else if (history.location.pathname === signUpConstant) history.push(signUpConstant);
      }
    });
  }, [props.auth]);

  // React.useEffect(() => {
  //   if (props.posts.length > 0) props.createPostThunk(props.posts);
  // }, [props.posts]);

  // name of page in title
  React.useEffect(() => {
    let getArrayOfName = props.location.pathname.split("/");
    let namePage = getArrayOfName[1];

    if (namePage === "") {
      namePage = "Main";
    } else if (namePage === "account") {
      namePage = "Edit Account";
    }

    document.title = namePage[0].toUpperCase() + namePage.slice(1);
  }, [props.location]);

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
