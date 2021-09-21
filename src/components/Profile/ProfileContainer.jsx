/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../redux/auth-selectors";
import Profile from "./Profile";
import { getProfileSelector, getProfilesSelector } from "../../redux/profile-selectors";
import { getProfileData, setProfilePosts, getParamsId, getAuthorizationId } from "../../redux/profile-reducer";
import { addChat } from "../../redux/chat-reducer";
import { getChatsSelector } from "../../redux/chat-selectors";

const ProfileContainer = props => {
	let id = Number(props.match.params.id);

	React.useEffect(() => {
		if (id) {
			props.users.find(user => {
				if (user.id === id && props.profileAuthorizationData.id !== id) {
					props.getProfileData(user);
				}
			});
		} else {
			if (props.profileAuthorizationData) {
				props.getProfileData(props.profileAuthorizationData);
			}
		}
	}, [props.profileAuthorizationData]);

	if (!props.profileAuthorizationData) {
		return <Redirect to='/sign_up' />;
	}

	if (id) {
		props.getParamsId(id);
		props.getAuthorizationId(null);
	} else {
		props.getParamsId(null);
		props.getAuthorizationId(props.profileAuthorizationData.id);
	}

	return <Profile {...props} id={id} />;
};

const mapStateToProps = state => {
	return {
		profiles: getProfilesSelector(state),
		profile: getProfileSelector(state),
		users: getUsersSelector(state),
		chats: getChatsSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, { getProfileData, setProfilePosts, addChat, getParamsId, getAuthorizationId }),
	withRouter
)(ProfileContainer);
