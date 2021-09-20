/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkAuthorization, setUserSignIn } from "../../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignInSelector, getUsersSelector } from "../../../redux/auth-selectors";
import { helpCheckAuthorization } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";

const SignInContainer = props => {
	React.useEffect(() => {
		if (props.profileAuthorizationData) {
			localStorage.setItem("profileAuthorizationData", JSON.stringify(props.profileAuthorizationData));
		}
	}, [props.profileAuthorizationData]);

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
	helpCheckAuthorization,
	checkAuthorization,
})(SignInContainer);
