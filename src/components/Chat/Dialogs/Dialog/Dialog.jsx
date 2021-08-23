import React from "react";
import styles from "./Dialog.module.css";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Dialog = props => {
	return (
		<>
			<NavLink to={"/chat/" + props.user.id} className={styles.chat + " " + styles.chat_forHead} activeClassName={styles.chat_active}>
				<div className={styles.wrapper_picture}>
					<div className={styles.have_not_picture + " " + styles.have_not_picture_forHead}>
						{props.user ? <img src={defaultAvatar} alt='' /> : <></>}
					</div>
				</div>
				<div>
					<div className={styles.login}>{props.user ? props.user.surname + " " + props.user.name : <></>}</div>
					<div className={styles.message}>Hello, How are you</div>
				</div>
			</NavLink>
		</>
	);
};

export default Dialog;
