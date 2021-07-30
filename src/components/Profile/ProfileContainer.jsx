import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";

const ProfileContainer = props => {
	return <Profile {...props} />;
};

const mapStateToProps = state => {
	return {};
};

export default connect(mapStateToProps, null)(ProfileContainer);
