import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, CreateNewPostContainer } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";

const ProfileInfo = props => {
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);
	let [createNewPost, setCreateNewPost] = React.useState(false);

	let foundMyProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let foundOtherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.profile_info}>
			<div className={styles.profile_picture}>
				<div className={changeProfilePicture && !props.id ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>
					{foundMyProfile && foundMyProfile.profile && foundMyProfile.profile.img && !props.id ? (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={foundMyProfile.profile.img}
							title='Change profile photo'
							alt=''
						/>
					) : foundOtherProfile && foundOtherProfile.profile && foundOtherProfile.profile.img && props.id ? (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={foundOtherProfile.profile.img}
							alt=''
						/>
					) : (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={defaultAvatar}
							title='Change profile photo'
							alt=''
						/>
					)}
				</div>
			</div>

			{/* full name */}
			<div className={styles.profile_fullName}>
				{foundOtherProfile && foundOtherProfile.profile ? (
					foundOtherProfile.profile.surname + " " + foundOtherProfile.profile.name
				) : foundMyProfile && foundMyProfile.profile ? (
					foundMyProfile.profile.surname + " " + foundMyProfile.profile.name
				) : (
					<></>
				)}
			</div>

			{/* status */}
			<div className={styles.profile_status}>
				{foundOtherProfile && foundOtherProfile.profile ? (
					foundOtherProfile.profile.status
				) : foundMyProfile && foundMyProfile.profile ? (
					foundMyProfile.profile.status
				) : (
					<></>
				)}
			</div>

			{/* about me */}
			<div className={styles.profile_aboutMe}>
				{foundOtherProfile && foundOtherProfile.profile ? (
					foundOtherProfile.profile.aboutMe
				) : foundMyProfile && foundMyProfile.profile ? (
					foundMyProfile.profile.aboutMe
				) : (
					<></>
				)}
			</div>

			{/* details info content */}
			<div className={styles.profile_details_info_content}>
				<div className={styles.details_info_content}>
					<div className={styles.detail_number}>
						{foundOtherProfile && foundOtherProfile.profile && foundOtherProfile.profile.posts.length > 0
							? foundOtherProfile.profile.posts.length
							: 0 || (foundMyProfile && foundMyProfile.profile && foundMyProfile.profile.posts.length > 0)
							? foundMyProfile.profile.posts.length
							: 0}
					</div>
					<div className={styles.detail_title}>Posts</div>
				</div>
				<div className={styles.details_info_content}>
					<div className={styles.detail_number}>261k</div>
					<div className={styles.detail_title}>Followers</div>
				</div>
				<div className={styles.details_info_content}>
					<div className={styles.detail_number}>674</div>
					<div className={styles.detail_title}>Following</div>
				</div>
			</div>

			{/* button message not for my profile */}
			{props.id && props.profileAuthorizationData.id !== props.id ? (
				<div className={styles.wrapper_button_message}>
					<button className={styles.button_message} onClick={() => props.addChat(props.id)}>
						<NavLink className={styles.navLink_message} to={"/chat/" + props.id}>
							Message
						</NavLink>
					</button>
				</div>
			) : (
				<></>
			)}

			{/* button create post */}
			{!props.id && props.profileAuthorizationData.id !== props.id ? (
				<div className={styles.wrapper_button_createPost}>
					<button className={styles.button_createPost} onClick={() => (createNewPost ? setCreateNewPost(false) : setCreateNewPost(true))}>
						Create post
					</button>
				</div>
			) : (
				<></>
			)}

			{/* toggle show container for change something in profile */}
			{/* change picture */}
			{!props.id && props.profileAuthorizationData.id !== props.id ? (
				<div>
					{changeProfilePicture ? (
						<ChangeProfilePictureContainer
							profile={props.profile}
							getProfileData={props.getProfileData}
							setChangeProfilePicture={setChangeProfilePicture}
						/>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}

			{/* create post */}
			{!props.id && props.profileAuthorizationData.id !== props.id ? (
				<div>
					{createNewPost ? (
						<CreateNewPostContainer
							setProfilePosts={props.setProfilePosts}
							getProfileData={props.getProfileData}
							profile={props.profile}
							setCreateNewPost={setCreateNewPost}
						/>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default ProfileInfo;
