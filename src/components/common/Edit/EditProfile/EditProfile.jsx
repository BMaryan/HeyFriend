import React from "react";
import styles from "./EditProfile.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import EditProfileReduxForm from "./EditProfileForm";

const EditProfile = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	let myProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let oftenCheck = myProfile && myProfile.profile;

	return (
		<div className={styles.edit_profile}>
			<div className={styles.wrapper_profile_contact}>
				<div className={styles.wrapper_picture}>
					{oftenCheck && myProfile.profile.img ? (
						<img src={myProfile.profile.img} title='Change photo' alt='' />
					) : (
						<img src={defaultAvatar} title='Change photo' alt='' />
					)}
				</div>
				<div className={styles.wrapper_info}>
					<div className={styles.fullName}>{oftenCheck ? myProfile.profile.surname + " " + myProfile.profile.name : undefined}</div>
					<div className={styles.change_picture}>
						<label>
							Change profile photo
							<input type='file' />
						</label>
					</div>
				</div>
			</div>

			<div>
				<EditProfileReduxForm onSubmit={onSubmit} myProfile={myProfile} />
			</div>
		</div>
	);
};

export default EditProfile;
