import React from "react";
import { connect } from "react-redux";
import { getAccountSelector, getAccountsSelector } from "../../../redux/profile-selectors";
import CurrentPost from "./CurrentPost";
import { withBottomNavigation } from "../../../hoc/withBottomNavigation/withBottomNavigation";
import { compose } from "redux";

const CurrentPostContainer = props => {
	return <CurrentPost {...props} />;
};

let mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default compose(connect(mapStateToProps, {}), withBottomNavigation)(CurrentPostContainer);
