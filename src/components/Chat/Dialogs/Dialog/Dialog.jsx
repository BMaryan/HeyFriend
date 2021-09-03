import React from "react";
import styles from "./Dialog.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Dialog = props => {
	let save = props.profileAuthorizationData && props.chat && props.profileAuthorizationData.id === props.chat.id;

	return (
		<>
			<NavLink
				to={props.chat ? "/chat/" + props.chat.id : ""}
				className={styles.chat + " " + styles.chat_forHead}
				activeClassName={styles.chat_active}>
				<div className={styles.wrapper_picture}>
					<div className={styles.have_not_picture + " " + styles.have_not_picture_forHead}>
						{save ? (
							<div className={styles.wrapper_icon}>
								<FontAwesomeIcon className={styles.icon} icon={faBookmark} />
							</div>
						) : (
							<img src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
						)}
					</div>
				</div>
				<div>
					<div className={styles.login}>{save ? "Saved Messages" : props.user.surname + " " + props.user.name}</div>
					<div className={styles.message}>
						{props.chat && props.chat.messages && props.chat.messages.length > 0 ? (
							props.chat.messages[props.chat.messages.length - 1].message
						) : (
							<></>
						)}
					</div>
				</div>
			</NavLink>
		</>
	);
};

export default Dialog;

{
}
// <i class="far faBookmark"></i>
