import React from "react";
import styles from "./Profile.module.css";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = props => {
	return (
		<div className={styles.profile}>
			<ProfileInfo />
			<ProfileContent />
		</div>
	);
};

export default Profile;

// {
// 	/* <div>Profile</div> */
// }
// {
// 	/* {props.profile ? (
// 				<>
// 					<div>{props.profile.id}</div>
// 					<div>{props.profile.name}</div>
// 					<div>{props.profile.surname}</div>
// 				</>
// 			) : (
// 				<></>
// 			)} */
// }
