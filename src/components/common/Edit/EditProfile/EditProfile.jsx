import React from "react";
import styles from "./EditProfile.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import EditProfileReduxForm from "./EditProfileForm";
import { ChangeProfilePictureContainer } from "../../../../utils/helperForProfile/helperForProfile";

const EditProfile = props => {
	let [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);

	let onSubmit = formData => {
		props.getProfileData(formData);
	};
	let oftenCheck = props.account && props.account.profile;

	return (
		<div className={styles.edit_profile}>
			<div className={styles.wrapper_profile_contact}>
				<div className={styles.wrapper_picture}>
					{oftenCheck && props.account.profile.avatar ? (
						<img
							src={props.account.profile.avatar}
							onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}
							title='Change photo'
							alt=''
						/>
					) : (
						<img
							src={defaultAvatar}
							onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}
							title='Change photo'
							alt=''
						/>
					)}
				</div>
				<div className={styles.wrapper_info}>
					<div className={styles.fullName}>{oftenCheck ? props.account.profile.surname + " " + props.account.profile.name : undefined}</div>
					<div
						className={styles.change_picture}
						onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}>
						Change profile photo
					</div>
				</div>
			</div>

			<EditProfileReduxForm onSubmit={onSubmit} account={props.account} />

			{openModalAvatarProfile ? (
				<ChangeProfilePictureContainer
					{...props}
					openModalAvatarProfile={openModalAvatarProfile}
					setOpenModalAvatarProfile={setOpenModalAvatarProfile}
				/>
			) : undefined}
		</div>
	);
};

export default EditProfile;
