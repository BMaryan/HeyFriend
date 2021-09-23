import React from "react";
import styles from "./ChangePassword.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import ChangePasswordReduxForm from "./ChangePasswordForm";

const ChangePassword = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	let myProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let oftenCheck = myProfile && myProfile.profile;

	return (
		<div className={styles.change_password}>
			<div className={styles.wrapper_profile_contact}>
				<div className={styles.wrapper_picture}>
					{oftenCheck && myProfile.profile.img ? <img src={myProfile.profile.img} alt='' /> : <img src={defaultAvatar} alt='' />}
				</div>
				<div className={styles.fullName}>{oftenCheck ? myProfile.profile.surname + " " + myProfile.profile.name : undefined}</div>
			</div>

			<div>
				<ChangePasswordReduxForm onSubmit={onSubmit} />
			</div>
		</div>
	);
};

export default ChangePassword;
