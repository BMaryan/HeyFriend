import React from "react";
import { connect } from "react-redux";
import { getProfileAuthorizationDataSelector, getUsersSelector } from "../../../redux/auth-selectors";
import { getProfilesSelector } from "../../../redux/profile-selectors";
import Edit from "./Edit";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { getProfileData } from "../../../redux/profile-reducer";
import { checkAuthorization, setUsers } from "../../../redux/auth-reducer";

const EditContainer = props => {
	React.useEffect(() => {
		if (props.profileAuthorizationData) {
			localStorage.setItem("profileAuthorizationData", JSON.stringify(props.profileAuthorizationData));
		}
	}, [props.profileAuthorizationData]);

	React.useEffect(() => {
		if (props.users && props.profiles.length > 0) {
			localStorage.setItem("users", JSON.stringify(props.users));
		}
	}, [props.users]);

	React.useEffect(() => {
		if (props.profiles && props.profiles.length > 0) {
			localStorage.setItem("profiles", JSON.stringify(props.profiles));
		}
	}, [props.profiles]);

	let id = Number(props.match.params.id);
	let myProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);

	return <Edit {...props} id={id} />;
};

let mapStateToProps = state => {
	return {
		profiles: getProfilesSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
		users: getUsersSelector(state),
	};
};

export default compose(connect(mapStateToProps, { getProfileData, checkAuthorization, setUsers }), withRouter)(EditContainer);
