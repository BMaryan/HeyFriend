/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUserSignIn } from "../../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUsersSelector } from "../../../redux/auth-selectors";
import SignIn from "./SignIn";

const SignInContainer = props => {
	if (props.profileAuthorizationData && props.profileAuthorizationData.phone_or_email) {
		return <Redirect to='/profile' />;
	}

	return <SignIn {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		userSignIn: getUserSignInSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, {
	setUserSignIn,
})(SignInContainer);
