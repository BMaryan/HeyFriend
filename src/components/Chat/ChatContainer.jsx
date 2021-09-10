import React from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { addMessage } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { getProfileSelector } from "../../redux/profile-selectors";
import { Redirect } from "react-router-dom";

const ChatContainer = props => {
	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}

	return <Chat {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		chats: getChatsSelector(state),
		profile: getProfileSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(connect(mapStateToProps, { addMessage }), withRouter)(ChatContainer);
