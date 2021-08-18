/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";

const ProfileContainer = props => {
	// React.useEffect(() => {
	// 	let id = Number(props.match.params.id);
	// 	if (!id) {
	// 		return props.profileAuthorizationData;
	// 	} else {
	// 		return props.users.find(user => {
	// 			if (user.id === id) {
	// 				return user;
	// 			}
	// 		});
	// 	}
	// }, [props.match.params.id]);

	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}

	return <Profile {...props} />;
};

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(connect(mapStateToProps, {}), withRouter)(ProfileContainer);
