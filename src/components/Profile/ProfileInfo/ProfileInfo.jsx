import React from "react";
import styles from "./ProfileInfo.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";

const ChangeProfilePictureContainer = props => {
	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				props.getProfileData({ img: reader.result });
				localStorage.setItem("profile", JSON.stringify({ img: reader.result }));
			};
		}
	};

	let removeProfilePicture = () => {
		return props.getProfileData({ img: null });
	};

	return (
		<div className={styles.change_profile_picture_container}>
			<div className={styles.change_profile_picture_content}>
				<div className={styles.title}>Change profile photo</div>
				<div className={styles.wrapper_change_picture}>
					<label htmlFor='file-upload'>Upload photo</label>
					<input onChange={e => onChangeProfilePicture(e)} id='file-upload' type='file' />
				</div>
				<div
					className={styles.wrapper_change_picture}
					onClick={() => removeProfilePicture() && localStorage.setItem("profile", JSON.stringify({ img: null }))}>
					Remove current photo
				</div>
				<div onClick={() => props.setChangeProfilePicture(false)} className={styles.wrapper_change_picture}>
					Cancel
				</div>
			</div>
		</div>
	);
};

const ProfileInfo = props => {
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);

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
					<div className={styles.detail_number}>174</div>
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
		</div>
	);
};

export default ProfileInfo;
