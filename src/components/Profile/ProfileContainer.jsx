/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getUserSignInSelector, getUserSignUpSelector, setAuthSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { createChatThunk } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { getProfileData, setProfilePosts, getParamsId, getAuthorizationId, following, setProfileChats, addAccount, unFollowing, updateAccountThunk } from "../../redux/profile-reducer";
import { useHistory } from "react-router-dom";
import { createPostThunk } from "../../redux/post-reducer";
import { setPostsSelector } from "../../redux/post-selectors";
import { CircularProgress } from "@mui/material";

const ProfileContainer = (props) => {
  let id = props.match.params.id;
  const history = useHistory();

  React.useEffect(() => {
    if (id) props.accounts.find((item) => (item?.data()?.id && id ? item?.data()?.id === id : history.push("/not-found")));
    // if (id) props.accounts.find((item) => item?.data()?.id === id || history.push("/not-found"));
  }, [id]);

  // if (!props.account) {
  //   return (
  //     <div className="wrapper_loading">
  //       <CircularProgress className="loading" />
  //     </div>
  //   );
  // }

  return <Profile {...props} id={id} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    auth: setAuthSelector(state),
    posts: setPostsSelector(state),
    //
    chats: getChatsSelector(state),
    userSignIn: getUserSignInSelector(state),
    userSignUp: getUserSignUpSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getProfileData,
    setProfilePosts,
    getParamsId,
    getAuthorizationId,
    following,
    setProfileChats,
    addAccount,
    unFollowing,
    createPostThunk,
    updateAccountThunk,
    createChatThunk,
  }),
  withRouter
)(ProfileContainer);
