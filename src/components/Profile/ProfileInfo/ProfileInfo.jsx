import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, CreateNewPostContainer } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";

const ProfileInfo = props => {
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);
	let [createNewPost, setCreateNewPost] = React.useState(false);

	// React.useEffect(() => {
	// 	if (changeProfilePicture === true) {
	// 		// document.querySelector(".App").style.background = "red";
	// 		// document.body.style.background = "red";
	// 	} else {
	// 		document.querySelector(".App").style.background = "black";

	// 		// document.body.style.background = `var(--backgroundBody)`;
	// 	}
	// }, [changeProfilePicture]);

	return (
		<div className={styles.profile_info}>
			<div className={styles.profile_picture}>
				<div className={changeProfilePicture ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>
					<img
						onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
						src={props.profile && props.profile.img ? props.profile.img : defaultAvatar}
						title='Change profile photo'
						alt=''
					/>
				</div>
			</div>

			{/* full name */}
			<div className={styles.profile_fullName}>{props.profile ? props.profile.surname + " " + props.profile.name : <></>}</div>

			{/* status */}
			<div className={styles.profile_status}>New York, NY</div>

			{/* about me */}
			<div className={styles.profile_aboutMe}>I am {props.profile.name}. I want to do application network and start working in job!</div>

			{/* details info content */}
			<div className={styles.profile_details_info_content}>
				<div className={styles.details_info_content}>
					<div className={styles.detail_number}>{props.profile && props.profile.posts ? props.profile.posts.length : 0}</div>
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
			<div className={styles.wrapper_button_createPost}>
				<button className={styles.button_createPost} onClick={() => (createNewPost ? setCreateNewPost(false) : setCreateNewPost(true))}>
					Create post
				</button>
			</div>

			{/* toggle show container for change something in profile */}
			{/* change picture */}
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

			{/* create post */}
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
		</div>
	);
};

export default ProfileInfo;
