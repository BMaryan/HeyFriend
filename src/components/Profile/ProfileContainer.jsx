/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { getUserSignInSelector, getUserSignUpSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { getProfileData, setProfilePosts, getParamsId, getAuthorizationId, follow } from "../../redux/profile-reducer";
import { addChat } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";

const ProfileContainer = props => {
	let id = Number(props.match.params.id);

	// React.useEffect(() => {
	// 	if (id) {
	// 		props.accounts.find(profile => {
	// 			if (profile.id === id && props.account.id !== id) {
	// 				props.getProfileData(profile.profile);
	// 			}
	// 		});
	// 	} else {
	// 		if (props.account && props.account.profile) {
	// 			props.getProfileData({ ...props.SignUp });
	// 		}
	// 	}
	// }, [props.SignUp]);

	if (!props.account) {
		return <Redirect to='/authorization' />;
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
	connect(mapStateToProps, { getProfileData, setProfilePosts, addChat, getParamsId, getAuthorizationId, follow }),
	withRouter
)(ProfileContainer);
