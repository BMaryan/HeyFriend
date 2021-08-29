import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";
import { getProfileSelector } from "../../redux/profile-selectors";
import { Redirect } from "react-router-dom";

const MainContainer = props => {
	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}
	return <Main {...props} />;
};

const mapStateToProps = state => {
	return {
		profile: getProfileSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, null)(MainContainer);
