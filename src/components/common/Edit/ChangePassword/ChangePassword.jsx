import React from "react";
import styles from "./ChangePassword.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import ChangePasswordReduxForm from "./ChangePasswordForm";

const ChangePassword = props => {
	let onSubmit = formData => {
		if (
			formData.old_password !== formData.new_password &&
			formData.old_password !== formData.confirm_new_password &&
			formData.new_password === formData.confirm_new_password &&
			formData.old_password === props.account.password
		) {
			console.log(formData);
			props.isAccount({
				...props.account,
				password: formData.new_password,
			});
			props.getProfileData({ ...props.myProfile, password: formData.new_password });
			if (props.users) {
				let user = props.users.find(user => (props.myProfile ? props.myProfile.id === user.id : undefined));
				let users = props.users.filter(user => (props.myProfile ? props.myProfile.id !== user.id : undefined));
				if (users) {
					user = {
						...user,
						password: formData.new_password,
					};
					props.setUsers([...users, user]);
				}
			}
		} else {
			console.log("False");
		}
	};

	let myProfile = props.accounts.find(profile => (profile && props.account ? profile.id === props.account.id : undefined));
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
