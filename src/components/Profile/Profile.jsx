import React from "react";
import styles from "./Profile.module.css";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = props => {
	return (
		<div className={styles.profile}>
			<ProfileInfo profile={props.profile} getProfileData={props.getProfileData} />
			<ProfileContent />
		</div>
	);
};

export default Profile;
