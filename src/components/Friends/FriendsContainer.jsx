import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Friends from "./Friends";
import { withRouter } from "react-router-dom";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";

const FriendsContainer = props => {
	return <Friends {...props} />;
};

let mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(connect(mapStateToProps, null), withRouter)(FriendsContainer);
