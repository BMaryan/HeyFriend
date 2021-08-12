/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkAuthorization, setUsers, setUserSignUp } from "../../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUserSignUpSelector, getUsersSelector } from "../../../redux/auth-selectors";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignUp from "./SignUp";

const SignUpContainer = props => {
	if (props.profileAuthorizationData && props.profileAuthorizationData.phone_or_email) {
		return <Redirect to='/profile' />;
	}

	return <SignUp {...props} userSignUp={props.userSignUp} setUsers={props.setUsers} setUserSignUp={props.setUserSignUp} users={props.users} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		userSignUp: getUserSignUpSelector(state),
		userSignIn: getUserSignInSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, { setUserSignUp, setUsers, setSignUpDataToLocalStorage, helpCheckAuthorization, checkAuthorization })(
	SignUpContainer
);
