import React from "react";
import styles from "./helperForProfile.module.css";
import BodyPost from "../../components/common/Post/BodyPost/BodyPost";
import HeadPost from "../../components/common/Post/HeadPost/HeadPost";
import FooterPost from "../../components/common/Post/FooterPost/FooterPost";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { getPictureBase64, removePicture } from "../../core/methods/methods";

const DuplicateCodeFunc = props => {
	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={props.open}
			onClose={props.close}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={props.open}>
				<Box className={props.class}>{props.children}</Box>
			</Fade>
		</Modal>
	);
};

export const ChangeProfilePictureContainer = props => {
	return (
		<DuplicateCodeFunc
			{...props}
			open={props.openModalAvatarProfile}
			close={() => props.setOpenModalAvatarProfile(false)}
			class={styles.change_profile_picture_container}>
			<div className={styles.change_profile_picture_content}>
				<div className={styles.title}>Change profile photo</div>
				<div className={styles.wrapper_upload_picture}>
					<label>
						Upload photo
						<input
							onChange={e => {
								getPictureBase64(e, props.getProfileData, props.account, "avatar");
								props.setOpenModalAvatarProfile(false);
							}}
							id='file-upload'
							type='file'
						/>
					</label>
				</div>

				<div
					className={styles.wrapper_change_picture}
					onClick={() => {
						removePicture(props.getProfileData, props.account, "avatar");
						props.setOpenModalAvatarProfile(false);
					}}>
					Remove current photo
				</div>

				<div onClick={() => props.setOpenModalAvatarProfile(false)} className={styles.wrapper_change_picture}>
					Cancel
				</div>
			</div>
		</DuplicateCodeFunc>
	);
};

export const ContainerCoverProfile = props => {
	return (
		<DuplicateCodeFunc
			{...props}
			open={props.openModalCoverProfile}
			close={() => props.setOpenModalCoverProfile(false)}
			class={styles.change_profile_picture_container}>
			<div className={styles.change_profile_picture_content}>
				<div className={styles.title}>Change profile cover photo</div>
				<div className={styles.wrapper_upload_picture}>
					<label>
						Upload cover photo
						<input
							onChange={e => {
								getPictureBase64(e, props.getProfileData, props.account, "coverPhoto");
								props.setOpenModalCoverProfile(false);
							}}
							id='file-upload'
							type='file'
						/>
					</label>
				</div>

				<div
					className={styles.wrapper_change_picture}
					onClick={() => {
						removePicture(props.getProfileData, props.account, "coverPhoto");
						props.setOpenModalCoverProfile(false);
					}}>
					Remove cover photo
				</div>

				<div onClick={() => props.setOpenModalCoverProfile(false)} className={styles.wrapper_change_picture}>
					Cancel
				</div>
			</div>
		</DuplicateCodeFunc>
	);
};

export let ToggleShowCurrentPostContainer = props => {
	return (
		<DuplicateCodeFunc
			{...props}
			open={props.openModalCurrentPost}
			close={() => {
				props.setOpenModalCurrentPost(false);
				props.history.goBack();
			}}
			class={styles.modal_current_post_container}>
			<div className={styles.toggle_show_post_content}>
				<div className={styles.postPhoto}>
					<BodyPost {...props} post={props.account.profile.posts[0]} />
				</div>

				<div className={styles.content}>
					<HeadPost {...props} />
					<FooterPost {...props} />
				</div>
			</div>

			{/* <div className={styles.wrapper_button_close}>
							<button onClick={() => props.setOpenModalCurrentPost(false)}>x</button>
					</div> */}
		</DuplicateCodeFunc>
	);
};
