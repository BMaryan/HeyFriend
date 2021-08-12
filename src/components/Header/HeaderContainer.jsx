import React from "react";
import { connect } from "react-redux";
import { checkAuthorization } from "../../redux/auth-reducer";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";
import Header from "./Header";

const HeaderContainer = props => {
	return <Header {...props} profileAuthorizationData={props.profileAuthorizationData} checkAuthorization={props.checkAuthorization} />;
};

const mapStateToProps = state => {
	return {
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, {
	checkAuthorization,
})(HeaderContainer);
