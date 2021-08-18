import React from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";

const ChatContainer = props => {
	return <Chat {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, null)(ChatContainer);
