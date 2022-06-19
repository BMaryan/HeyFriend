import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { setAuthSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { createChatThunk } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { updateAccountThunk } from "../../redux/account-reducer";
import { useHistory } from "react-router-dom";
import { createPostThunk } from "../../redux/post-reducer";
import { setPostsSelector } from "../../redux/post-selectors";

const ProfileContainer = (props) => {
  let id = props.match.params.id;
  const history = useHistory();

  React.useEffect(() => {
    if (id) {
      let isCorrentId = props.accounts.find((account) => account?.id === id || undefined);

      if (!isCorrentId) history.push("/not-found");
    }
  }, [id]);

  return <Profile {...props} id={id} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    auth: setAuthSelector(state),
    posts: setPostsSelector(state),
    chats: getChatsSelector(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    createPostThunk,
    updateAccountThunk,
    createChatThunk,
  }),
  withRouter
)(ProfileContainer);
