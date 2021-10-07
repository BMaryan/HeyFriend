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
import Button from "@mui/material/Button";

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
				<Button className={styles.wrapper_item + " " + styles.wrapper_upload_picture}>
					<label>
						U<span style={{ textTransform: "lowercase" }}>pload photo</span>
						<input
							onChange={e => {
								getPictureBase64(e, props.getProfileData, props.account, "avatar");
								props.setOpenModalAvatarProfile(false);
							}}
							id='file-upload'
							type='file'
						/>
					</label>
				</Button>

				<Button
					className={styles.wrapper_item}
					onClick={() => {
						removePicture(props.getProfileData, props.account, "avatar");
						props.setOpenModalAvatarProfile(false);
					}}>
					R<span style={{ textTransform: "lowercase" }}>emove current photo</span>
				</Button>

				<Button className={styles.wrapper_item} onClick={() => props.setOpenModalAvatarProfile(false)}>
					C<span style={{ textTransform: "lowercase" }}>ancel</span>
				</Button>
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
				<Button className={styles.wrapper_item + " " + styles.wrapper_upload_picture}>
					<label>
						U<span style={{ textTransform: "lowercase" }}>pload cover photo</span>
						<input
							onChange={e => {
								getPictureBase64(e, props.getProfileData, props.account, "coverPhoto");
								props.setOpenModalCoverProfile(false);
							}}
							id='file-upload'
							type='file'
						/>
					</label>
				</Button>

				<Button
					className={styles.wrapper_item}
					onClick={() => {
						removePicture(props.getProfileData, props.account, "coverPhoto");
						props.setOpenModalCoverProfile(false);
					}}>
					R<span style={{ textTransform: "lowercase" }}>emove cover photo</span>
				</Button>

				<Button className={styles.wrapper_item} onClick={() => props.setOpenModalCoverProfile(false)}>
					C<span style={{ textTransform: "lowercase" }}>ancel</span>
				</Button>
			</div>
		</DuplicateCodeFunc>
	);
};

export let ToggleShowCurrentPostContainer = props => {
	let pos = props.location.search.indexOf("=");
	let idPost = props.location.search.slice(pos + 1);

	let checkCurrentPost =
		props.account &&
		props.account.profile.posts &&
		props.account.profile.posts.find(post => {
			if (idPost && idPost === post.uniqueId) {
				return post;
			}
		});

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
					<BodyPost {...props} post={checkCurrentPost} />
				</div>

				<div className={styles.content}>
					<HeadPost {...props} />
					<FooterPost {...props} modal={true} />
				</div>
			</div>

			{/* <div className={styles.wrapper_button_close}>
							<button onClick={() => props.setOpenModalCurrentPost(false)}>x</button>
					</div> */}
		</DuplicateCodeFunc>
	);
};
