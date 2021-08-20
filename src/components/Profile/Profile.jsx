import React from "react";
// import styles from "./Profile.module.css";

const Profile = props => {
	// let userId = 1 - props.match.params.id;
	// console.log(props.users[Number(props.match.params.id)]);

	return (
		<div style={{ flexDirection: "column" }}>
			<div>Profile</div>
			{props.profile ? (
				<>
					<div>{props.profile.id}</div>
					<div>{props.profile.name}</div>
					<div>{props.profile.surname}</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Profile;
