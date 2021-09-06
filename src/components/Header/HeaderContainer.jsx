import React from "react";
import { connect } from "react-redux";
import { checkAuthorization } from "../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";
import Header from "./Header";
import { getProfileSelector } from "../../redux/profile-selectors";
import { getProfileData } from "../../redux/profile-reducer";

const HeaderContainer = props => {
	return <Header {...props} />;
};

const mapStateToProps = state => {
	return {
		profile: getProfileSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, {
	checkAuthorization,
	getProfileData,
})(HeaderContainer);
