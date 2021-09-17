import React from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { addMessage } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { getProfileSelector, getProfilesSelector } from "../../redux/profile-selectors";
import { Redirect } from "react-router-dom";
import { getAuthorizationId, getParamsId } from "../../redux/profile-reducer";

const ChatContainer = props => {
	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	} else {
		props.getAuthorizationId(props.profileAuthorizationData.id);
		props.getParamsId(null);
	}

	return <Chat {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		chats: getChatsSelector(state),
		profiles: getProfilesSelector(state),
		profile: getProfileSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(connect(mapStateToProps, { addMessage, getAuthorizationId, getParamsId }), withRouter)(ChatContainer);
