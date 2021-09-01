import React from "react";
import styles from "./Profile.module.css";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = props => {
	return (
		<div className={styles.profile}>
			<ProfileInfo
				profile={props.profile}
				addChat={props.addChat}
				getProfileData={props.getProfileData}
				setProfilePosts={props.setProfilePosts}
				id={props.id}
			/>
			<ProfileContent profile={props.profile} />
		</div>
	);
};

export default Profile;
