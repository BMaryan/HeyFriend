import React from "react";
// import styles from "./Profile.module.css";

const Profile = props => {
	// let userId = 1 - props.match.params.id;
	// console.log(props.users[Number(props.match.params.id)]);

	return (
		<div style={{ flexDirection: "column" }}>
			{/* {props.match.params.id ? (
				props.users.find(user => {
					console.log(user);
					return user.id === Number(props.match.params.id);
				})
			) : ( */}
			<>
				<div>Profile</div>
				<div>{props.profileAuthorizationData.name}</div>
				<div>{props.profileAuthorizationData.surname}</div>
				<div>{props.profileAuthorizationData.phone_or_email}</div>
				<div>{props.profileAuthorizationData.password}</div>
			</>
			{/* // )} */}
		</div>
	);
};

export default Profile;
