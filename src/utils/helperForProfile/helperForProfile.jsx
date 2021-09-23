import React from "react";
import styles from "./helperForProfile.module.css";
import CreatePostReduxForm from "../../components/common/CreatePost/CreatePostForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export const ChangeProfilePictureContainer = props => {
	let myProfile = props.profiles
		? props.profiles.find(profile => (props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined))
		: undefined;

	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				props.getProfileData({ ...myProfile.profile, img: reader.result });
				props.setChangeProfilePicture(false);
			};
		}
	};

	let removeProfilePicture = () => {
		props.getProfileData({ ...myProfile.profile, img: null });
		props.setChangeProfilePicture(false);
	};

	return (
		<div className={styles.change_profile_picture_container}>
			<div className={styles.change_profile_picture_content}>
				<div className={styles.title}>Change profile photo</div>
				<div className={styles.wrapper_change_picture}>
					<label htmlFor='file-upload'>Upload photo</label>
					<input onChange={e => onChangeProfilePicture(e)} id='file-upload' type='file' />
				</div>

				<div className={styles.wrapper_change_picture} onClick={() => removeProfilePicture()}>
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
	let [saveOwnerPost, setSaveOwnerPost] = React.useState(null);

	let onSubmit = formData => {
		setSaveOwnerPost(formData.create_post);
	};

	return (
		<div className={styles.create_new_post_container}>
			<div className={styles.create_new_post_content}>
				<div className={styles.create_post_title}>Create new post</div>

				<div>
					<CreatePostReduxForm onChange={onSubmit} />
				</div>

				<div className={styles.wrapper_content}>
					<div className={styles.wrapper_add_picture}>
						<label title='Add photo' onChange={e => props.onChangeProfilePicture(e)}>
							{props.postPicture ? (
								<img className={styles.post_img} src={props.postPicture} alt='' />
							) : (
								<FontAwesomeIcon className={styles.icon} icon={faPlusSquare} />
							)}
							<input type='file' />
						</label>

						{props.postPicture ? (
							<div className={styles.wrapper_button_delete}>
								<button onClick={() => props.setPostPicture(false)}>x</button>
							</div>
						) : undefined}
					</div>
				</div>

				<div className={styles.wrapper_button_publish}>
					<button
						onClick={() =>
							props.postPicture ? (
								props.setProfilePosts(props.postPicture, null, null, saveOwnerPost ? saveOwnerPost : null) &&
								props.setCreatePostContainer(false) &&
								props.postPicture(null)
							) : (
								<></>
							)
						}>
						Publish
					</button>
				</div>

				<div className={styles.wrapper_button_close}>
					<button onClick={() => props.setCreatePostContainer(false)}>x</button>
				</div>
			</div>
		</div>
	);
};
