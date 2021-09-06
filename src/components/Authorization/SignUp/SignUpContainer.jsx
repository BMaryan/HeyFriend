/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUserSignUp } from "../../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector, getUserSignUpSelector, getUsersSelector } from "../../../redux/auth-selectors";
import { addProfile } from "../../../redux/profile-reducer";
import { helpCheckAuthorization } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignUp from "./SignUp";
import { getProfilesSelector } from "../../../redux/profile-selectors";

const SignUpContainer = props => {
	React.useEffect(() => {
		if (props.users && props.userSignUp && props.userSignUp.name) {
			let res = props.profiles.find(item => {
				return item.id === props.users.length;
			});

			if (!res) {
				props.addProfile(props.users[props.users.length - 1].id);
			}
		}
	}, [props.userSignUp]);

	if (props.profileAuthorizationData && props.profileAuthorizationData.phone_or_email) {
		return <Redirect to='/profile' />;
	}

	return <SignUp {...props} />;
};

const mapStateToProps = state => {
	return {
		profiles: getProfilesSelector(state),
		users: getUsersSelector(state),
		userSignUp: getUserSignUpSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, { setUserSignUp, helpCheckAuthorization, addProfile })(SignUpContainer);
