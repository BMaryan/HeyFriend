import React from "react";
import { connect } from "react-redux";
import { getAccountSelector, getAccountsSelector } from "../../../redux/profile-selectors";
import CurrentPost from "./CurrentPost";

const CurrentPostContainer = props => {
	return <CurrentPost {...props} />;
};

let mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default connect(mapStateToProps, {})(CurrentPostContainer);
