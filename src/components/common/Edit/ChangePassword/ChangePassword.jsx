import React from "react";
import styles from "./ChangePassword.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import ChangePasswordReduxForm from "./ChangePasswordForm";

const ChangePassword = props => {
	let onSubmit = formData => {
		console.log(formData);
		if (formData.old_password !== formData.new_password && formData.old_password !== formData.confirm_new_password) {
			if (formData.new_password === formData.confirm_new_password && formData.old_password === props.account.profile.password) {
				props.getProfileData({ password: formData.new_password });
			}
		}
	};

	let oftenCheck = props.account && props.account.profile;

	return (
		<div className={styles.change_password}>
			<div className={styles.wrapper_profile_contact}>
				<div className={styles.wrapper_picture}>
					{oftenCheck && props.account.profile.avatar ? (
						<img src={props.account.profile.avatar} alt='' />
					) : (
						<img src={defaultAvatar} alt='' />
					)}
				</div>
				<div className={styles.fullName}>{oftenCheck ? props.account.profile.surname + " " + props.account.profile.name : undefined}</div>
			</div>

			<ChangePasswordReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default ChangePassword;
