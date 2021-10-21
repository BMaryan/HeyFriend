import React from "react";
import styles from "./Dialog.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { chatConstant } from "../../../../core/constants/constants";

const Dialog = props => {
	let save = props.account && props.chat && props.account.id;
	let foundUser = props.users ? props.users.find(user => props.chat.id === user.id) : undefined;

	console.log(foundUser);

	return (
		<>
			<NavLink
				to={foundUser ? `${chatConstant}/` + foundUser.id : ""}
				className={styles.chat + " " + styles.chat_forHead}
				activeClassName={styles.chat_active}>
				<div className={styles.wrapper_picture}>
					<div className={styles.have_not_picture + " " + styles.have_not_picture_forHead}>
						{!foundUser ? (
							<div className={styles.wrapper_icon}>
								<FontAwesomeIcon className={styles.icon} icon={faBookmark} />
							</div>
						) : (
							<img src={foundUser && foundUser.img ? foundUser.img : defaultAvatar} alt='' />
						)}
					</div>
				</div>
				<div>
					<div className={styles.login}>{foundUser ? foundUser.surname + " " + foundUser.name : undefined}</div>
					{/* <div className={styles.login}>{save ? "Saved Messages" : props.user.surname + " " + props.user.name}</div> */}
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
