import React from "react";

const Profile = props => {
	return (
		<>
			<div>Profile</div>
			<div>{props.profileAuthorizationData.name}</div>
			<div>{props.profileAuthorizationData.surname}</div>
			<div>{props.profileAuthorizationData.phone_or_email}</div>
			<div>{props.profileAuthorizationData.password}</div>
		</>
	);
};

export default Profile;
