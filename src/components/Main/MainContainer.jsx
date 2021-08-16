import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { getProfileAuthorizationDataSelector } from "../../redux/auth-selectors";

const MainContainer = props => {
	return <Main {...props} />;
};

const mapStateToProps = state => {
	return {
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default connect(mapStateToProps, null)(MainContainer);
