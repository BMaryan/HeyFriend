import React from "react";
import styles from "./helperForProfile.module.css";
import BodyPost from "../../components/common/Post/BodyPost/BodyPost";
import HeadPost from "../../components/common/Post/HeadPost/HeadPost";
import FooterPost from "../../components/common/Post/FooterPost/FooterPost";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export const ChangeProfilePictureContainer = props => {
	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				props.getProfileData({ ...props.account.profile, avatar: reader.result });
				props.setOpenModalAvatarProfile(false);
			};
		}
	};

	let removeProfilePicture = () => {
		props.getProfileData({ ...props.account.profile, avatar: null });
		props.setOpenModalAvatarProfile(false);
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={props.openModalAvatarProfile}
			onClose={() => props.setOpenModalAvatarProfile(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={props.openModalAvatarProfile}>
				<Box className={styles.change_profile_picture_container}>
					<div className={styles.change_profile_picture_content}>
						<div className={styles.title}>Change profile photo</div>
						<div className={styles.wrapper_upload_picture}>
							<label>
								Upload photo
								<input onChange={e => onChangeProfilePicture(e)} id='file-upload' type='file' />
							</label>
						</div>

						<div className={styles.wrapper_change_picture} onClick={() => removeProfilePicture()}>
							Remove current photo
						</div>

						<div onClick={() => props.setOpenModalAvatarProfile(false)} className={styles.wrapper_change_picture}>
							Cancel
						</div>
					</div>
				</Box>
			</Fade>
		</Modal>
	);
};

export const ContainerCoverProfile = props => {
	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				props.getProfileData({ ...props.account.profile, coverPhoto: reader.result });
				props.setOpenModalCoverProfile(false);
			};
		}
	};

	let removeProfilePicture = () => {
		props.getProfileData({ ...props.account.profile, coverPhoto: null });
		props.setOpenModalCoverProfile(false);
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={props.openModalCoverProfile}
			onClose={() => props.setOpenModalCoverProfile(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={props.openModalCoverProfile}>
				<Box className={styles.change_profile_picture_container}>
					<div className={styles.change_profile_picture_content}>
						<div className={styles.title}>Change profile cover photo</div>
						<div className={styles.wrapper_upload_picture}>
							<label>
								Upload cover photo
								<input onChange={e => onChangeProfilePicture(e)} id='file-upload' type='file' />
							</label>
						</div>

						<div className={styles.wrapper_change_picture} onClick={() => removeProfilePicture()}>
							Remove cover photo
						</div>

						<div onClick={() => props.setOpenModalCoverProfile(false)} className={styles.wrapper_change_picture}>
							Cancel
						</div>
					</div>
				</Box>
			</Fade>
		</Modal>
	);
};

export let ToggleShowCurrentPostContainer = props => {
	return (
		<>
			<Modal
				className={styles.modal}
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={props.openModalCurrentPost}
				onClose={() => props.setOpenModalCurrentPost(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={props.openModalCurrentPost}>
					<Box className={styles.modal_current_post_container}>
						<div className={styles.toggle_show_post_content}>
							<div className={styles.postPhoto}>
								<BodyPost {...props} post={props.account.profile.posts[4]} />
							</div>
							<div className={styles.content}>
								<HeadPost {...props} />
								<FooterPost {...props} />
							</div>
						</div>

						{/* <div className={styles.wrapper_button_close}>
							<button onClick={() => props.setOpenModalCurrentPost(false)}>x</button>
						</div> */}
					</Box>
				</Fade>
			</Modal>
		</>
	);
};
