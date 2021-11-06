import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { unFollowing, following } from "../../redux/profile-reducer";

const MainContainer = props => {
	return <Main {...props} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default connect(mapStateToProps, { unFollowing, following })(MainContainer);
