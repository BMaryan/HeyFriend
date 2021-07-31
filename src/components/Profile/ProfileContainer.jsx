import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Profile from "./Profile";

const ProfileContainer = props => {
	console.log(props);

	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}

	return <Profile {...props} />;
};

const mapStateToProps = state => {
	return {
		profileAuthorizationData: state.auth.profileAuthorizationData,
	};
};

export default connect(mapStateToProps, null)(ProfileContainer);
