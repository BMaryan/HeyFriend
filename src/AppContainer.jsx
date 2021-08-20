/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { checkAuthorization, setUsers } from "./redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUserSignUpSelector, getUsersSelector } from "./redux/auth-selectors";
import { getProfileData } from "./redux/profile-reducer";
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
		let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));
		props.getProfileData(profileUser);
	}, [props.profileAuthorizationData]);

	React.useEffect(() => {
		props.getProfileData(JSON.parse(localStorage.getItem("profile")));
	}, [props.profileAuthorizationData]);

	setSignUpDataToLocalStorage(props);
	helpCheckAuthorization(props);

	return <App {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
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
})(AppContainer);
