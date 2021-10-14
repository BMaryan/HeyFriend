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
import { profileConstant, photoConstant } from "../../core/constants/constants";
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
	// let checkCurrentPost =
	// 	props.account && props.account.profile.posts
	// 		? props.account.profile.posts.find(post => {
	// 				if (props.params && props.params.id && props.params.id === post.id) {
	// 					return post;
	// 				}
	// 		  })
	// 		: props.accounts
	// 		? props.accounts.find(account =>
	// 				account.profile.posts
	// 					? account.profile.posts.find(post => {
	// 							if (props.params && props.params.id && props.params.id === post.id) {
	// 								return post;
	// 							}
	// 					  })
	// 					: undefined
	// 		  )
	// 		: undefined;

	// let otherCurrentPost =
	// 	checkCurrentPost && checkCurrentPost.profile && checkCurrentPost.profile.posts
	// 		? checkCurrentPost.profile.posts.find(post => (props.params && props.params.id ? props.params.id === post.id : undefined))
	// 		: undefined;

	console.log(props.currentPost);
	console.log(props.currentAccount);

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
								to={`${profileConstant}${photoConstant}/${post && post.id ? post.id : undefined}`}
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
								to={`${profileConstant}/${props.id}${photoConstant}/${post && post.id ? post.id : undefined}`}
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
															to={`${profileConstant}/${props.id}${photoConstant}/${
																post && post.id ? post.id : undefined
															}`}
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
