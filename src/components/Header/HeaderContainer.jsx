import React from "react";
import { connect } from "react-redux";
import { checkAuthorization } from "../../redux/auth-reducer";
import Header from "./Header";

const HeaderContainer = props => {
	return <Header {...props} profileAuthorizationData={props.profileAuthorizationData} checkAuthorization={props.checkAuthorization} />;
};

const mapStateToProps = state => {
	return {
		profileAuthorizationData: state.auth.profileAuthorizationData,
	};
};

export default connect(mapStateToProps, {
	checkAuthorization,
})(HeaderContainer);
