import React from "react";
import styles from "./ProfileContent.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Information from "./Information/Information";
import Saved from "./Saved/Saved";
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
import Posts from "./Posts/Posts";
import { useParams } from "react-router-dom";
import Media from "react-media";

const ProfileContent = props => {
	let params = useParams();
	const [open, setOpen] = React.useState(false);
	let [saveOwnerPost, setSaveOwnerPost] = React.useState(null);
	let [postPhoto, setPostPhoto] = React.useState(null);
	let [openModalCurrentPost, setOpenModalCurrentPost] = React.useState(false);

	let onSubmit = formData => {
		setSaveOwnerPost(formData.create_post);
	};

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

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
		let result = props.account.id + "";
		let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let charactersLength = characters.length;

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		let searchTheSameId = props.account && props.account.profile.posts ? props.account.profile.posts.find(post => post.id === result) : undefined;

		if (!searchTheSameId) {
			return result;
		} else {
			return result + props.account.profile.posts.length;
		}
	}

	return (
		<div className={styles.profile_content}>
			<div className={styles.content}>
				<div className={styles.navigation}>
					<NavLink
						exact
						to={props.id ? `${profileConstant}/${props.id}` : `${profileConstant}`}
						className={styles.item}
						activeClassName={styles.item_active}>
						<Media queries={{ small: "(max-width: 480px)" }}>
							{matches =>
								!matches.small ? (
									<>
										<BorderAllRoundedIcon className={styles.icon} />
										Posts
									</>
								) : (
									<>
										<BorderAllRoundedIcon className={styles.icon} />
									</>
								)
							}
						</Media>
					</NavLink>
					<NavLink
						to={props.id ? `${profileConstant}/${props.id}/information` : `${profileConstant}/information`}
						className={styles.item}
						activeClassName={styles.item_active}>
						<Media queries={{ small: "(max-width: 480px)" }}>
							{matches =>
								!matches.small ? (
									<>
										<InfoOutlinedIcon className={styles.icon} />
										Information
									</>
								) : (
									<>
										<InfoOutlinedIcon className={styles.icon} />
									</>
								)
							}
						</Media>
					</NavLink>
					{!props.id ? (
						<NavLink
							exact
							to={props.id ? `${profileConstant}/${props.id}/saved` : `${profileConstant}/saved`}
							className={styles.item}
							activeClassName={styles.item_active}>
							<Media queries={{ small: "(max-width: 480px)" }}>
								{matches =>
									!matches.small ? (
										<>
											<BookmarkBorderIcon className={styles.icon} />
											Saved
										</>
									) : (
										<>
											<BookmarkBorderIcon className={styles.icon} />
										</>
									)
								}
							</Media>
						</NavLink>
					) : undefined}
				</div>

				<Route
					exact
					path={props.id ? `${profileConstant}/${props.id}` : `${profileConstant}`}
					render={() => {
						return (
							<Posts
								{...props}
								handleOpen={handleOpen}
								handleClose={handleClose}
								oftenCheckOtherProfile={oftenCheckOtherProfile}
								params={params}
								openModalCurrentPost={openModalCurrentPost}
								setOpenModalCurrentPost={setOpenModalCurrentPost}
							/>
						);
					}}
				/>

				<Route
					path={props.id ? `${profileConstant}/${props.id}/information` : `${profileConstant}/information`}
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
				{!props.id ? (
					<Route
						exact
						path={props.id ? `${profileConstant}/${props.id}/saved` : `${profileConstant}/saved`}
						render={() => (
							<Saved
								openModalCurrentPost={openModalCurrentPost}
								setOpenModalCurrentPost={setOpenModalCurrentPost}
								accounts={props.accounts}
								id={props.id}
								account={props.account}
							/>
						)}
					/>
				) : undefined}
			</div>

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
								style={{ textTransform: "capitalize" }}
								onClick={() => {
									postPhoto ? (
										props.setProfilePosts({
											id: makeid(11),
											photo: postPhoto,
											likes: [],
											comments: [],
											dateCreated: "01.01.01",
											description: saveOwnerPost,
										})
									) : (
										<></>
									);
									handleClose();
								}}>
								Publish
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
		</div>
	);
};

export default ProfileContent;
