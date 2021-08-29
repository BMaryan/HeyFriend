/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getProfileSelector } from "../../redux/profile-selectors";
import { getProfileData, setProfilePosts } from "../../redux/profile-reducer";

const ProfileContainer = props => {
	let id = Number(props.match.params.id);

	React.useEffect(() => {
		if (id) {
			props.users.find(user => {
				if (user.id === id) {
					props.getProfileData(user);
					localStorage.setItem("profile", JSON.stringify(props.profile));
				}
			});
		} else {
			if (props.profileAuthorizationData) {
				props.getProfileData(props.profileAuthorizationData);
				localStorage.setItem("profile", JSON.stringify(props.profile));
			}
		}
	}, [props.profileAuthorizationData]);

	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}

	return <Profile {...props} />;
};

const mapStateToProps = state => {
	return {
		profile: getProfileSelector(state),
		users: getUsersSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(connect(mapStateToProps, { getProfileData, setProfilePosts }), withRouter)(ProfileContainer);
