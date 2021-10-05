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
						<div className={styles.date}>24 June 2018 at 7:36 pm</div>
					</div>
				</div>

				<div>
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
								<div className={styles.wrapper_item + " " + styles.wrapper_item__border}>
									<div className={styles.item}>Report</div>
								</div>
								<div className={styles.wrapper_item + " " + styles.wrapper_item__border}>
									<div className={styles.item}>Unfollow</div>
								</div>
								<div className={styles.wrapper_item + " " + styles.wrapper_item__border}>
									<div className={styles.item}>Share to...</div>
								</div>
								<div className={styles.wrapper_item + " " + styles.wrapper_item__border}>
									<div className={styles.item}>Copy link</div>
								</div>
								<div onClick={handleClose} className={styles.wrapper_item}>
									<div>Cancel</div>
								</div>
							</Box>
						</Fade>
					</Modal>
				</>
			</div>
		</div>
	);
};

export default HeadPost;
