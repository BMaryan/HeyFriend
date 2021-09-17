import React from "react";
import { connect } from "react-redux";
import { checkAuthorization } from "../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";
import Header from "./Header";
import { getProfileSelector, getProfilesSelector } from "../../redux/profile-selectors";
import { getAuthorizationId, getParamsId, getProfileData } from "../../redux/profile-reducer";

const HeaderContainer = props => {
	return <Header {...props} />;
};

const mapStateToProps = state => {
	return {
		profiles: getProfilesSelector(state),
		profile: getProfileSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, {
	checkAuthorization,
	getProfileData,
	getParamsId,
	getAuthorizationId,
})(HeaderContainer);
