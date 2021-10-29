import React from "react";
import styles from "./helperForProfile.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { getPictureBase64, removePicture } from "../../core/methods/methods";
import Button from "@mui/material/Button";
import PostContainer from "../../components/common/Post/PostContainer";
import { modalPostConstant } from "../../core/constants/constantsPost";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { NavLink } from "react-router-dom";
import { photoConstant } from "../../core/constants/constants";
import { onlyBodyPostConstant } from "../../core/constants/constantsPost";

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
						Upload photo
						<input
							onChange={event => {
								getPictureBase64({ event: event, method: props.getProfileData, account: props.account, key: "avatar" });
								props.setOpenModalAvatarProfile(false);
							}}
							id='file-upload'
							type='file'
							accept='image/*'
						/>
					</label>
				</Button>

				<Button
					className={styles.wrapper_item}
					onClick={() => {
						removePicture({ method: props.getProfileData, account: props.account, key: "avatar" });
						props.setOpenModalAvatarProfile(false);
					}}>
					Remove current photo
				</Button>

				<Button className={styles.wrapper_item} onClick={() => props.setOpenModalAvatarProfile(false)}>
					Cancel
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
						Upload cover photo
						<input
							onChange={event => {
								getPictureBase64({ event: event, method: props.getProfileData, account: props.account, key: "coverPhoto" });
								props.setOpenModalCoverProfile(false);
							}}
							id='file-upload'
							type='file'
							accept='image/*'
						/>
					</label>
				</Button>

				<Button
					className={styles.wrapper_item}
					onClick={() => {
						removePicture({ method: props.getProfileData, account: props.account, key: "coverPhoto" });
						props.setOpenModalCoverProfile(false);
					}}>
					Remove cover photo
				</Button>

				<Button className={styles.wrapper_item} onClick={() => props.setOpenModalCoverProfile(false)}>
					Cancel
				</Button>
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
			<PostContainer kindOfPost={modalPostConstant} account={props.currentAccount} post={props.currentPost} modal={true} />
		</DuplicateCodeFunc>
	);
};

export let ReturnImageList = props => {
	return (
		<ImageList className={styles.posts}>
			{props.account && props.account.profile && props.account.profile.posts && !props.id && props.logicOfPagePost
				? props.account.profile.posts.map(post => (
						<ImageListItem key={post && post.id ? post.id : undefined} className={styles.wrapper_posts}>
							<NavLink
								exact
								key={post && post.id ? post.id : undefined}
								onClick={() =>
									props.openModalCurrentPost ? props.setOpenModalCurrentPost(false) : props.setOpenModalCurrentPost(true)
								}
								to={`${photoConstant}/${post && post.id ? post.id : undefined}`}
								className={styles.post}>
								<PostContainer
									key={post && post.id ? post.id : undefined}
									post={post}
									currentAccount={props.account}
									kindOfPost={onlyBodyPostConstant}
								/>
							</NavLink>
						</ImageListItem>
				  ))
				: props.oftenCheckOtherProfile && props.otherProfile.profile.posts && props.logicOfPagePost
				? props.otherProfile.profile.posts.map(post => (
						<ImageListItem key={post && post.id ? post.id : undefined} className={styles.wrapper_posts}>
							<NavLink
								exact
								key={post && post.id ? post.id : undefined}
								onClick={() =>
									props.openModalCurrentPost ? props.setOpenModalCurrentPost(false) : props.setOpenModalCurrentPost(true)
								}
								to={`${photoConstant}/${post && post.id ? post.id : undefined}`}
								className={styles.post}>
								<PostContainer
									key={post && post.id ? post.id : undefined}
									post={post}
									currentAccount={props.otherProfile}
									kindOfPost={onlyBodyPostConstant}
								/>
							</NavLink>
						</ImageListItem>
				  ))
				: !props.logicOfPagePost && props.accounts
				? props.accounts.map(account =>
						account && account.profile && account.profile.posts
							? account.profile.posts.map(post =>
									props.account && props.account.profile && props.account.profile.savedPosts
										? props.account.profile.savedPosts.map(savedPostID =>
												post.id === savedPostID ? (
													<ImageListItem key={post && post.id ? post.id : undefined} className={styles.wrapper_posts}>
														<NavLink
															exact
															key={post && post.id ? post.id : undefined}
															onClick={() =>
																props.openModalCurrentPost
																	? props.setOpenModalCurrentPost(false)
																	: props.setOpenModalCurrentPost(true)
															}
															to={`${photoConstant}/${post && post.id ? post.id : undefined}`}
															className={styles.post}>
															<PostContainer
																key={post && post.id ? post.id : undefined}
																post={post}
																currentAccount={account}
																kindOfPost={onlyBodyPostConstant}
															/>
														</NavLink>
													</ImageListItem>
												) : undefined
										  )
										: undefined
							  )
							: undefined
				  )
				: undefined}
		</ImageList>
	);
};
