import React from "react";
import styles from "./ProfileContent.module.css";
import CreatePost from "../../common/CreatePost/CreatePost";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Information from "./Information/Information";
import Saved from "./Saved/Saved";
import BodyPost from "../../common/Post/BodyPost/BodyPost";
import { profileConstant } from "../../../core/constants/constants";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CreatePostReduxForm from "../../common/CreatePost/CreatePostForm";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { ToggleShowCurrentPostContainer } from "../../../utils/helperForProfile/helperForProfile";
import { useHistory, useLocation } from "react-router-dom";

const ProfileContent = props => {
	let history = useHistory();
	let location = useLocation();

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;
	let [saveOwnerPost, setSaveOwnerPost] = React.useState(null);
	let [postPhoto, setPostPhoto] = React.useState(null);
	let [openModalCurrentPost, setOpenModalCurrentPost] = React.useState(false);

	let onSubmit = formData => {
		setSaveOwnerPost(formData.create_post);
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setPostPhoto(null);
	};

	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				setPostPhoto(reader.result);
			};
		}
	};

	function makeid(length) {
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		console.log(result);
		return result;
	}

	return (
		<div className={styles.profile_content}>
			{/* side bar left */}
			<div className={styles.side_bar_left}></div>
			{/* content */}
			<div className={styles.content}>
				<div className={styles.navigation}>
					<NavLink exact to={`${profileConstant}`} className={styles.item} activeClassName={styles.item_active}>
						<BorderAllRoundedIcon className={styles.icon} />
						Posts
					</NavLink>
					<NavLink to={`${profileConstant}/information`} className={styles.item} activeClassName={styles.item_active}>
						<InfoOutlinedIcon className={styles.icon} />
						Information
					</NavLink>
					<NavLink exact to={`${profileConstant}/saved`} className={styles.item} activeClassName={styles.item_active}>
						<BookmarkBorderIcon className={styles.icon} />
						Saved
					</NavLink>
				</div>

				<Route
					exact
					path={`${profileConstant}`}
					render={() => {
						return (
							<>
								<CreatePost account={props.account} otherProfile={otherProfile} accounts={props.accounts} handleOpen={handleOpen} />

								<div className={styles.posts}>
									<div className={styles.wrapper_posts}>
										{props.account && props.account.profile && props.account.profile.posts
											? props.account.profile.posts.map(post => (
													<NavLink
														key={post.id}
														to={`?postId=${post.uniqueId}`}
														onClick={() =>
															openModalCurrentPost ? setOpenModalCurrentPost(false) : setOpenModalCurrentPost(true)
														}
														className={styles.post}>
														<BodyPost key={post.id} post={post} />
													</NavLink>
											  ))
											: oftenCheckOtherProfile && otherProfile && otherProfile.profile.posts
											? otherProfile.profile.posts.map(post => (
													<NavLink
														key={post.id}
														to={`?postId=${post.uniqueId}`}
														onClick={() =>
															openModalCurrentPost ? setOpenModalCurrentPost(false) : setOpenModalCurrentPost(true)
														}
														className={styles.post}>
														<BodyPost key={post.id} post={post} />
													</NavLink>
											  ))
											: undefined}
									</div>
								</div>
							</>
						);
					}}
				/>
				<Route
					path={`${profileConstant}/information`}
					render={() => (
						<Information
							accounts={props.accounts}
							id={props.id}
							account={props.account}
							otherProfile={otherProfile}
							oftenCheckOtherProfile={oftenCheckOtherProfile}
						/>
					)}
				/>
				<Route
					exact
					path={`${profileConstant}/saved`}
					render={() => <Saved accounts={props.accounts} id={props.id} account={props.account} />}
				/>
			</div>
			{/* side bar right */}
			<div className={styles.side_bar_right}></div>
			{/* toggle show container */}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box className={styles.create_new_post_content}>
						<div className={styles.create_post_title}>Create new post</div>

						<div>
							<CreatePostReduxForm onChange={onSubmit} />
						</div>

						<div className={styles.wrapper_content}>
							<div className={styles.wrapper_add_picture}>
								<label title='Add photo' onChange={e => onChangeProfilePicture(e)}>
									{postPhoto ? (
										<img className={styles.post_img} src={postPhoto} alt='' />
									) : (
										<AddAPhotoOutlinedIcon className={styles.icon} />
									)}
									<input type='file' />
								</label>

								{postPhoto ? (
									<div className={styles.wrapper_button_delete}>
										<IconButton onClick={() => setPostPhoto(false)} aria-label='Example'>
											<CancelOutlinedIcon />
										</IconButton>
									</div>
								) : undefined}
							</div>
						</div>

						<div className={styles.wrapper_button_publish}>
							<Button
								variant='contained'
								disabled={!postPhoto}
								onClick={() => {
									postPhoto ? (
										props.setProfilePosts(postPhoto, makeid(11), null, null, "01.01.01", saveOwnerPost ? saveOwnerPost : null)
									) : (
										<></>
									);
									handleClose();
								}}>
								P<span style={{ textTransform: "lowercase" }}>ublish</span>
							</Button>
						</div>

						<div onClick={() => handleClose()} className={styles.wrapper_button_close}>
							<IconButton aria-label='Example'>
								<CancelOutlinedIcon />
							</IconButton>
						</div>
					</Box>
				</Fade>
			</Modal>

			{openModalCurrentPost ? (
				<ToggleShowCurrentPostContainer
					{...props}
					openModalCurrentPost={openModalCurrentPost}
					setOpenModalCurrentPost={setOpenModalCurrentPost}
					history={history}
					location={location}
				/>
			) : undefined}
		</div>
	);
};

export default ProfileContent;
