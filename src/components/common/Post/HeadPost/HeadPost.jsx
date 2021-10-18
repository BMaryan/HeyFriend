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

	return (
		<div className={styles.head}>
			<div className={styles.wrapper_details}>
				<div className={styles.details_position}>
					<div className={styles.wrapper_profile_img}>
						{props.currentAccount && props.currentAccount.profile.avatar ? (
							<img src={props.currentAccount.profile.avatar} alt='' />
						) : (
							<img src={defaultAvatar} alt='' />
						)}
					</div>
					<div className={styles.details}>
						<NavLink
							to={`${profileConstant}/${props.currentAccount && props.currentAccount.id ? props.currentAccount.id : undefined}`}
							className={styles.fullName}>
							{props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
						</NavLink>
						{props.post && props.post.dateCreated ? <div className={styles.date}>{props.post.dateCreated}</div> : undefined}
					</div>
				</div>

				<div className={styles.wrapper_button}>
					<IconButton onClick={handleOpen} className={styles.button_icon}>
						<MoreHorizIcon className={styles.icon} />
					</IconButton>
				</div>

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
								Report
							</Button>
							<Button variant='text' className={styles.item + " " + styles.item__border}>
								Unfollow
							</Button>
							<Button variant='text' className={styles.item + " " + styles.item__border}>
								Share to...
							</Button>
							<Button variant='text' className={styles.item + " " + styles.item__border}>
								Copy link
							</Button>
							<Button onClick={handleClose} variant='text' className={styles.item}>
								Cancel
							</Button>
						</Box>
					</Fade>
				</Modal>
			</div>
		</div>
	);
};

export default HeadPost;
