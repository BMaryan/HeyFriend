import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";

const ProfileContainer = props => {
	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}

	return <Profile {...props} />;
};

const mapStateToProps = state => {
	return {
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, {})(ProfileContainer);
