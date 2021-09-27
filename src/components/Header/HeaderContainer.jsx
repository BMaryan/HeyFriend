import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { getAuthorizationId, getParamsId, getProfileData, isAccount } from "../../redux/profile-reducer";

const HeaderContainer = props => {
	return <Header {...props} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default connect(mapStateToProps, {
	isAccount,
	getProfileData,
	getParamsId,
	getAuthorizationId,
})(HeaderContainer);
