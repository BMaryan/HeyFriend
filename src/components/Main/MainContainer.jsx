import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { Redirect } from "react-router-dom";

const MainContainer = props => {
	if (!props.account) {
		return <Redirect to='/sign_up' />;
	}

	return <Main {...props} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default connect(mapStateToProps, null)(MainContainer);
