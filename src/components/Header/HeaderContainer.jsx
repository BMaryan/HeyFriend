import React from "react";
import { connect } from "react-redux";
import { checkAuthorization } from "../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";
import { getProfileData } from "../../redux/profile-reducer";
import Header from "./Header";

const HeaderContainer = props => {
	// React.useEffect(() => {
	// 	let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));
	// 	if (!profileUser) {
	// 		localStorage.removeItem("profileAuthorizationData");
	// 	}
	// }, [props.profileAuthorizationData]);

	return <Header {...props} />;
};

const mapStateToProps = state => {
	return {
		profile: getProfileData(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, {
	checkAuthorization,
	getProfileData,
})(HeaderContainer);
