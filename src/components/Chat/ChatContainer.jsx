import React from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { addMessage, addMessageThunk } from "../../redux/chat-reducer";
import { getChatsSelector, getMessagesSelector } from "../../redux/chat-selectors";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { getAuthorizationId, getParamsId } from "../../redux/profile-reducer";

const ChatContainer = (props) => {
  // if (props.account) {
  // 	props.getAuthorizationId(props.account.id);
  // 	props.getParamsId(null);
  // }

  return <Chat {...props} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    chats: getChatsSelector(state),
    messages: getMessagesSelector(state),
  };
};

export default compose(connect(mapStateToProps, { addMessage, getAuthorizationId, getParamsId, addMessageThunk }), withRouter)(ChatContainer);
