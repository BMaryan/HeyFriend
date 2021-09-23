import React from "react";
import { connect } from "react-redux";
import { getProfileAuthorizationDataSelector } from "../../../redux/auth-selectors";
import { getProfilesSelector } from "../../../redux/profile-selectors";
import Edit from "./Edit";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

const EditContainer = props => {
	let id = Number(props.match.params.id);

	return <Edit {...props} id={id} />;
};

let mapStateToProps = state => {
	return {
		profiles: getProfilesSelector(state),
		profileAuthorizationData: getProfileAuthorizationDataSelector(state),
	};
};

export default compose(connect(mapStateToProps, null), withRouter)(EditContainer);
