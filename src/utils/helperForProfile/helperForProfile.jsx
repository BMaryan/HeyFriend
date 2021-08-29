import React from "react";
import styles from "../../components/Profile/ProfileInfo/ProfileInfo.module.css";
import CreatePost from "../../components/common/CreatePost/CreatePost";

export const ChangeProfilePictureContainer = props => {
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

export const CreateNewPostContainer = props => {
	return (
		<div className={styles.create_new_post_container}>
			<div className={styles.create_post_title}>Create new post</div>
			<div>
				<CreatePost
					setProfilePosts={props.setProfilePosts}
					getProfileData={props.getProfileData}
					profile={props.profile}
					setCreateNewPost={props.setCreateNewPost}
				/>
			</div>
		</div>
	);
};
