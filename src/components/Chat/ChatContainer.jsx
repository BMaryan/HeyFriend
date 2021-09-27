import React from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { addMessage } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { Redirect } from "react-router-dom";
import { getAuthorizationId, getParamsId } from "../../redux/profile-reducer";

const ChatContainer = props => {
	if (!props.account) {
		return <Redirect to='/sign_up' />;
	} else {
		props.getAuthorizationId(props.account.id);
		props.getParamsId(null);
	}

	return <Chat {...props} />;
};

const mapStateToProps = state => {
	return {
		chats: getChatsSelector(state),
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default compose(connect(mapStateToProps, { addMessage, getAuthorizationId, getParamsId }), withRouter)(ChatContainer);
