/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { getUserSignInSelector, getUserSignUpSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { getProfileData, setProfilePosts, getParamsId, getAuthorizationId, follow, setProfileChats } from "../../redux/profile-reducer";
import { addChat } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";
import { signUpConstant } from "../../core/constants/constants";

const ProfileContainer = props => {
	let id = Number(props.match.params.id);

	// React.useEffect(() => {
	// 	if (props.chats) {
	// 		props.setProfileChats(props.chats);
	// 	}
	// }, [props.chats]);

	if (!props.account) {
		return <Redirect to={`${signUpConstant}`} />;
	}

	if (!id && props.account && props.account.id) {
		props.getParamsId(null);
		props.getAuthorizationId(props.account.id);
	} else {
		props.getParamsId(id);
		props.getAuthorizationId(null);
	}

	return <Profile {...props} id={id} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
		chats: getChatsSelector(state),
		userSignIn: getUserSignInSelector(state),
		userSignUp: getUserSignUpSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, { getProfileData, setProfilePosts, addChat, getParamsId, getAuthorizationId, follow, setProfileChats }),
	withRouter
)(ProfileContainer);
