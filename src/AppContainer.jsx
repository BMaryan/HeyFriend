/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { getUserSignInSelector, getUserSignUpSelector, setAuthSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addAccount, setAccounts, isAccount } from "./redux/profile-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";
import { accounts, account } from "./core/constants/constantsLocalStorage";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { signInConstant } from "./core/constants/constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setAuth } from "./redux/auth-reducer";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";

const AppContainer = (props) => {
  let id = Number(props.match.params.id);
  const [user, loading, error] = useAuthState(auth);

  //   React.useEffect(() => {
  //     let accountsP = JSON.parse(localStorage.getItem(accounts));
  //     let accountP = JSON.parse(localStorage.getItem(account));
  //     props.setAccounts(accountsP);

  //     if (accountP) {
  //       props.isAccount(accountP);
  //     }
  //   }, [props.userSignUp]);

  //   React.useEffect(() => {
  //     localStorage.setItem(accounts, JSON.stringify(props.accounts));
  //   }, [props.accounts]);

  //   React.useEffect(() => {
  //     if (props.account) {
  //       localStorage.setItem(account, JSON.stringify(props.account));
  //     } else {
  //       localStorage.removeItem(account);
  //       if (!props.account) {
  //         props.history.replace(signInConstant);
  //       }
  //     }
  //   }, [props.account]);

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

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.setAuth(user);
      } else {
        props.setAuth(null);
      }
    });
  }, [props.auth]);

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
  }),
  withRouter
)(AppContainer);
