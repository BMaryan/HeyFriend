/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getUserSignInSelector, getUserSignUpSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { addChat } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { getProfileData, setProfilePosts, getParamsId, getAuthorizationId, following, setProfileChats, addAccount, unFollowing } from "../../redux/profile-reducer";

const ProfileContainer = (props) => {
  let id = Number(props.match.params.id);

  React.useEffect(() => {
    if (props.accounts && props.userSignUp && props.userSignUp.name && props.account) {
      let foundTheSameAccount = props.accounts.find((account) => account.id === props.account.id);
      if (!foundTheSameAccount) {
        props.addAccount(props.accounts.length + 1, props.account.profile);
      }
    }
  }, [props.userSignUp]);

  if (!id && props.account && props.account.id) {
    props.getParamsId(null);
    props.getAuthorizationId(props.account.id);
  } else {
    props.getParamsId(id);
    props.getAuthorizationId(null);
  }

  return <Profile {...props} id={id} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    chats: getChatsSelector(state),
    userSignIn: getUserSignInSelector(state),
    userSignUp: getUserSignUpSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfileData,
    setProfilePosts,
    addChat,
    getParamsId,
    getAuthorizationId,
    following,
    setProfileChats,
    addAccount,
    unFollowing,
  }),
  withRouter
)(ProfileContainer);
