import React from "react";
import styles from "./Profile.module.css";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = props => {
	return (
		<div className={styles.profile}>
			<ProfileInfo
				profiles={props.profiles}
				profile={props.profile}
				addChat={props.addChat}
				getProfileData={props.getProfileData}
				id={props.id}
				profileAuthorizationData={props.profileAuthorizationData}
				chats={props.chats}
				setProfileChats={props.setProfileChats}
			/>
			<ProfileContent
				profile={props.profile}
				profiles={props.profiles}
				profileAuthorizationData={props.profileAuthorizationData}
				setProfilePosts={props.setProfilePosts}
				id={props.id}
			/>
		</div>
	);
};

export default Profile;
