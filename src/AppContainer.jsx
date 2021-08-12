/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { checkAuthorization, setUsers } from "./redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUserSignUpSelector, getUsersSelector } from "./redux/auth-selectors";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";

const AppContainer = props => {
	React.useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		props.setUsers(users);
	}, [setSignUpDataToLocalStorage(props)]);

	React.useEffect(() => {
		let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));
		props.checkAuthorization(profileUser);
	}, [props.userSignIn]);

	setSignUpDataToLocalStorage(props);
	helpCheckAuthorization(props);

	return <App {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
		userSignIn: getUserSignInSelector(state),
		userSignUp: getUserSignUpSelector(state),
	};
};

export default connect(mapStateToProps, { setUsers, checkAuthorization, setSignUpDataToLocalStorage, helpCheckAuthorization })(AppContainer);
