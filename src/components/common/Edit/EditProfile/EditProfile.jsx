import React from "react";
import styles from "./EditProfile.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import EditProfileReduxForm from "./EditProfileForm";
import { ChangeProfilePictureContainer } from "../../../../utils/helperForProfile/helperForProfile";

const EditProfile = props => {
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);

	let onSubmit = formData => {
		props.isAccount({
			...props.account,
			name: formData.name ? formData.name : props.account.name,
			surname: formData.surname ? formData.surname : props.account.surname,
			phone_or_email: formData.phone_or_email ? formData.phone_or_email : props.account.phone_or_email,
		});
		props.getProfileData({ ...props.account, ...formData });

		if (props.users) {
			let user = props.users.find(user => (props.account ? props.account.id === user.id : undefined));
			let users = props.users.filter(user => (props.account ? props.account.id !== user.id : undefined));

			if (users) {
				user = {
					id: user.id,
					name: formData.name ? formData.name : user.name,
					surname: formData.surname ? formData.surname : user.surname,
					phone_or_email: formData.phone_or_email ? formData.phone_or_email : user.phone_or_email,
					password: props.account.password,
				};
				props.setUsers([...users, user]);
			}
		}
	};
	let oftenCheck = props.account && props.account.profile;

	return (
		<div className={styles.edit_profile}>
			<div className={styles.wrapper_profile_contact}>
				<div className={styles.wrapper_picture}>
					{oftenCheck && props.account.profile.avatar ? (
						<img
							src={props.account.profile.avatar}
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							title='Change photo'
							alt=''
						/>
					) : (
						<img
							src={defaultAvatar}
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							title='Change photo'
							alt=''
						/>
					)}
				</div>
				<div className={styles.wrapper_info}>
					<div className={styles.fullName}>{oftenCheck ? props.account.profile.surname + " " + props.account.profile.name : undefined}</div>
					<div
						className={styles.change_picture}
						onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}>
						Change profile photo
					</div>
				</div>
			</div>

			<div>
				<EditProfileReduxForm onSubmit={onSubmit} account={props.account} />
			</div>

			{changeProfilePicture ? (
				<ChangeProfilePictureContainer
					{...props}
					changeProfilePicture={changeProfilePicture}
					setChangeProfilePicture={setChangeProfilePicture}
				/>
			) : undefined}
		</div>
	);
};

export default EditProfile;
