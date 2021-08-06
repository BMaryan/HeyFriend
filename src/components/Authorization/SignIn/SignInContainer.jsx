/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkAuthorization, setUsers, setUserSignIn } from "../../../redux/auth-reducer";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";

const SignInContainer = props => {
	if (props.profileAuthorizationData && props.profileAuthorizationData.phone_or_email) {
		return <Redirect to='/profile' />;
	}

	return (
		<SignIn
			{...props}
			profileAuthorizationData={props.profileAuthorizationData}
			checkAuthorization={props.checkAuthorization}
			setUserSignIn={props.setUserSignIn}
			userSignIn={props.userSignIn}
		/>
	);
};

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		userSignIn: state.auth.userSignIn,
		profileAuthorizationData: state.auth.profileAuthorizationData,
	};
};

export default connect(mapStateToProps, {
	setUserSignIn,
	setSignUpDataToLocalStorage,
	setUsers,
	checkAuthorization,
	helpCheckAuthorization,
})(SignInContainer);
