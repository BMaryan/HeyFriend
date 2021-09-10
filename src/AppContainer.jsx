/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import App from "./App";
import { checkAuthorization, setUsers } from "./redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUserSignUpSelector, getUsersSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats } from "./redux/profile-reducer";
import { getProfileSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";

const AppContainer = props => {
	React.useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		props.setUsers(users);
	}, [setSignUpDataToLocalStorage(props)]);

	React.useEffect(() => {
		let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));
		props.checkAuthorization(profileUser);
		props.getProfileData(profileUser);
	}, [props.userSignIn]);

	React.useEffect(() => {
		if (!props.profileAuthorizationData) {
			props.checkAuthorization(null);
			props.getProfileData({});
			localStorage.removeItem("profileAuthorizationData");
			localStorage.removeItem("profile");
		}

		let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));
		props.getProfileData(profileUser);
	}, [props.profileAuthorizationData]);

	React.useEffect(() => {
		props.getProfileData(JSON.parse(localStorage.getItem("profile")));
	}, [props.profileAuthorizationData]);

	React.useEffect(() => {
		props.setProfileChats(props.chats);
	}, [props.chats]);

	setSignUpDataToLocalStorage(props);
	helpCheckAuthorization(props);

	if (!props.profileAuthorizationData) {
		<Redirect to='/sign_up' />;
	}

	return <App {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		chats: getChatsSelector(state),
		profile: getProfileSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
		userSignIn: getUserSignInSelector(state),
		userSignUp: getUserSignUpSelector(state),
	};
};

export default connect(mapStateToProps, {
	setUsers,
	checkAuthorization,
	setSignUpDataToLocalStorage,
	helpCheckAuthorization,
	getProfileData,
	deleteAuthorizationUser,
	setProfileChats,
})(AppContainer);
