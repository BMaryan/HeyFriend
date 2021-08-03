/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkAuthorization, setUsers, setUserSignUp } from "../../../redux/auth-reducer";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignUp from "./SignUp";

const SignUpContainer = props => {
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

	if (props.profileAuthorizationData && props.profileAuthorizationData.phone_or_email) {
		return <Redirect to='/profile' />;
	}

	return <SignUp {...props} userSignUp={props.userSignUp} setUsers={props.setUsers} setUserSignUp={props.setUserSignUp} users={props.users} />;
};

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		userSignUp: state.auth.userSignUp,
		userSignIn: state.auth.userSignIn,
		profileAuthorizationData: state.auth.profileAuthorizationData,
	};
};

export default connect(mapStateToProps, { setUserSignUp, setUsers, setSignUpDataToLocalStorage, helpCheckAuthorization, checkAuthorization })(
	SignUpContainer
);
