import React from "react";
import styles from "./ProfileInfo.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, CreateNewPostContainer } from "../../../utils/helperForProfile/helperForProfile";

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
			<div className={styles.profile_picture_content}>
				<div className={changeProfilePicture ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>
					<img
						onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
						src={props.profile && props.profile.img ? props.profile.img : defaultAvatar}
						title='Change profile photo'
						alt=''
					/>
				</div>
				<div className={styles.wrapper_icon}>{/* <FontAwesomeIcon className={styles.icon} icon={faCamera} /> */}</div>
				<div>
					{changeProfilePicture ? (
						<ChangeProfilePictureContainer getProfileData={props.getProfileData} setChangeProfilePicture={setChangeProfilePicture} />
					) : (
						<></>
					)}
				</div>
			</div>
			<div className={styles.profile_fullName}>{props.profile ? props.profile.surname + " " + props.profile.name : <></>}</div>
			<div className={styles.profile_status}>New York, NY</div>
			<div className={styles.profile_aboutYou}>I am {props.profile.name}. I want to do application network and start working in job!</div>
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
			{/* test */}
			{props.id ? <button style={{ width: "100%", padding: "10px 0", marginTop: "20px" }}>Message</button> : <></>}
			{/* test */}

			<div className={styles.wrapper_button}>
				<button onClick={() => (createNewPost ? setCreateNewPost(false) : setCreateNewPost(true))}>Create post</button>
			</div>
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
