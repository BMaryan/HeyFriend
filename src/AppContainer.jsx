/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import App from "./App";
import { checkAuthorization, setUsers } from "./redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUserSignUpSelector, getUsersSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addProfile, setProfiles } from "./redux/profile-reducer";
import { getProfileSelector, getProfilesSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";

const AppContainer = props => {
	React.useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		let profiles = JSON.parse(localStorage.getItem("profiles"));
		props.setUsers(users);
		props.setProfiles(profiles);
	}, [props.userSignUp]);

	React.useEffect(() => {
		let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));

		if (profileUser) {
			props.checkAuthorization(profileUser);
		}
	}, [props.userSignIn]);

	React.useEffect(() => {
		localStorage.setItem("profiles", JSON.stringify(props.profiles));
	}, [props.profiles]);

	React.useEffect(() => {
		props.setProfileChats(props.chats);
	}, [props.chats]);

	setSignUpDataToLocalStorage(props);

	if (!props.profileAuthorizationData) {
		<Redirect to='/sign_up' />;
	}

	return <App {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		chats: getChatsSelector(state),
		profiles: getProfilesSelector(state),
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
	addProfile,
	setProfiles,
})(AppContainer);
