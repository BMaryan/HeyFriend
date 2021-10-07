import React from "react";
import styles from "../Post.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../core/constants/constants";
import Button from "@mui/material/Button";

const HeadPost = props => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckMyProfile = props.account && props.account.profile && !props.id;
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

	return (
		<div className={styles.head}>
			<div className={styles.wrapper_details}>
				<div className={styles.details_position}>
					<div className={styles.wrapper_profile_img}>
						{oftenCheckMyProfile && props.account.profile.avatar ? (
							<img src={props.account.profile.avatar} alt='' />
						) : oftenCheckOtherProfile && otherProfile.profile.avatar ? (
							<img src={otherProfile.profile.avatar} alt='' />
						) : (
							<img src={defaultAvatar} alt='' />
						)}
					</div>
					<div className={styles.details}>
						<NavLink to={`${profileConstant}/${props.account.id}`} className={styles.fullName}>
							{oftenCheckMyProfile
								? props.account.profile.surname + " " + props.account.profile.name
								: oftenCheckOtherProfile
								? otherProfile.profile.surname + " " + otherProfile.profile.name
								: undefined}
						</NavLink>
						{props.post && props.post.createPostDate ? <div className={styles.date}>{props.post.createPostDate}</div> : undefined}
					</div>
				</div>

				<div className={styles.wrapper_button}>
					<IconButton onClick={handleOpen} className={styles.button_icon}>
						<MoreHorizIcon className={styles.icon} />
					</IconButton>
				</div>

				<>
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
							<Box className={styles.modalPostActions}>
								<Button variant='text' className={styles.item + " " + styles.item__border}>
									R<span style={{ textTransform: "lowercase" }}>eport</span>
								</Button>
								<Button variant='text' className={styles.item + " " + styles.item__border}>
									U<span style={{ textTransform: "lowercase" }}>nfollow</span>
								</Button>
								<Button variant='text' className={styles.item + " " + styles.item__border}>
									S<span style={{ textTransform: "lowercase" }}>hare to...</span>
								</Button>
								<Button variant='text' className={styles.item + " " + styles.item__border}>
									C <span style={{ textTransform: "lowercase" }}>opy link</span>
								</Button>
								<Button onClick={handleClose} variant='text' className={styles.item}>
									C<span style={{ textTransform: "lowercase" }}>ancel</span>
								</Button>
							</Box>
						</Fade>
					</Modal>
				</>
			</div>
		</div>
	);
};

export default HeadPost;
